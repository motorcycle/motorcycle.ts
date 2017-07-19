/**
 * Motorcycle Sink type. Used to propagate events.
 * @name Sink<A>
 * @example
 * export interface Sink<A> {
 *   event(time: Time, value: A): void;
 *   end(time: Time): void;
 *   error(time: Time, err: Error): void;
 * }
 * @type
 */
export { Sink } from '@most/types'
