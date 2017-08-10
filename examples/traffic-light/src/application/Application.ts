import { ApplicationSources, Integer, Milliseconds, Tick, controlTrafficLights } from './'
import { map, periodic, scan } from '@motorcycle/stream'

import { Stream } from '@motorcycle/types'

const TICK_RATE: Milliseconds = 1000

export function Application(): ApplicationSources {
  const lights$ = map(controlTrafficLights, tickEvery(TICK_RATE))

  return { lights$ }
}

const TICK_MODULUS_OF_CONGRUENCE: Integer = 8

function tickEvery(milliseconds: Milliseconds): Stream<Tick> {
  return scan(t => (t + 1) % TICK_MODULUS_OF_CONGRUENCE, 0, periodic(milliseconds))
}
