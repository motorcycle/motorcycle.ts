import { VNode, div, input } from '@motorcycle/mostly-dom'

export const STARS_COUNT_CSS_CLASS: string = `stars-count`

export function view(): VNode {
  return div(
    { attrs: { style: `position: absolute; top: 16px; right: 16px; color: white; padding: 8px` } },
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
        div({ attrs: { style: `display: flex;` } }, [
          div({ attrs: { style: `margin-right: 16px` } }, `Stars`),
          input({
            attrs: { type: 'range', min: 0, max: 2000, value: 1000 },
            className: `${STARS_COUNT_CSS_CLASS}`,
          }),
        ]),
      ]),
    ]
  )
}
