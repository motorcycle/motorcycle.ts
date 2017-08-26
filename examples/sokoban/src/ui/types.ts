import { ApplicationSinks, ApplicationSources } from '@base/application'
import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { DomSource } from '@motorcycle/dom'

export type UISources = DomSources &
  ApplicationSources & { readonly document: DomSource<Document, Event> }

export type UISinks = DomSinks & ApplicationSinks
