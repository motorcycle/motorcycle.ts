import { Stream } from '@motorcycle/types'
import { curry2 } from '@typed/functions'
import { map } from './map'
import { switchLatest } from './switchLatest'

/**
 * Applies a function, which returns a higher-order stream, to each event value
 * of a stream and returns a new stream that adopts the behavior of (i.e.,
 * emits the events of) the most recent inner stream.
 *
 * @name switchMap<A, B = A>(f: (a: A) => Stream<B>, s: Stream<A>): Stream<B>
 *
 * @example
 * import { now, scan, switchMap, observe, skip } from '@motorcycle/stream'
 *
 * const a$ = now(1)
 * const b$ = now(2)
 * const f = (a: number) => scan((x, y) => x + y, a, b$)
 * const s = skip(1, switchMap(f, a$))
 *
 * observe(console.log, s) // 3
 */
export const switchMap: SwitchMapArity2 = curry2(function switchMap<A, B = A>(
  f: (a: A) => Stream<B>,
  s: Stream<A>
): Stream<B> {
  return switchLatest(map(f, s))
})

export interface SwitchMapArity2 {
  <A, B = A>(f: (a: A) => Stream<B>, s: Stream<A>): Stream<B>

  <A, B = A>(f: (a: A) => Stream<B>): SwitchMapArity1<A, B>
}

export interface SwitchMapArity1<A, B = A> {
  (s: Stream<A>): Stream<B>
}
