import { flatten, map } from '167'

import { State } from '@base/application/types'
import { VNode } from '@motorcycle/mostly-dom'
import { VNodes } from '../views/types'
import { drawRow } from './drawRow'

export function pictureOfMaze({ maze, player: { position, direction } }: State): VNodes {
  return flatten<VNode>(map(drawRow(position, direction), maze))
}
