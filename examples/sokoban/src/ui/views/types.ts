import { MazeSize } from '../types'
import { VNode } from '@motorcycle/mostly-dom'

export type StartScreenView = VNode

export type SokobanView = {
  (pictureOfMaze: VNodes, mazeSize: MazeSize): VNode

  (pictureOfMaze: VNodes): SokobanViewArity1
}

export type SokobanViewArity1 = {
  (mazeSize: MazeSize): VNode
}

export type VNodes = ReadonlyArray<VNode>
