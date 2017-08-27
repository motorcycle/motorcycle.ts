import { Tile } from './types'

export function playerCanMoveTo(tile: Tile): boolean {
  return tile === 'G' || tile === 'S'
}
