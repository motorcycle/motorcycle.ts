import { UISinks, UISources } from '@base/types'

import { SpinningStars } from '@base/SpinningStars'
import { UI } from '@base/UI'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const rootCssSelector = `#app`
const element = document.querySelector(rootCssSelector)

if (!element) throw new Error(`Unable to find element '${rootCssSelector}'`)

const Dom = makeDomComponent(element)

function Effects(sinks: UISinks): UISources {
  return {
    ...Dom(sinks),
    ...SpinningStars(sinks),
  }
}

run<UISources, UISinks>(UI, Effects)
