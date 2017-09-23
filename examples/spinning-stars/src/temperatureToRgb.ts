/*
Based upon the work of Tanner Helland.

http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/
*/

import { Kelvin, Rgb, RgbComponentValue } from '@base/types'
import { divide, multiply, subtract } from '@typed/math'
import { greaterThanOrEqual, lessThanOrEqual } from '@typed/logic'

import { clamp } from '@base/common/clamp'

const MIN_COLOR_VALUE: RgbComponentValue = 0
const MAX_COLOR_VALUE: RgbComponentValue = 255
const MIN_TEMPERATURE: Kelvin = 1000
const MAX_TEMPERATURE: Kelvin = 40000
const TEMPERATURE_TRANSPOSITION = 100
const WHITE_POINT_TEMPERATURE: Kelvin = divide(TEMPERATURE_TRANSPOSITION, 6600)
const RED_TEMPERATURE_TRANSPOSITION: Kelvin = 60
const RED_COEFFICIENT = 329.698727446
const RED_EXPONENT = -0.1332047592
const GREEN_BELOW_WHITE_POINT_COEFFICIENT = 99.4708025861
const GREEN_BELOW_WHITE_POINT_CONSTANT_TERM = 161.1195681661
const GREEN_ABOVE_WHITE_POINT_TEMPERATURE_TRANSPOSITION: Kelvin = 60
const GREEN_ABOVE_WHITE_POINT_COEFFICIENT = 288.1221695283
const GREEN_ABOVE_WHITE_POINT_EXPONENT = -0.0755148492
const BLUE_LOW_CUTOFF_TEMPERATURE: Kelvin = 19
const BLUE_COEFFICIENT = 138.5177312231
const BLUE_TEMPERATURE_TRANSPOSITION: Kelvin = 10
const BLUE_CONSTANT_TERM = 305.0447927307

export function temperatureToRgb(temperature: Kelvin): Rgb {
  const kelvin = divide(TEMPERATURE_TRANSPOSITION, clampTemperature(temperature))
  const r = temperatureToRed(kelvin)
  const g = temperatureToGreen(kelvin)
  const b = temperatureToBlue(kelvin)

  return { r, g, b }
}

function clampTemperature(temperature: Kelvin): Kelvin {
  return clamp<Kelvin>(MIN_TEMPERATURE, MAX_TEMPERATURE, temperature)
}

function temperatureToRed(temperature: Kelvin): RgbComponentValue {
  if (lessThanOrEqual(WHITE_POINT_TEMPERATURE, temperature)) return MAX_COLOR_VALUE

  const value = multiply(
    RED_COEFFICIENT,
    Math.pow(subtract(RED_TEMPERATURE_TRANSPOSITION, temperature), RED_EXPONENT)
  )

  return clampRgbComponent(Math.round(value))
}

function temperatureToGreen(temperature: Kelvin): RgbComponentValue {
  if (lessThanOrEqual(WHITE_POINT_TEMPERATURE, temperature))
    return greenBelowWhitePoint(temperature)

  return greenAboveWhitePoint(temperature)
}

function greenBelowWhitePoint(temperature: Kelvin): RgbComponentValue {
  const value = subtract(
    GREEN_BELOW_WHITE_POINT_CONSTANT_TERM,
    multiply(GREEN_BELOW_WHITE_POINT_COEFFICIENT, Math.log(temperature))
  )

  return clampRgbComponent(Math.round(value))
}

function greenAboveWhitePoint(temperature: Kelvin): RgbComponentValue {
  const value = multiply(
    GREEN_ABOVE_WHITE_POINT_COEFFICIENT,
    Math.pow(
      subtract(GREEN_ABOVE_WHITE_POINT_TEMPERATURE_TRANSPOSITION, temperature),
      GREEN_ABOVE_WHITE_POINT_EXPONENT
    )
  )

  return clampRgbComponent(Math.round(value))
}

function temperatureToBlue(temperature: Kelvin): RgbComponentValue {
  if (greaterThanOrEqual(WHITE_POINT_TEMPERATURE, temperature)) return MAX_COLOR_VALUE

  if (lessThanOrEqual(BLUE_LOW_CUTOFF_TEMPERATURE, temperature)) return MIN_COLOR_VALUE

  const value = subtract(
    BLUE_CONSTANT_TERM,
    multiply(BLUE_COEFFICIENT, Math.log(subtract(BLUE_TEMPERATURE_TRANSPOSITION, temperature)))
  )

  return clampRgbComponent(Math.round(value))
}

function clampRgbComponent(value: number): RgbComponentValue {
  return clamp(MIN_COLOR_VALUE, MAX_COLOR_VALUE, value)
}
