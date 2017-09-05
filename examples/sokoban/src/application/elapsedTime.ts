import { periodic, scan, skip } from '@motorcycle/stream'

import { Seconds } from './types'
import { Stream } from '@motorcycle/types'
import { increment } from '167'

const PERIOD_IN_MILLISECONDS = 1000
const START_TIME = -1
const SKIP_START_TIME = 1

export const elapsedTime = (): Stream<Seconds> =>
  skip(SKIP_START_TIME, scan(time => increment(time), START_TIME, periodic(PERIOD_IN_MILLISECONDS)))
