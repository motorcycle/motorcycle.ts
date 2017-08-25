import { Integer } from '@base/common/types'
import { Tile } from './'

export function maze(x: Integer, y: Integer): Tile {
  if (x === 0 || x === 8 || y === 0 || y === 8) return 'wall'

  if (x === 6 && y >= 4) return 'wall'

  if (x === 7 && y >= 4) return 'storage'

  if (x >= 2 && y === 4) return 'box'

  return 'ground'
}
