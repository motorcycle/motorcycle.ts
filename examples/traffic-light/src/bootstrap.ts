import { DomSinks, DomSources, makeDomComponent } from '@motorcycle/mostly-dom'

import { UI } from './UI'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

run<DomSources, DomSinks>(UI, makeDomComponent(element))
