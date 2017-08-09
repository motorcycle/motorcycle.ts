import { DomSinks, DomSources, h1 } from '@motorcycle/mostly-dom'

import { now } from '@motorcycle/stream'

export function UI(sources: DomSources): DomSinks {
  const {} = sources

  return { view$: now(h1(`Traffic Lights`)) }
}
