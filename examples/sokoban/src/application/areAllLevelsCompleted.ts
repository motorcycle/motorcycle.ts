import { increment, not } from '167'

import { Level } from './types'
import { mazes } from '@base/domain/model'

export const areAllLevelsCompleted = (completed: boolean, level: Level): boolean =>
  completed && not(mazes[increment(level)]) ? true : false
