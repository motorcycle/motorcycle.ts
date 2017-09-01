import { Sinks as AppSinks, Sources as AppSources, Friends } from '../../application'
import { DomSinks, DomSources, VNode } from '@motorcycle/mostly-dom'

export type Sources = DomSources & AppSources

export type Sinks = DomSinks & AppSinks

export type Model = 
  {
    readonly friends: Friends
    readonly searchView: VNode,
  }
