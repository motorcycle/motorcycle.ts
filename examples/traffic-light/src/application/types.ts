import { Stream } from '@motorcycle/types'

export type ApplicationSinks = {}

export type ApplicationSources = {
  lights$: Stream<Lights>
}

export type Lights = {
  red: On | Off
  yellow: On | Off
  green: On | Off
}

export type On = true

export type Off = false

export type Tick = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type Milliseconds = number

export type Integer = number
