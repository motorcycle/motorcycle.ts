import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { NonnegativeInteger } from '@base/common/types'
import { Stream } from '@motorcycle/types'

export type SettingsSources = DomSources

export type SettingsSinks = DomSinks & {
  starsCount$: Stream<NonnegativeInteger>
}
