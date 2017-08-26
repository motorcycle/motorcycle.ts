import { Coordinate, Direction, Maze, Tile } from '@base/domain/model'
import { VNode, svg } from '@motorcycle/mostly-dom'

import { Integer } from '@base/common/types'
import { map } from '167'

export function drawMaze(spec: {
  maze: Maze
  movePlayerTo: Coordinate
  playerDirection: Direction
}): ReadonlyArray<VNode> {
  const { maze, movePlayerTo, playerDirection } = spec
  const movePlayerToIndex = coordinateToIndex(movePlayerTo)
  const pictureOfMaze = map(
    (maze, index) => drawTile(maze, index, movePlayerToIndex, playerDirection),
    maze
  )

  return pictureOfMaze
}

function coordinateToIndex(coordinate: Coordinate): Integer {
  const { x, y } = coordinate
  const xCount = 9

  return y * xCount + x
}

function drawTile(
  tile: Tile,
  index: Integer,
  movePlayerToIndex: Integer,
  playerDirection: Direction
): VNode {
  const addPlayer = index === movePlayerToIndex ? player(index, playerDirection) : blank(index)

  if (tile === 'wall') return wall(index)

  if (tile === 'storage') return storage(addPlayer, index)

  if (tile === 'box') return box(index)

  return ground(addPlayer, index)
}

const { rect, circle, g, path } = svg

const wall = (key: Integer) =>
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

const ground = (addPerson: VNode, key: string | Integer) =>
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

const storage = (addPerson: VNode, key: Integer) =>
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

const box = (key: Integer) =>
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

const blank = (key: Integer) => svg({ attrs: { height: 40, width: 40 }, key: `blank${key}` })

function player(key: Integer, direction: Direction): VNode {
  return svg(
    {
      attrs: { height: 40, width: 40 },
      key: `player${key}`,
    },
    [
      g({ attrs: { transform: `rotate(${rotation[direction]}, 20, 20)` } }, [
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
      ]),
    ]
  )
}

const rotation: { [key in Direction]: Integer } = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
}
