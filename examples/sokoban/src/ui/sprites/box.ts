import { VNode, svg } from '@motorcycle/mostly-dom'

import { TILE_SIZE } from '../constants'

const { rect } = svg

export function box(key: string): VNode {
  return svg(
    {
      attrs: { height: TILE_SIZE, width: TILE_SIZE },
      key: `box${key}`,
    },
    [
      rect({
        attrs: {
          height: TILE_SIZE,
          width: TILE_SIZE,
          fill: `brown`,
          style: `stroke: white; stroke-width: 0.5`,
        },
      }),
    ]
  )
}
