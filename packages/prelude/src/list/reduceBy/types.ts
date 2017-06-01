export interface ReduceByArity4 {
  <A, B>(f: (acc: B, value: A) => B, seed: B, by: (a: A) => string, list: Array<A>): { readonly [key: string]: B }
  <A, B>(f: (acc: B, value: A) => B, seed: B, by: (a: A) => string, list: ArrayLike<A>): { readonly [key: string]: B }
  <A, B>(f: (acc: B, value: A) => B, seed: B, by: (a: A) => string, list: ReadonlyArray<A>): { readonly [key: string]: B }

  <A, B>(f: (acc: B, value: A) => B): ReduceByArity3<A, B>
  <A, B>(f: (acc: B, value: A) => B, seed: B): ReduceByArity2<A, B>
  <A, B>(f: (acc: B, value: A) => B, seed: B, by: (a: A) => string): ReduceByArity1<A, B>
}

export interface ReduceByArity3<A, B> {
  (seed: B, by: (a: A) => string, list: Array<A>): { readonly [key: string]: B }
  (seed: B, by: (a: A) => string, list: ArrayLike<A>): { readonly [key: string]: B }
  (seed: B, by: (a: A) => string, list: ReadonlyArray<A>): { readonly [key: string]: B }

  (seed: B, by: (a: A) => string): ReduceByArity1<A, B>
  (seed: B): ReduceByArity2<A, B>
}

export interface ReduceByArity2<A, B> {
  (by: (a: A) => string, list: Array<A>): { readonly [key: string]: B }
  (by: (a: A) => string, list: ArrayLike<A>): { readonly [key: string]: B }
  (by: (a: A) => string, list: ReadonlyArray<A>): { readonly [key: string]: B }

  (by: (a: A) => string): ReduceByArity1<A, B>
}

export interface ReduceByArity1<A, B> {
  (list: Array<A>): { readonly [key: string]: B }
  (list: ArrayLike<A>): { readonly [key: string]: B }
  (list: ReadonlyArray<A>): { readonly [key: string]: B }
}
