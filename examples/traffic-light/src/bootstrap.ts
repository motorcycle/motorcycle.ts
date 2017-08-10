import { TrafficLight, TrafficLightSinks, TrafficLightSources } from '@base/ui'

import { Application } from '@base/application'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

const Dom = makeDomComponent(element)

run<TrafficLightSources, TrafficLightSinks>(TrafficLight, sinks => ({
  ...Dom(sinks),
  ...Application(),
}))
