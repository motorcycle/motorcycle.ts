import { Stream } from '@motorcycle/types'
import { equals } from '@typed/prelude'
import { skipRepeatsWith } from './skipRepeatsWith'

/**
 * Remove adjacent events that are equal in terms of value equality.
 *
 * @name skipRepeats<A>(stream: Stream<A>): Stream<A>
 * @example
 *
 * const a = { a: 1 }
 * const b = Object.assign({}, a)
 * const c = { c: 2 }
 *
 * const source = // --a--b--a--c-->
 * //                --a--------c-->
 * const stream = skipRepeats(source)
 *
 * observe(console.log, stream)
 * // { a: 1 }
 * // { c: 2 }
 */
export const skipRepeats: SkipRepeats = skipRepeatsWith(equals)

export type SkipRepeats = <A>(stream: Stream<A>) => Stream<A>
