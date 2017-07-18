import { Test, describe, it } from '@typed/test'
import { delay, drain, map, observe, scan, startWith, take, tap } from '../../combinators'

import { Assertions } from '@typed/assertions'
import { Stream } from '@motorcycle/types'
import { createProxy } from './createProxy'
import { periodic } from '../periodic'

const addOne = (x: number) => x + 1
const addOne$ = scan<any, number>(addOne, 0)

export const test: Test = describe(`createProxy`, [
  it(`creates circular dependencies`, assert => {
    const { attach, stream } = createProxy<number>()

    const origin = addOne$(periodic(10))

    attach(origin)

    return assertExpected([0, 1, 2], assert, stream)
  }),

  it(`can be attached to itself (no memory leak)`, (assert, done) => {
    const { attach, stream } = createProxy<number>()

    function makeAssertions(currentValue: number) {
      if (currentValue === 8) Promise.resolve(void 0).then(done)

      assert.notOk(currentValue > 8)
    }

    const origin = map(x => x * 2, startWith(1, tap(makeAssertions, stream)))

    drain(take(3, attach(delay(10, origin))))
  }),

  it(`allows reattaching after completion`, ({ equal }) => {
    const { attach, stream } = createProxy<number>()

    const origin = addOne$(take(3, periodic(2)))

    attach(origin)

    return drain(stream).then(() => attach(origin)).then(drain).then(() => equal(1, 1))
  }),
])

function assertExpected<A>(expected: Array<A>, assert: Assertions, stream: Stream<A>) {
  const actual: Array<A> = []

  return observe(x => actual.push(x), take<A>(expected.length, stream)).then(() => {
    for (let i = 0; i < expected.length; ++i) assert.equal(expected[i], actual[i])
  })
}
