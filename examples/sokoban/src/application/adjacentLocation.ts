import { Coordinate, Direction } from './types'
import { decrement, increment } from '167'

export const adjacentLocation: { [key in Direction]: (from: Coordinate) => Coordinate } = {
  up: ({ lat, long }) => ({ lat, long: decrement(long) }),
  right: ({ lat, long }) => ({ lat: increment(lat), long }),
  down: ({ lat, long }) => ({ lat, long: increment(long) }),
  left: ({ lat, long }) => ({ lat: decrement(lat), long }),
}
