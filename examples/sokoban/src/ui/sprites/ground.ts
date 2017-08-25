import { VNode, svg } from '@motorcycle/mostly-dom'

import { TILE_SIZE } from '../constants'

const { rect, g } = svg

export function ground(playerOrBlank: VNode, key: string): VNode {
  return svg(
    {
      attrs: { height: TILE_SIZE, width: TILE_SIZE },
      key: `ground${key}`,
    },
    [
      rect({
        attrs: {
          height: TILE_SIZE,
          width: TILE_SIZE,
          fill: `yellow`,
          style: `stroke: white; stroke-width: 0.5`,
        },
      }),
      g([playerOrBlank]),
    ]
  )
}
