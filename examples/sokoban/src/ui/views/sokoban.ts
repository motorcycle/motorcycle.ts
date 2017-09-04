import { SokobanView, VNodes } from './types'
import { VNode, div, h1, span } from '@motorcycle/mostly-dom'

import { MazeSize } from '../types'
import { NonnegativeInteger } from '@base/common/types'
import { curry } from '167'

export const sokoban: SokobanView = curry(function view(
  pictureOfMaze: VNodes,
  { height: mazeHeight, width: mazeWidth }: MazeSize,
  levelComplete: boolean,
  moveCount: NonnegativeInteger
): VNode {
  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center; flex-direction: column`,
      },
    },
    [
      div({ attrs: { style: `position: relative; width: 760px; margin-bottom: 20px;` } }, [
        `Moves: ${moveCount}`,
      ]),
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
                style: `position: absolute; z-index: 1; display: flex; justify-content: center; align-items: center; flex-direction: column;`,
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
              div(
                {
                  attrs: {
                    style: `margin: 4px; color: #fff; text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;`,
                  },
                },
                [
                  `PRESS`,
                  span(
                    {
                      attrs: {
                        style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background-color: #000; margin: 4px; text-shadow: none;`,
                      },
                    },
                    `SPACE`
                  ),
                  `OR`,
                  span(
                    {
                      attrs: {
                        style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background-color: #000; margin: 4px; text-shadow: none;`,
                      },
                    },
                    `ENTER ↵`
                  ),
                  `TO CONTINUE`,
                ]
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
