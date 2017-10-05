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
  VersionedStars
} from '@base/types'
import { Random, random } from '@base/common/random'
import {
  add,
  curry,
  map as dataMap,
  divide,
  equals,
  forEach,
  increment,
  length,
  lessThanOrEqual,
  reduce
} from '@typed/prelude'
import { combineObj, drain, loop, map, sample, sampleWith, skip, tap } from '@motorcycle/stream'

import { NonnegativeInteger } from '@base/common/types'
import { requestAnimationFrames } from 'most-request-animation-frame'
import { temperatureToRgb } from '@base/temperatureToRgb'

const CANVAS_CONTEXT = '2d'
const TAU = 6.28
const RADIUS = 2
const START_ANGLE = 0
const END_ANGLE = TAU
const INITIAL_STARS_STATE = { version: 0, stars: [] }

export function SpinningStars({
  canvas$,
  starCount$,
  rotationSpeed$,
  trail$,
  glow$
}: SpinningStarsSinks): SpinningStarsSources {
  const initializedCanvas$ = tap(initCanvas, canvas$)
  const ctx$ = map(context2D, initializedCanvas$)
  const size$ = map(({ height, width }) => ({ height, width }), initializedCanvas$)
  const offsetMax$ = map(({ width }) => width, size$)
  const starsConfig$ = combineObj({
    offsetMax: offsetMax$,
    count: starCount$,
    speed: rotationSpeed$
  })
  const versionedStars$ = loop(
    (version, config) => makeStars(random, config, version),
    0,
    starsConfig$
  )
  const spaceColor$ = map(blur => `rgba(0, 0, 0, ${blur})`, trail$)
  const space$ = combineObj<Space>({
    ctx: ctx$,
    size: size$,
    color: spaceColor$,
    glow: glow$
  })
  const stars$ = skip(
    1,
    loop(starsState, INITIAL_STARS_STATE, sampleWith(requestAnimationFrames(), versionedStars$))
  )
  const draw$ = sample(drawSpaceWithStars, stars$, space$)

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

const makeStars = function stars(
  random: Random,
  { offsetMax, count, speed }: StarsConfig,
  version: NonnegativeInteger
): { seed: NonnegativeInteger; value: VersionedStars } {
  const stars = dataMap(
    () => ({
      offset: random(offsetMax),
      angle: random(TAU),
      speed: random(speed),
      color: starColor(random),
      radius: random(RADIUS)
      // TODO: add glow from config
    }),
    new Array(count).fill(void 0)
  )

  const newVersion = increment(version)

  return {
    seed: newVersion,
    value: {
      version: newVersion,
      stars
    }
  }
}

export type StarsConfig = {
  offsetMax: NonnegativeInteger
  count: NonnegativeInteger
  speed: NonnegativeInteger
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
  M: { min: 2400, max: 3700 }
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

function starsState(
  previousState: VersionedStars,
  currentState: VersionedStars
): { seed: VersionedStars; value: Stars } {
  const { version: previousVersion, stars: previousStars } = previousState
  const { version, stars } = currentState

  if (equals(version, previousVersion)) {
    const adjustedStars = adjustStars(previousStars)

    return {
      seed: { ...previousState, stars: adjustedStars },
      value: adjustedStars
    }
  }

  return {
    seed: currentState,
    value: stars
  }
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
    radius
  }
}

function drawSpaceWithStars(stars: Stars, space: Space) {
  const { ctx, size: { height, width }, color } = space
  ctx.fillStyle = color
  ctx.fillRect(0, 0, width, height)
  forEach(drawStar(space), stars)
}

const drawStar = curry(function drawStar(
  { ctx, size: { height, width }, glow }: Space,
  { offset, angle, color, radius }: Star
) {
  ctx.save()
  ctx.beginPath()
  ctx.translate(half(width), half(height))
  ctx.rotate(angle)
  ctx.shadowBlur = radius * glow
  ctx.shadowColor = color
  ctx.arc(offset, offset, radius, START_ANGLE, END_ANGLE)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.restore()
})

const half = divide(2)
