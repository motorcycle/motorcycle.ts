import { Requests, Responses } from '.'

/**
 * Dialogue is a function type that accepts an object of Requests and returns 
 * an object of Responses.
 * 
 * @name Dialogue
 * @example
 * export interface Dialogue<TRequests extends Requests, TResponses extends Responses> {
 *   (rs: TRequests): TResponses
 * }
 * @type true
 */
export interface Dialogue<TRequests extends Requests, TResponses extends Responses> {
  (rs: TRequests): TResponses
}
