import { Component, Stream } from '@motorcycle/types'

import { DomSource } from './'
import { VNode } from 'mostly-dom'
import { join } from '167'
import { tap } from '@motorcycle/stream'

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

const KEY_PREFIX = `$$isolation$$-`

function isolateView(view$: Stream<VNode>, key: string) {
  const {} = view$
  const prefixedKey = KEY_PREFIX + key

  return tap(vNode => {
    const {
      className = EMPTY_CLASS_NAME,
      props: { className: propsClassName = EMPTY_CLASS_NAME },
    } = vNode
    const needsIsolation = propsClassName.indexOf(prefixedKey) === -1

    if (needsIsolation)
      vNode.props.className = removeSuperfluousSpaces(
        join(CLASS_NAME_SEPARATOR, [className, propsClassName, prefixedKey])
      )
  }, view$)
}

const EMPTY_CLASS_NAME = ``
const CLASS_NAME_SEPARATOR = ` `

function removeSuperfluousSpaces(str: string): string {
  return str.replace(RE_TWO_OR_MORE_SPACES, CLASS_NAME_SEPARATOR)
}

const RE_TWO_OR_MORE_SPACES = /\s{2,}/g
