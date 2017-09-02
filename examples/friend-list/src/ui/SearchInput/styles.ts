import { style } from 'typestyle'

export const searchInputClass = style({
  padding: '2px',
  appearance: 'none',
  width: '100%',
  height: '35px',
  outline: 'none',
  border: '2px solid rgb(219, 228, 237)',
  borderRadius: '3px',
  paddingRight: '5px',
  $nest: {
    '&:focus': {
      border: '2px solid rgb(189, 198, 207)',
    },
  },
})
