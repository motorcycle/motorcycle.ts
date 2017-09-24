import { SettingsSinks, SettingsSources } from './types'

import { now } from '@motorcycle/stream'
import { queryStarsCount } from './queryStarsCount'
import { view } from './view'

export function Settings({ dom }: SettingsSources): SettingsSinks {
  const view$ = now(view())
  const starsCount$ = queryStarsCount(dom)

  return { view$, starsCount$ }
}
