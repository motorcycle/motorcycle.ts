import { ApplicationSources, Lights } from '@base/application'
import { DomSinks, DomSources, VNode, div, h1 } from '@motorcycle/mostly-dom'

import { map } from '@motorcycle/stream'

export function UI(sources: UISources): DomSinks {
  const { lights$ } = sources
  const view$ = map(view, lights$)

  return { view$ }
}

export type UISources = DomSources & ApplicationSources

function view(lights: Lights): VNode {
  const { red, yellow, green } = lights

  return div([h1(`red: ${red}`), h1(`yellow: ${yellow}`), h1(`green: ${green}`)])
}
