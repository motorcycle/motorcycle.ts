import { constant, merge, skipRepeats } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function toggle(true$: Stream<any>, false$: Stream<any>): Stream<boolean> {
  return skipRepeats(merge(constant(true, true$), constant(false, false$)))
}
