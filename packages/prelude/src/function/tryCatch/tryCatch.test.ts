import { eq } from '@briancavalier/assert'
import { Test, describe, it } from '@typed/test'

import { tryCatch } from './tryCatch'

export const test: Test = describe(
  `tryCatch`,
  describe(
    `given a function that throws and an error handler`,
    it(`catches the error thrown`, () => {
      const error = new Error(`error`)
      const tryer = () => {
        throw error
      }
      const catcher = (err: Error) => eq(err, error)

      tryCatch(tryer, catcher)
    })
  )
)
