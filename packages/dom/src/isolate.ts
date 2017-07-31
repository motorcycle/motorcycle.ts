import { Component, Stream } from '@motorcycle/types'

import { DomSource } from './'
import { VNode } from 'mostly-dom'
import { tap } from '@motorcycle/stream'

const KEY_PREFIX = `$$isolation$$-`
const EMPTY_CLASS_NAME = ``
const CLASS_NAME_SEPARATOR = ` `

export function isolate<
  Sources extends { readonly dom: DomSource },
  Sinks extends { readonly view$: Stream<VNode> }
>(component: Component<Sources, Sinks>, key: string): Component<Sources, Sinks> {
  const {} = key

  const isolatedComponent = function(sources: Sources) {
    const { dom } = sources
    const isolatedDom = dom.query(KEY_PREFIX + key)
    const sinks = component(Object.assign({}, sources, { dom: isolatedDom }))
    const isolatedSinks = Object.assign({}, sinks, { view$: isolateView(sinks.view$, key) })

    return isolatedSinks
  }

  return isolatedComponent
}

function isolateView(view$: Stream<VNode>, key: string) {
  const {} = view$
  const prefixedKey = KEY_PREFIX + key

  return tap(vNode => {
    const { className = EMPTY_CLASS_NAME } = vNode
    const needsIsolation = className.indexOf(prefixedKey) === -1

    if (needsIsolation) vNode.className = className + CLASS_NAME_SEPARATOR + prefixedKey
  }, view$)
}
