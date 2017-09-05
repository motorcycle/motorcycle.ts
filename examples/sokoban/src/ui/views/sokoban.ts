import { SokobanView, VNodes } from './types'
import { VNode, div, h1, span } from '@motorcycle/mostly-dom'

import { MazeSize } from '../types'
import { NonnegativeInteger } from '@base/common/types'
import { curry } from '167'
import { secondsToTime } from '../secondsToTime'

export const sokoban: SokobanView = curry(function view(
  pictureOfMaze: VNodes,
  { height: mazeHeight, width: mazeWidth }: MazeSize,
  levelComplete: boolean,
  moveCount: NonnegativeInteger,
  elapsedTime: NonnegativeInteger,
  allLevelsCompleted: boolean
): VNode {
  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center; flex-direction: column`,
      },
    },
    [
      div({ attrs: { style: `position: relative; width: 760px; margin-bottom: 20px;` } }, [
        div([`Moves: ${moveCount}`]),
        div([`Elapsed time: ${secondsToTime(elapsedTime)}`]),
      ]),
      div(
        {
          attrs: {
            style: `position: relative; height: ${mazeHeight}px; width: ${mazeWidth}px`,
          },
        },
        pictureOfMaze
      ),
      allLevelsCompleted
        ? completedAllLevels
        : levelComplete
          ? completedLevel
          : div({
              attrs: {
                style: `position: absolute; z-index: 1`,
              },
            }),
    ]
  )
})

const completedLevel = div(
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

const completedAllLevels = div(
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
      `ALL LEVELS SOLVED!`
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
          `ESC`
        ),
        `TO PLAY AGAIN`,
      ]
    ),
  ]
)
