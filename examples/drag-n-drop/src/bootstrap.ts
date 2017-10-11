import { ReorderableList, Sinks, Sources } from './ReorderableList'
import { now, observe } from '@motorcycle/stream'

import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const element = document.querySelector('#app')

if (!element) throw new Error('could not find element')

const Dom = makeDomComponent(element)

run<Sources, Sinks>(ReorderableList, IO)

function IO(sinks: Sinks): Sources {
  const { preventDefault$ } = sinks

  const list = ['agreeable', 'brave', 'calm', 'delightful', 'eager', 'faithful', 'gentle', 'happy']

  observe(ev => ev.preventDefault(), preventDefault$)

  return {
    ...Dom(sinks),
    list$: now(list),
  }
}
