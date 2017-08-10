import { Color, LightBulbs } from './'
import { VNode, div, svg } from '@motorcycle/mostly-dom'

import { Lights } from '@base/application'

export function view(lights: Lights): VNode {
  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center`,
      },
    },
    [trafficLight(lights)]
  )
}

function trafficLight(lights: Lights): VNode {
  const { red, yellow, green } = lights

  return frame([
    lightBulb(red ? 'red' : 'black'),
    lightBulb(yellow ? 'yellow' : 'black'),
    lightBulb(green ? 'green' : 'black'),
  ])
}

function frame(lightBulbs: LightBulbs): VNode {
  return div(
    {
      attrs: {
        style: `display: flex; flex-direction: column; border: 1px solid black; height: 300px; width: 100px`,
      },
    },
    lightBulbs
  )
}

const { circle } = svg

function lightBulb(color: Color): VNode {
  const {} = color

  return svg(
    {
      attrs: { height: 100, width: 100 },
    },
    [
      circle({
        attrs: {
          cx: 50,
          cy: 50,
          r: 40,
          fill: color,
        },
      }),
    ]
  )
}
