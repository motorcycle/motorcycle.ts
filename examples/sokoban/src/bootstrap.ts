import { UI, UISinks, UISources } from '@base/ui'

import { Application } from '@base/application'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

const Dom = makeDomComponent(element)

run<UISources, UISinks>(UI, sinks => ({
  ...Dom(sinks),
  ...Application(sinks),
}))
