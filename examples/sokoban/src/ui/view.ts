import { VNode, div } from '@motorcycle/mostly-dom'

export function view(maze: ReadonlyArray<VNode>): VNode {
  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center`,
      },
    },
    [
      div(
        {
          attrs: {
            style: `border: 1px solid #c3c3c3; height: 360px; width: 360px`,
          },
        },
        maze
      ),
    ]
  )
}
