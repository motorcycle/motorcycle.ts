import { VNode, div } from '@motorcycle/mostly-dom'

import { MazeSize } from '../../types'
import { NonnegativeInteger } from '@base/common/types'
import { SokobanView } from './types'
import { VNodes } from '../types'
import { completedAllLevels } from './completedAllLevels'
import { completedLevel } from './completedLevel'
import { curry } from '167'
import { secondsToTime } from './secondsToTime'

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
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center; flex-direction: column; background: #252526; color: #fff;`,
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
