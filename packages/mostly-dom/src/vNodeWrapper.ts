import {
  ElementVNode,
  VNode,
  VNodeEvents,
  VNodeProps,
  ValidTagNames,
  elementToVNode,
  h,
} from 'mostly-dom'

export function vNodeWrapper(rootElement: Element) {
  const rootVNode: ElementVNode = elementToVNode(rootElement)
  const rootVNodeSelector = vNodeSelector(rootVNode)
  const { tagName: rootTagName, id: rootId, className: rootClassName } = rootVNodeSelector

  return function execute(
    vNode: VNode<any>
  ): VNode<Element, VNodeProps<HTMLElement, VNodeEvents<Element, ElementEventMap>>> {
    const { tagName, id, className } = vNodeSelector(vNode)
    const areSameVNode = tagName === rootTagName && id === rootId && className === rootClassName

    if (areSameVNode) return vNode

    const wrappedVNode = h(rootTagName, { id: rootId, className: rootClassName }, [vNode])

    wrappedVNode.element = rootElement

    return wrappedVNode as ElementVNode
  }
}

function vNodeSelector<T extends Element>(vNode: VNode<T>) {
  const { tagName, props: { id = '', className = '' } } = vNode

  return { tagName: tagName as ValidTagNames, id, className }
}
