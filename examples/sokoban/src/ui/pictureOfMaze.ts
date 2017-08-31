import { Coordinate, Direction, State, Tile } from '@base/application/types'
import { Dimension, NonnegativeInteger } from '@base/common/types'
import { TILE_CENTER, TILE_SIZE } from './constants'
import { VNode, svg } from '@motorcycle/mostly-dom'
import { curry, equals, flatten, map } from '167'

import { VNodes } from './views/types'

export function pictureOfMaze({ maze, player: { position, direction } }: State): VNodes {
  return flatten<VNode>(map(drawRow(position, direction), maze))
}

const drawRow = curry(function drawRow(
  playerPosition: Coordinate,
  playerDirection: Direction,
  row: Dimension<Tile>,
  y: NonnegativeInteger
): VNodes {
  return map(
    (tile: Tile, x: NonnegativeInteger) =>
      drawTileAt({ x, y }, tile, playerPosition, playerDirection),
    row
  )
})

function drawTileAt(
  coordinate: Coordinate,
  tile: Tile,
  playerPosition: Coordinate,
  playerDirection: Direction
): VNode {
  const { x, y } = coordinate
  const key = `${x}${y}`
  const playerOrBlank = equals(playerPosition, coordinate)
    ? player(playerDirection, key)
    : blank(key)

  return vNode[tile](playerOrBlank, key)
}

const vNode: { [key in Tile]: (playerOrBlank: VNode, key: string) => VNode } = {
  X: (_, key: string) => wall(key),
  ' ': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  O: (playerOrBlank: VNode, key: string) => storage(playerOrBlank, key),
  B: (_, key: string) => box(key),
  _: (_, key: string) => blank(key),
  '^': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  '>': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  v: (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  '<': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
}

const { rect, circle, g, path } = svg

function wall(key: string): VNode {
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

function ground(playerOrBlank: VNode, key: string): VNode {
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

function storage(playerOrBlank: VNode, key: string): VNode {
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

function box(key: string): VNode {
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

function blank(key: string): VNode {
  return svg({
    attrs: { height: TILE_SIZE, width: TILE_SIZE },
    key: `blank${key}`,
  })
}

function player(direction: Direction, key: string): VNode {
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

const rotation: { [key in Direction]: NonnegativeInteger } = {
  up: UP_ANGLE,
  right: RIGHT_ANGLE,
  down: DOWN_ANGLE,
  left: LEFT_ANGLE,
}
