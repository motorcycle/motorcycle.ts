import { BLUR_INPUT_CSS_CLASS, GLOW_INPUT_CSS_CLASS, SPEED_INPUT_CSS_CLASS, STARS_INPUT_CSS_CLASS, view } from './view'
import { SettingsSinks, SettingsSources } from './types'
import { divide, flip } from '@typed/prelude'
import { map, now, startWith } from '@motorcycle/stream'

import { queryInputChange } from './queryInputChange'

const STARS_COUNT = 1000
const ROTATION_SPEED = 0.01
const SPEED_FACTOR = 100
const STARS_TRAIL = 0.5

export function Settings({ dom }: SettingsSources): SettingsSinks {
  const view$ = now(view(STARS_COUNT))
  const starsCount$ = startWith(STARS_COUNT, queryInputChange(dom, STARS_INPUT_CSS_CLASS))
  const rotationSpeed$ = startWith(
    ROTATION_SPEED,
    map(divide(SPEED_FACTOR), queryInputChange(dom, SPEED_INPUT_CSS_CLASS))
  )
  const starsTrail$ = startWith(STARS_TRAIL, map(flip(divide)(1), queryInputChange(dom, BLUR_INPUT_CSS_CLASS)))
  const starsGlow$ = startWith(STARS_TRAIL, queryInputChange(dom, GLOW_INPUT_CSS_CLASS))

  return { view$, starsCount$, rotationSpeed$, starsTrail$, starsGlow$ }
}
