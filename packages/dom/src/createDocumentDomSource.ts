import { DocumentDomSource } from './DomSources'
import { Stream } from '@motorcycle/types'

export function createDocumentDomSource(document$: Stream<Document>): DocumentDomSource {
  return new DocumentDomSource(document$)
}
