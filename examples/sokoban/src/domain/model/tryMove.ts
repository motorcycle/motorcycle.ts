import { equals, or } from '167'

import { Tile } from './types'

export function tryMove(tile: Tile): boolean {
  return or(equals<Tile>(' ', tile), equals<Tile>('O', tile))
}
