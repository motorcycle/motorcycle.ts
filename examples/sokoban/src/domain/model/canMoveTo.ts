import { Tile } from './'

export function canMoveTo(tile: Tile): boolean {
  return tile === 'ground' || tile === 'storage'
}
