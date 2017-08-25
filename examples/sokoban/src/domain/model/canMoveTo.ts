import { Tile } from './'

export function canMoveTo(tile: Tile): boolean {
  if (tile === 'ground' || tile === 'storage') return true

  return false
}
