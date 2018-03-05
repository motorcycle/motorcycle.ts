import { Stream } from '@most/types'

/**
 * `Requests` is an object of named requests, where a request is a Stream of any type.
 * 
 * @name Requests
 * @example
 * export type Requests = Readonly<Record<string, Stream<any>>>
 * @type true
 */
export type Requests = Readonly<Record<string, Stream<any>>>
