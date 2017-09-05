import { div, h1, span } from '@motorcycle/mostly-dom'

import { StartScreenView } from './types'

export function startScreen(): StartScreenView {
  return div(
    {
      attrs: {
        style: `position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; justify-content: center; align-items: center; flex-direction: column; background: #252526; color: #fff;`,
      },
    },
    [
      h1(
        {
          attrs: {
            style: `color: #f7cc00; text-shadow: -2px 0 #000, 0 2px #000, 2px 0 #000, 0 -2px #000; font-size: 106px; margin: 0; margin-bottom: 20px`,
          },
        },
        `SOKOBAN`
      ),
      div({ attrs: { style: `margin: 4px` } }, [
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin: 4px;`,
            },
          },
          `SPACE`
        ),
        `OR`,
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin: 4px;`,
            },
          },
          `ENTER ↵`
        ),
        `TO START LEVEL`,
      ]),
      div({ attrs: { style: `margin: 4px` } }, [
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin: 4px;`,
            },
          },
          `ESC`
        ),
        `TO QUIT`,
      ]),
      div({ attrs: { style: `margin: 4px` } }, [
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin-right: 4px;`,
            },
          },
          `⬆`
        ),
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin-right: 4px;`,
            },
          },
          `➡`
        ),
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin-right: 4px;`,
            },
          },
          `⬇`
        ),
        span(
          {
            attrs: {
              style: `padding-right: 4px; padding-left: 4px; border-radius: 3px; background: #000; margin-right: 4px;`,
            },
          },
          `⬅`
        ),
        ` TO MOVE PLAYER`,
      ]),
    ]
  )
}
