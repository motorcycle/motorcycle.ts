import { VNode, svg } from '@motorcycle/mostly-dom'

import { TILE_SIZE } from '../constants'

export function blank(key: string): VNode {
  return svg({
    attrs: { height: TILE_SIZE, width: TILE_SIZE },
    key: `blank${key}`,
  })
}
