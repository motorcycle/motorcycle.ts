import { LevelCompletion } from './types'

export function canIncrementLevel({
  levelCompleted,
  allLevelsCompleted,
}: LevelCompletion): boolean {
  if (allLevelsCompleted) return false

  if (levelCompleted) return true

  return false
}
