import { SokobanView, VNodes } from './types'
import { VNode, div } from '@motorcycle/mostly-dom'

import { MazeSize } from '../types'
import { curry } from '167'

export const sokoban: SokobanView = curry(function view(
  pictureOfMaze: VNodes,
  mazeSize: MazeSize
): VNode {
  const { height: mazeHeight, width: mazeWidth } = mazeSize

  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center`,
      },
    },
    [
      div(
        {
          attrs: {
            style: `border: 1px solid #c3c3c3; position: relative; height: ${mazeHeight}px; width: ${mazeWidth}px`,
          },
        },
        pictureOfMaze
      ),
    ]
  )
})
