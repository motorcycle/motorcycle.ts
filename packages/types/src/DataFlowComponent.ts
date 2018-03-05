import { Requests, Responses } from '.'

/**
 * A `DataFlowComponent` is a function that accepts an input specification object 
 * that extends `Responses` and returns an output object that extends `Requests`.
 * 
 * @name DataFlowComponent
 * @example
 * export interface DataFlowComponent<TInputs extends Responses, TOutputs extends Requests> {
 *   (xs: TInputs): TOutputs
 * }
 * @type
 */
export interface DataFlowComponent<TInputs extends Responses, TOutputs extends Requests> {
  (xs: TInputs): TOutputs
}
