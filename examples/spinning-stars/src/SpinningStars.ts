import { Random, Space, SpinningStarsSinks, SpinningStarsSources, Star, Stars } from '@base/types'
import { add, curry, map as dataMap, divide, forEach, length } from '@typed/prelude'
import { combineObj, drain, map, sample, sampleWith, scan, skip, tap } from '@motorcycle/stream'

import { requestAnimationFrames } from 'most-request-animation-frame'

const CANVAS_CONTEXT = '2d'
const STARS_SPEED_FACTOR = 0.01
const STARS_COUNT = 1000
const SPACE_COLOR = 'rgba(0, 0, 0, .1)'
const RADIUS = 1
const START_ANGLE = 0
const END_ANGLE = 6.28
const STAR_COLOR = 'white'

export function SpinningStars({ canvas$ }: SpinningStarsSinks): SpinningStarsSources {
  // Why do we need to skip the first event?
  // skipRepeats emits two equal canvas elements, which is strange.
  const initializedCanvas$ = tap(initCanvas, skip(1, canvas$))
  const ctx$ = map(context2D, initializedCanvas$)
  const size$ = map(({ height, width }) => ({ height, width }), initializedCanvas$)
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

const context2D = (canvas: HTMLCanvasElement): CanvasRenderingContext2D =>
  canvas.getContext(CANVAS_CONTEXT) as CanvasRenderingContext2D

const random = (n: number): number => Math.random() * n

function stars(random: Random, width: number): Stars {
  return dataMap(
    () => ({
      radius: random(width),
      angle: random(Math.PI * 2),
      speed: random(STARS_SPEED_FACTOR),
    }),
    new Array(STARS_COUNT).fill(void 0)
  )
}

const starsState = (starsSeed: Stars, stars: Stars): Stars =>
  length<number>(starsSeed) ? adjustStars(starsSeed) : stars

const adjustStars = (stars: Stars): Stars => dataMap(adjustStarAngle, stars)

const adjustStarAngle = ({ radius, angle, speed }: Star): Star => ({
  radius,
  angle: add(angle, speed),
  speed,
})

function drawSpaceWithStars(stars: Stars, space: Space) {
  const { ctx, size: { height, width } } = space
  ctx.fillStyle = SPACE_COLOR
  ctx.fillRect(0, 0, width, height)
  forEach(drawStar(space), stars)
}

const drawStar = curry(function drawStar(
  { ctx, size: { height, width } }: Space,
  { radius, angle }: Star
) {
  ctx.save()
  ctx.beginPath()
  ctx.translate(half(width), half(height))
  ctx.rotate(angle)
  ctx.arc(radius, radius, RADIUS, START_ANGLE, END_ANGLE)
  ctx.closePath()
  ctx.fillStyle = STAR_COLOR
  ctx.fill()
  ctx.restore()
})

const half = divide(2)
