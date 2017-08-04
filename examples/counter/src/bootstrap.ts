import { DomSinks, DomSources, makeDomComponent } from '@motorcycle/mostly-dom'

import { UI } from './UI'
import { run } from '@motorcycle/run'

const element = document.querySelector('#app')

if (!element) throw new Error('could not find element')

run<DomSources, DomSinks>(UI, makeDomComponent(element))
