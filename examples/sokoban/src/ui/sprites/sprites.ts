import { blank, box, ground, storage, wall } from './'

import { Tile } from '@base/application/types'
import { VNode } from '@motorcycle/mostly-dom'

export const sprites: { [key in Tile]: (playerOrBlank: VNode, key: string) => VNode } = {
  X: (_, key: string) => wall(key),
  ' ': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  O: (playerOrBlank: VNode, key: string) => storage(playerOrBlank, key),
  B: (_, key: string) => box(key),
  _: (_, key: string) => blank(key),
  '^': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  '>': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  v: (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
  '<': (playerOrBlank: VNode, key: string) => ground(playerOrBlank, key),
}
