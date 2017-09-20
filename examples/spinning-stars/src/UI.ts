import { DomSinks, DomSources, h1 } from '@motorcycle/mostly-dom'

import { now } from '@motorcycle/stream'

export function UI({}: DomSources): DomSinks {
  const view$ = now(view())

  return { view$ }
}

function view() {
  return h1(`Spinning Stars`)
}
