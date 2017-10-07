import { VNode, div, li, ul } from '@motorcycle/mostly-dom'

export function view(children: Array<VNode>): VNode {
  return div([ul(children)])
}

export function listItem(item: string, key: number): VNode {
  return li({ key, attrs: { 'data-key': key, draggable: true } }, [item])
}
