import { ComparisonNumbers } from '../types'

export interface DescendArity3 {
  <A, B>(fn: (a: A) => B, a: A, b: A): ComparisonNumbers
  <A, B>(fn: (a: A) => B, a: A): DescendArity1<A>
  <A, B>(fn: (a: A) => B): DescendArity2<A>
}

export interface DescendArity2<A> {
  (a: A, b: A): ComparisonNumbers
  (a: A): DescendArity1<A>
}

export type DescendArity1<A> = (b: A) => ComparisonNumbers
