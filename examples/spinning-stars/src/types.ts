import { DomSinks, DomSources } from '@motorcycle/mostly-dom'

import { List } from '@typed/prelude'
import { Stream } from '@motorcycle/types'

export type UISources = DomSources

export type UISinks = DomSinks & SpinningStarsSinks

export type SpinningStarsSinks = {
  canvas$: Stream<HTMLCanvasElement>
}

export type SpinningStarsSources = {}

export type Stars = List<Star>

export type Star = {
  offset: number
  angle: number
  speed: number
  color: string
  radius: number
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

export type Rgb = {
  r: RgbComponentValue
  g: RgbComponentValue
  b: RgbComponentValue
}

export type RgbComponentValue = NonnegativeInteger

export type NonnegativeInteger = number

export type SpectralTypes = List<SpectralType>

export type SpectralType = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'

export type TemperatureRange = {
  min: Kelvin
  max: Kelvin
}

export type Kelvin = number
