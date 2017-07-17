/**
 * Create a stream containing a promise's value.
 * 
 * @name fromPromise<A>(promise: Promise<A>): Stream<A>
 * @example 
 * import { fromPromise, observe } from '@motorcycle/stream'
 * 
 * const a = fromPromise(Promise.resolve(1))
 * const b = fromPromise(Promise.reject(new Error('failure')))
 * 
 * observe(console.log, a)
 *  .then(() => console.log('done'))
 *  .catch(err => console.error(err.message))
 * // 1
 * // done
 * 
 * observe(console.log, b)
 *  .then(() => console.log('done'))
 *  .catch(err => console.error(err.message))
 * // 'failure'
 */
export { fromPromise } from '@most/core'
