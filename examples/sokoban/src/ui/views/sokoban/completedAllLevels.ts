import { VNode, div, h1, span } from '@motorcycle/mostly-dom'

export const completedAllLevels: VNode = div(
  {
    attrs: {
      style: `position: absolute; z-index: 1; display: flex; justify-content: center; align-items: center; flex-direction: column;`,
    },
  },
  [
    h1(
      {
        attrs: {
          style: `color: #fff; text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000;`,
        },
      },
      `ALL LEVELS SOLVED!`
    ),
    div(
      {
        attrs: {
          style: `margin: 4px; color: #fff; text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;`,
        },
      },
      [
        `PRESS`,
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background-color: #000; margin: 4px; text-shadow: none;`,
            },
          },
          `ESC`
        ),
        `TO PLAY AGAIN`,
      ]
    ),
  ]
)
