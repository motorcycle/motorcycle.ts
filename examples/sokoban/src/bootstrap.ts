import { UI, UISinks, UISources } from '@base/ui'

import { Application } from '@base/application'
import { constant } from '@motorcycle/stream'
import { createDocumentDomSource } from '@motorcycle/dom'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

const Dom = makeDomComponent(element)

function Effects(sinks: UISinks): UISources {
  const { view$ } = sinks

  const document$ = constant(document, view$)

  return {
    ...Dom(sinks),
    ...Application(sinks),
    document: createDocumentDomSource(document$),
  }
}

run<UISources, UISinks>(UI, Effects)
