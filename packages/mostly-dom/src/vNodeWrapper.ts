import { ElementVNode, VNode, VNodeEvents, VNodeProps, elementToVNode, h } from 'mostly-dom'

export function vNodeWrapper(rootElement: Element) {
  const rootVNode: ElementVNode = elementToVNode(rootElement)
  const rootVNodeSelector = vNodeSelector(rootVNode)

  return function execute(
    vNode: VNode<any>
  ): VNode<Element, VNodeProps<HTMLElement, VNodeEvents<Element, ElementEventMap>>> {
    if (rootVNodeSelector === vNodeSelector(vNode)) return vNode

    const wrappedVNode = h(rootVNodeSelector, {}, [vNode])

    wrappedVNode.element = rootElement

    return wrappedVNode as ElementVNode
  }
}

function vNodeSelector<T extends Element>(element: VNode<T>): string {
  return (
    (element.tagName as string).toLowerCase() +
    (element.id ? `#${element.id}` : ``) +
    (element.className ? `.${element.className.split(' ').join('.')}` : ``)
  )
}
