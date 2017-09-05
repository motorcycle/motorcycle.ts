import { TILE_CENTER, TILE_SIZE } from '../constants'
import { VNode, svg } from '@motorcycle/mostly-dom'

import { Degrees } from './types'
import { Direction } from '@base/application/types'

const { rect, circle, g, path } = svg

export function player(direction: Direction, key: string): VNode {
  return svg(
    {
      attrs: { height: TILE_SIZE, width: TILE_SIZE },
      key: `player${key}`,
    },
    [
      g(
        { attrs: { transform: `rotate(${rotation[direction]}, ${TILE_CENTER}, ${TILE_CENTER})` } },
        [
          rect({
            attrs: { x: 11, y: 19, width: 9, height: 10, fill: `#0088A8` },
          }),
          path({
            attrs: { d: `M11,29c0,2.292,2.186,4,4.5,4s4.5-1.75,4.5-4H11z`, fill: `#00363F` },
          }),
          path({
            attrs: { d: `M21.537,0C20.584,1.062,20,2.461,20,4v5h6V4V0H21.537z`, fill: `#0088A8` },
          }),
          path({
            attrs: {
              d: `M26,3v10H14V3H8v9c0,6.646,5.354,12,12,12s12-5.354,12-12V3H26z`,
              fill: `#009CD3`,
            },
          }),
          circle({
            attrs: { cx: 20, cy: 12, r: 7, fill: `#FFB600` },
          }),
          rect({
            attrs: { x: 8, width: 6, height: 3, fill: `#FFC692` },
          }),
          rect({
            attrs: { x: 26, width: 6, height: 3, fill: `#FFC692` },
          }),
        ]
      ),
    ]
  )
}

const UP_ANGLE = 0
const RIGHT_ANGLE = 90
const DOWN_ANGLE = 180
const LEFT_ANGLE = 270

const rotation: { [key in Direction]: Degrees } = {
  up: UP_ANGLE,
  right: RIGHT_ANGLE,
  down: DOWN_ANGLE,
  left: LEFT_ANGLE,
}
