import { DomSinks, DomSources } from '@motorcycle/mostly-dom'
import { NonnegativeInteger, NonnegativeRationalNumber } from '@base/common/types'

import { Stream } from '@motorcycle/types'

export type SettingsSources = DomSources

export type SettingsSinks = DomSinks & {
  starCount$: Stream<NonnegativeInteger>
  rotationSpeed$: Stream<NonnegativeRationalNumber>
  trail$: Stream<NonnegativeRationalNumber>
  glow$: Stream<NonnegativeInteger>
}
