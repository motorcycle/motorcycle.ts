import { Test, describe, it } from '@typed/test'
import { div, h } from 'mostly-dom'

import { vNodeWrapper } from './vNodeWrapper'

export const test: Test = describe('vNodeWrapper', [
  it('wraps a vNode in a vNode representation of an element', ({ equal }) => {
    const divElement = document.createElement('div')
    const vNode = h('h1', {}, 'Hello')
    const { element, children } = vNodeWrapper(divElement)(vNode)

    equal(divElement, element)
    equal(children && children[0], vNode)
  }),

  it('returns a vNode if identical to rootElement', ({ equal }) => {
    const element = document.createElement('div')
    const vNode = div()

    equal(vNodeWrapper(element)(vNode), vNode)
  }),
])
