import { VNode, svg } from '@motorcycle/mostly-dom'

import { TILE_SIZE } from '../constants'

const { rect } = svg

export function wall(key: string): VNode {
  return svg(
    {
      attrs: { height: TILE_SIZE, width: TILE_SIZE },
      key: `wall${key}`,
    },
    [
      rect({
        attrs: {
          height: TILE_SIZE,
          width: TILE_SIZE,
          fill: `grey`,
          style: `stroke: white; stroke-width: 0.5`,
        },
      }),
    ]
  )
}
