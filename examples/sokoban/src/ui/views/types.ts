import { MazeSize } from '../types'
import { NonnegativeInteger } from '@base/common/types'
import { VNode } from '@motorcycle/mostly-dom'

export type StartScreenView = VNode

export type SokobanView = {
  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: NonnegativeInteger
  ): VNode

  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger
  ): SokobanViewArity1
  (pictureOfMaze: VNodes, mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity2
  (pictureOfMaze: VNodes, mazeSize: MazeSize): SokobanViewArity3
  (pictureOfMaze: VNodes): SokobanViewArity4
}

export type SokobanViewArity1 = {
  (elapsedTime: NonnegativeInteger): VNode
}

export type SokobanViewArity2 = {
  (moveCount: NonnegativeInteger, elapsedTime: NonnegativeInteger): VNode
  (moveCount: NonnegativeInteger): SokobanViewArity1
}

export type SokobanViewArity3 = {
  (levelComplete: boolean, moveCount: NonnegativeInteger, elapsedTime: NonnegativeInteger): VNode
  (levelComplete: boolean, moveCount: NonnegativeInteger): SokobanViewArity1
  (levelComplete: boolean): SokobanViewArity2
}

export type SokobanViewArity4 = {
  (
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger,
    elapsedTime: NonnegativeInteger
  ): VNode
  (mazeSize: MazeSize, levelComplete: boolean, moveCount: NonnegativeInteger): SokobanViewArity1
  (mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity2
  (mazeSize: MazeSize): SokobanViewArity3
}

export type VNodes = ReadonlyArray<VNode>
