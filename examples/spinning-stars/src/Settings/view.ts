import { VNode, div, input } from '@motorcycle/mostly-dom'

import { NonnegativeInteger } from '@base/common/types'

export const STARS_INPUT_CSS_CLASS: string = `stars-input`
export const SPEED_INPUT_CSS_CLASS: string = `speed-input`
export const BLUR_INPUT_CSS_CLASS: string = `blur-input`
export const GLOW_INPUT_CSS_CLASS: string = `glow-input`

export function view(starsCount: NonnegativeInteger): VNode {
  return div(
    { attrs: { style: `position: absolute; top: 16px; right: 16px; color: white; padding: 8px; background: rgba(0, 87, 124, 0.3)` } },
    [
      div(
        {
          attrs: {
            style: `display: flex; justify-content: center; align-items: center; width: 40px; height: 40px; margin-left: auto; margin-right: 0`,
          },
        },
        [div({ attrs: { style: `font-size: 24px; font-weight: 700` } }, `⚙`)]
      ),
      div({ attrs: { style: `padding: 8px` } }, [
        div({ attrs: { style: `display: flex; margin: 8px 0` } }, [
          div({ attrs: { style: `margin-right: 16px` } }, `Stars`),
          input({
            attrs: { type: 'range', min: 0, max: 2000, value: starsCount },
            className: `${STARS_INPUT_CSS_CLASS}`,
          }),
        ]),
        div({ attrs: { style: `display: flex; margin: 8px 0` } }, [
          div({ attrs: { style: `margin-right: 16px` } }, `Speed`),
          input({
            attrs: { type: 'range', min: 1, max: 10, value: 1 },
            className: `${SPEED_INPUT_CSS_CLASS}`,
          }),
        ]),
        div({ attrs: { style: `display: flex; margin: 8px 0` } }, [
          div({ attrs: { style: `margin-right: 16px` } }, `Trail`),
          input({
            attrs: { type: 'range', min: 1, max: 20, value: 2 },
            className: `${BLUR_INPUT_CSS_CLASS}`,
          }),
        ]),
        div({ attrs: { style: `display: flex; margin: 8px 0` } }, [
          div({ attrs: { style: `margin-right: 16px` } }, `Glow`),
          input({
            attrs: { type: 'range', min: 1, max: 20, value: 10 },
            className: `${GLOW_INPUT_CSS_CLASS}`,
          }),
        ]),
      ]),
    ]
  )
}
