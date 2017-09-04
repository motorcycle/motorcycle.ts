import { SokobanView, VNodes } from './types'
import { VNode, div, h1 } from '@motorcycle/mostly-dom'

import { MazeSize } from '../types'
import { curry } from '167'

export const sokoban: SokobanView = curry(function view(
  pictureOfMaze: VNodes,
  { height: mazeHeight, width: mazeWidth }: MazeSize,
  levelComplete: boolean
): VNode {
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
            style: `position: relative; height: ${mazeHeight}px; width: ${mazeWidth}px`,
          },
        },
        pictureOfMaze
      ),
      levelComplete
        ? div(
            {
              attrs: {
                style: `position: absolute; z-index: 1`,
              },
            },
            [
              h1(
                {
                  attrs: {
                    style: `color: #fff; text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;`,
                  },
                },
                `LEVEL SOLVED!`
              ),
            ]
          )
        : div({
            attrs: {
              style: `position: absolute; z-index: 1`,
            },
          }),
    ]
  )
})
