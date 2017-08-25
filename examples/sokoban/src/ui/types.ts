import { ApplicationSinks, ApplicationSources } from '@base/application'
import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

export type UISources = DomSources & ApplicationSources

export type UISinks = DomSinks & ApplicationSinks
