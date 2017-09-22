import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { List } from '@typed/prelude'
import { Stream } from '@motorcycle/types'

export type UISources = DomSources

export type UISinks = DomSinks & SpinningStarsSinks

export type SpinningStarsSinks = {
  canvas$: Stream<HTMLCanvasElement>
}

export type SpinningStarsSources = {}

export type Random = (n: number) => number

export type Stars = List<Star>

export type Star = {
  radius: number
  angle: number
  speed: number
}

export type Space = {
  ctx: CanvasRenderingContext2D
  size: Dimensions
  stars: Stars
}

export type Dimensions = {
  height: number
  width: number
}
