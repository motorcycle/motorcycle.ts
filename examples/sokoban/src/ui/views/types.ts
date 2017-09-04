import { MazeSize } from '../types'
import { NonnegativeInteger } from '@base/common/types'
import { VNode } from '@motorcycle/mostly-dom'

export type StartScreenView = VNode

export type SokobanView = {
  (
    pictureOfMaze: VNodes,
    mazeSize: MazeSize,
    levelComplete: boolean,
    moveCount: NonnegativeInteger
  ): VNode

  (pictureOfMaze: VNodes, mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity1
  (pictureOfMaze: VNodes, mazeSize: MazeSize): SokobanViewArity2
  (pictureOfMaze: VNodes): SokobanViewArity3
}

export type SokobanViewArity1 = {
  (moveCount: NonnegativeInteger): VNode
}

export type SokobanViewArity2 = {
  (levelComplete: boolean, moveCount: NonnegativeInteger): VNode
  (levelComplete: boolean): SokobanViewArity1
}

export type SokobanViewArity3 = {
  (mazeSize: MazeSize, levelComplete: boolean, moveCount: NonnegativeInteger): VNode
  (mazeSize: MazeSize, levelComplete: boolean): SokobanViewArity1
  (mazeSize: MazeSize): SokobanViewArity2
}

export type VNodes = ReadonlyArray<VNode>
