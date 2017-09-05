import { MazeSize } from '../../types'
import { NonnegativeInteger } from '@base/common/types'
import { Seconds } from '@base/application/types'
import { VNode } from '@motorcycle/mostly-dom'
import { VNodes } from '../types'

export type SokobanView = {
  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: Seconds,
    allLevelsCompleted: boolean
  ): VNode

  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: Seconds
  ): SokobanViewArity1
  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger
  ): SokobanViewArity2
  (pictureOfMaze: VNodes, mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity3
  (pictureOfMaze: VNodes, mazeSize: MazeSize): SokobanViewArity4
  (pictureOfMaze: VNodes): SokobanViewArity5
}

export type SokobanViewArity1 = {
  (allLevelsCompleted: boolean): VNode
}

export type SokobanViewArity2 = {
  (elapsedTime: Seconds, allLevelsCompleted: boolean): VNode
  (elapsedTime: Seconds): SokobanViewArity1
}

export type SokobanViewArity3 = {
  (moveCount: NonnegativeInteger, elapsedTime: Seconds, allLevelsCompleted: boolean): VNode
  (moveCount: NonnegativeInteger, elapsedTime: Seconds): SokobanViewArity1
  (moveCount: NonnegativeInteger): SokobanViewArity2
}

export type SokobanViewArity4 = {
  (
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: Seconds,
    allLevelsCompleted: boolean
  ): VNode
  (levelComplete: boolean, moveCount: NonnegativeInteger, elapsedTime: Seconds): SokobanViewArity1
  (levelComplete: boolean, moveCount: NonnegativeInteger): SokobanViewArity2
  (levelComplete: boolean): SokobanViewArity3
}

export type SokobanViewArity5 = {
  (
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: Seconds,
    allLevelsCompleted: boolean
  ): VNode
  (
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: Seconds
  ): SokobanViewArity1
  (mazeSize: MazeSize, levelComplete: boolean, moveCount: NonnegativeInteger): SokobanViewArity2
  (mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity3
  (mazeSize: MazeSize): SokobanViewArity4
}

export type Time = string
