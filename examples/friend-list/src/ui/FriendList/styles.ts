import { style } from 'typestyle'

export const appClass = style({
  margin: '20px auto',
  maxWidth: '400px',
})

export const friendListClass = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,

  $nest: {
    'li': {
      borderRadius: '3px',
      backgroundColor: '#eee',
      padding: '7px',
      margin: '5px 0'
    },

    'h4': {
      color: '#555'
    },

    '.username': {
      color: '#9aa',
      fontSize: '90%',
      fontWeight: 'normal'
    }
  }
})
