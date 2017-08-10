import { TrafficLightSinks, TrafficLightSources, view } from './'

import { map } from '@motorcycle/stream'

export function TrafficLight(sources: TrafficLightSources): TrafficLightSinks {
  const { lights$ } = sources
  const view$ = map(view, lights$)

  return { view$ }
}
