import {
  GLOW_INPUT_CSS_CLASS,
  Model,
  SPEED_INPUT_CSS_CLASS,
  STARS_INPUT_CSS_CLASS,
  TRAIL_INPUT_CSS_CLASS,
  view
} from './view'
import { SettingsSinks, SettingsSources } from './types'
import { divide, flip, multiply } from '@typed/prelude'
import { map, now, startWith } from '@motorcycle/stream'

import { queryInputChange } from './queryInputChange'

const STAR_COUNT = 1000
const ROTATION_SPEED = 0.01
const SPEED_FACTOR = 100
const TRAIL = 0.5
const GLOW = 10

export function Settings({ dom }: SettingsSources): SettingsSinks {
  const model: Model = {
    starCount: STAR_COUNT,
    rotationSpeed: multiply(SPEED_FACTOR, ROTATION_SPEED),
    trail: reciprocal(TRAIL),
    glow: GLOW
  }
  const view$ = now(view(model))
  const queryInputChangeOn = queryInputChange(dom)
  const starCount$ = startWith(STAR_COUNT, queryInputChangeOn(STARS_INPUT_CSS_CLASS))
  const rotationSpeed$ = startWith(
    ROTATION_SPEED,
    map(divide(SPEED_FACTOR), queryInputChangeOn(SPEED_INPUT_CSS_CLASS))
  )
  const trail$ = startWith(
    TRAIL,
    map(reciprocal, queryInputChangeOn(TRAIL_INPUT_CSS_CLASS))
  )
  const glow$ = startWith(GLOW, queryInputChangeOn(GLOW_INPUT_CSS_CLASS))

  return { view$, starCount$, rotationSpeed$, trail$, glow$ }
}

export const reciprocal = flip(divide)(1)
