import { DomSinks, makeDomComponent } from '@motorcycle/mostly-dom'
import { UI, UISources } from '@base/UI'

import { Application } from '@base/application'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

const Dom = makeDomComponent(element)

run<UISources, DomSinks>(UI, sinks => ({ ...Dom(sinks), ...Application() }))
