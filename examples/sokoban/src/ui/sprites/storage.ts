import { VNode, svg } from '@motorcycle/mostly-dom'
import { blank, ground } from './'

import { TILE_SIZE } from '../constants'

const { circle, g } = svg

export function storage(playerOrBlank: VNode, key: string): VNode {
  return svg(
    {
      attrs: { height: TILE_SIZE, width: TILE_SIZE },
      key: `storage${key}`,
    },
    [
      g([ground(blank(key), key)]),
      circle({
        attrs: { cx: 20, cy: 20, r: 12, fill: `black` },
      }),
      g([playerOrBlank]),
    ]
  )
}
