import { MazeSize } from '../types'
import { VNode } from '@motorcycle/mostly-dom'

export type StartScreenView = VNode

export type SokobanView = {
  (pictureOfMaze: VNodes, mazeSize: MazeSize, gameWon: boolean): VNode

  (pictureOfMaze: VNodes, mazeSize: MazeSize): SokobanViewArity1
  (pictureOfMaze: VNodes): SokobanViewArity2
}

export type SokobanViewArity2 = {
  (mazeSize: MazeSize, gameWon: boolean): VNode
  (mazeSize: MazeSize): SokobanViewArity1
}

export type SokobanViewArity1 = {
  (gameWon: boolean): VNode
}

export type VNodes = ReadonlyArray<VNode>
