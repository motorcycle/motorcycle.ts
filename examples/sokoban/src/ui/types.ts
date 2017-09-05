import { ApplicationSinks, ApplicationSources, Level } from '@base/application/types'
import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { DomSource } from '@motorcycle/dom'
import { NonnegativeInteger } from '@base/common/types'

export type UISources = DomSources &
  ApplicationSources & { readonly document: DomSource<Document, Event> }

export type UISinks = DomSinks & ApplicationSinks

export type MazeSize = {
  height: NonnegativeInteger
  width: NonnegativeInteger
}

export type ChangeLevel = (a: Level) => Level

export type LevelCompletion = {
  readonly levelCompleted: boolean
  readonly allLevelsCompleted: boolean
}
