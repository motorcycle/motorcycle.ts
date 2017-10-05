import { DomSinks, DomSources } from '@motorcycle/mostly-dom'
import { NonnegativeInteger, NonnegativeRationalNumber } from '@base/common/types';

import { Stream } from '@motorcycle/types'

export type UISources = DomSources & SpinningStarsSources

export type UISinks = DomSinks & SpinningStarsSinks

export type SpinningStarsSources = {}

export type SpinningStarsSinks = {
  canvas$: Stream<HTMLCanvasElement>
  starCount$: Stream<NonnegativeInteger>
  rotationSpeed$: Stream<NonnegativeRationalNumber>
  trail$: Stream<NonnegativeRationalNumber>
  glow$: Stream<NonnegativeInteger>
}

export type VersionedStars = {
  version: NonnegativeInteger
  stars: Stars
}

export type Stars = ReadonlyArray<Star>

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
  color: string
  glow: NonnegativeInteger
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

export type SpectralTypes = ReadonlyArray<SpectralType>

export type SpectralType = 'O' | 'B' | 'A' | 'F' | 'G' | 'K' | 'M'

export type TemperatureRange = {
  min: Kelvin
  max: Kelvin
}

export type Kelvin = number
