import { ApplicationSinks, ApplicationSources } from '@base/application/types'
import { DomSinks, DomSources, VNode } from '@motorcycle/mostly-dom'

import { DomSource } from '@motorcycle/dom'
import { NonnegativeInteger } from '@base/common/types'

export type UISources = DomSources &
  ApplicationSources & { readonly document: DomSource<Document, Event> }

export type UISinks = DomSinks & ApplicationSinks

export type ViewArity2 = {
  (pictureOfMaze: VNodes, mazeSize: MazeSize): VNode

  (pictureOfMaze: VNodes): ViewArity1
}

export type ViewArity1 = {
  (mazeSize: MazeSize): VNode
}

export type VNodes = ReadonlyArray<VNode>

export type MazeSize = {
  height: NonnegativeInteger
  width: NonnegativeInteger
}
