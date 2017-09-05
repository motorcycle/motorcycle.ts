import { NonnegativeInteger } from '@base/common/types'
import { Time } from './types'

export function secondsToTime(seconds: NonnegativeInteger): Time {
  return new Date(1000 * seconds).toISOString().substr(12, 7)
}
