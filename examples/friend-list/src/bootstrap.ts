import './loader.css'

import { FriendList, Sinks, Sources } from './ui'

import { Application } from './application'
import { makeDomComponent } from '@motorcycle/mostly-dom'
import { run } from '@motorcycle/run'

const element = document.querySelector('#app-container')

if (!element) throw new Error('could not find element')

const Dom = makeDomComponent(element)

run<Sources, Sinks>(FriendList, Effects)

function Effects(sinks: Sinks): Sources {
  return {
    ...Dom(sinks),
    ...Application(sinks)
  }
}
