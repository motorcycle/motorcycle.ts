import { Stream } from '@motorcycle/types'
import { runEffects } from './runEffects'
import { scheduler } from '../scheduler'

/**
 * Activates a stream using an default scheduler instance from `@most/scheduler`,
 * returning a promise of completion.
 *
 * @name drain<A>(stream: Stream<A>): Promise<void>
 * @example
 * import { drain } from '@motorcycle/stream'
 *
 * drain(stream)
 *  .then(() => console.log('complete'))
 */
export const drain = <A>(stream: Stream<A>): Promise<void> => runEffects(stream, scheduler)
