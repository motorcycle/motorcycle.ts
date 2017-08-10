import { ApplicationSources, Integer, Milliseconds, Tick, trafficControllerService } from './'
import { map, periodic, scan } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

export function Application(): ApplicationSources {
  const lights$ = map(trafficControllerService, tickEvery(TICK_RATE))

  return { lights$ }
}

function tickEvery(milliseconds: Milliseconds): Stream<Tick> {
  return map(t => t % TICK_MODULUS_OF_CONGRUENCE, scan(t => t + 1, 0, periodic(milliseconds)))
}

const TICK_RATE: Milliseconds = 1000
const TICK_MODULUS_OF_CONGRUENCE: Integer = 8
