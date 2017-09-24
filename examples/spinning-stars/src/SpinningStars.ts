import {
  Kelvin,
  Space,
  SpectralType,
  SpectralTypes,
  SpinningStarsSinks,
  SpinningStarsSources,
  Star,
  Stars,
  TemperatureRange,
} from '@base/types'
import { Random, random } from '@base/common/random'
import {
  add,
  curry,
  map as dataMap,
  divide,
  forEach,
  length,
  lessThanOrEqual,
  reduce,
} from '@typed/prelude'
import { combineObj, drain, map, sample, sampleWith, scan, skip, tap } from '@motorcycle/stream'

import { NonnegativeInteger } from '@base/common/types'
import { requestAnimationFrames } from 'most-request-animation-frame'
import { temperatureToRgb } from '@base/temperatureToRgb'

const CANVAS_CONTEXT = '2d'
const TAU = 6.28
const STARS_SPEED_FACTOR = 0.01
const STARS_COUNT = 1000
const BLUR = 2
const GLOW = 10
const SPACE_COLOR = `rgba(0, 0, 0, ${divide(BLUR, 1)})`
const RADIUS = 2
const START_ANGLE = 0
const END_ANGLE = TAU

export function SpinningStars({ canvas$, starsCount$ }: SpinningStarsSinks): SpinningStarsSources {
  // Weird undefined
  console.log(starsCount$)
  const initializedCanvas$ = tap(initCanvas, canvas$)
  const ctx$ = map(context2D, initializedCanvas$)
  const size$ = map(({ height, width }) => ({ height, width }), initializedCanvas$)
  // const starsData$ = combineObj({ spaceSize: size$, count: startWith(STARS_COUNT, starsCount$) })
  const stars$ = map(({ width }) => stars(random, width), size$)
  const space$ = combineObj({ ctx: ctx$, size: size$ })
  const state$ = skip(1, scan(starsState, [], sampleWith(requestAnimationFrames(), stars$)))
  const draw$ = sample(drawSpaceWithStars, state$, space$)

  drain(draw$)

  return {}
}

function initCanvas(canvas: HTMLCanvasElement) {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
}

function context2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return canvas.getContext(CANVAS_CONTEXT) as CanvasRenderingContext2D
}

const stars = function stars(
  random: Random,
  width: number,
  count: NonnegativeInteger = STARS_COUNT
): Stars {
  return dataMap(
    () => ({
      offset: random(half(width)),
      angle: random(TAU),
      speed: random(STARS_SPEED_FACTOR),
      color: starColor(random),
      radius: random(RADIUS),
    }),
    new Array(count).fill(void 0)
  )
}

function starColor(random: Random): string {
  const type = spectralType(random)
  const range = temperatureRange(type)
  const temperature = randomTemperature(range)
  const { r, g, b } = temperatureToRgb(temperature)

  return `rgba(${r}, ${g}, ${b}, 1)`
}

const SPECTRAL_TYPES: SpectralTypes = ['O', 'B', 'A', 'F', 'G', 'K', 'M']
const SPECTRAL_TYPE_WEIGHTS = [0.0000003, 0.00125, 0.00625, 0.0303, 0.075, 0.121, 0.7645]
const SPECTRAL_TYPE_TEMPERATURES: { [key in SpectralType]: TemperatureRange } = {
  O: { min: 30000, max: 40000 },
  B: { min: 10000, max: 30000 },
  A: { min: 7500, max: 10000 },
  F: { min: 6000, max: 7500 },
  G: { min: 5200, max: 6000 },
  K: { min: 3700, max: 5200 },
  M: { min: 2400, max: 3700 },
}

const spectralTypeWeightsSum = reduce(add, 0, SPECTRAL_TYPE_WEIGHTS)

function spectralType(random: Random): SpectralType {
  const randomWeight = random(spectralTypeWeightsSum)
  let weightSum = 0

  for (let i = 0; i < length(SPECTRAL_TYPES); ++i) {
    weightSum = add(weightSum, SPECTRAL_TYPE_WEIGHTS[i])

    if (lessThanOrEqual(weightSum, randomWeight)) return SPECTRAL_TYPES[i]
  }

  return spectralType(random)
}

function temperatureRange(type: SpectralType): TemperatureRange {
  return SPECTRAL_TYPE_TEMPERATURES[type]
}

function randomTemperature({ min, max }: TemperatureRange): Kelvin {
  return random(max - min) + min
}

function starsState(starsSeed: Stars, stars: Stars): Stars {
  return length<number>(starsSeed) ? adjustStars(starsSeed) : stars
}

function adjustStars(stars: Stars): Stars {
  return dataMap(adjustStarAngle, stars)
}

function adjustStarAngle({ offset, angle, speed, color, radius }: Star): Star {
  return {
    offset,
    angle: add(angle, speed),
    speed,
    color,
    radius,
  }
}

function drawSpaceWithStars(stars: Stars, space: Space) {
  const { ctx, size: { height, width } } = space
  ctx.fillStyle = SPACE_COLOR
  ctx.fillRect(0, 0, width, height)
  forEach(drawStar(space), stars)
}

const drawStar = curry(function drawStar(
  { ctx, size: { height, width } }: Space,
  { offset, angle, color, radius }: Star
) {
  ctx.save()
  ctx.beginPath()
  ctx.translate(half(width), half(height))
  ctx.rotate(angle)
  ctx.shadowBlur = radius * GLOW
  ctx.shadowColor = color
  ctx.arc(offset, offset, radius, START_ANGLE, END_ANGLE)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
})

const half = divide(2)
