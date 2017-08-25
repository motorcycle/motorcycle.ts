import { Coordinate, Maze, Tile } from '@base/domain/model'
import { VNode, svg } from '@motorcycle/mostly-dom'

import { Integer } from '@base/common/types'
import { map } from '167'

export function drawMaze(spec: { maze: Maze; movePlayerTo: Coordinate }): ReadonlyArray<VNode> {
  const { maze, movePlayerTo } = spec
  const movePlayerToIndex = coordinateToIndex(movePlayerTo)
  const pictureOfMaze = map((maze, index) => drawTile(maze, index, movePlayerToIndex), maze)

  return pictureOfMaze
}

function coordinateToIndex(coordinate: Coordinate): Integer {
  const { x, y } = coordinate
  const xCount = 9

  return y * xCount + x
}

function drawTile(tile: Tile, index: Integer, movePlayerToIndex: Integer): VNode {
  const addPlayer = index === movePlayerToIndex ? player(index) : blank(index)

  if (tile === 'wall') return wall(index)

  if (tile === 'storage') return storage(addPlayer, index)

  if (tile === 'box') return box(index)

  return ground(addPlayer, index)
}

const { rect, circle, g } = svg

const wall = (key: string | number) =>
  svg(
    {
      attrs: { height: 40, width: 40 },
      key,
    },
    [
      rect({
        attrs: { height: 40, width: 40, fill: `grey`, style: `stroke: white; stroke-width: 0.5` },
      }),
    ]
  )

const ground = (addPerson: VNode, key: string | number) =>
  svg(
    {
      attrs: { height: 40, width: 40 },
      key,
    },
    [
      rect({
        attrs: { height: 40, width: 40, fill: `yellow`, style: `stroke: white; stroke-width: 0.5` },
      }),
      g([addPerson]),
    ]
  )

const storage = (addPerson: VNode, key: string | number) =>
  svg(
    {
      attrs: { height: 40, width: 40 },
      key,
    },
    [
      g([ground(blank(key), `${key}_1`)]),
      circle({
        attrs: { cx: 20, cy: 20, r: 12, fill: `black` },
      }),
      g([addPerson]),
    ]
  )

const box = (key: string | number) =>
  svg(
    {
      attrs: { height: 40, width: 40 },
      key,
    },
    [
      rect({
        attrs: { height: 40, width: 40, fill: `brown`, style: `stroke: white; stroke-width: 0.5` },
      }),
    ]
  )

const blank = (key: string | number) =>
  svg({ attrs: { height: 40, width: 40 }, key: `blank${key}` })

const player = (key: string | number) =>
  svg(
    {
      attrs: { height: 40, width: 40 },
      key: `player${key}`,
    },
    [
      circle({
        attrs: { cx: 20, cy: 20, r: 12, fill: `green` },
      }),
    ]
  )
