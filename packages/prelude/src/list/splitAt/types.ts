export interface SplitAtArity2 {
  (index: number, str: string): [ string, string ]
  <A>(index: number, list: Array<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(index: number, list: ArrayLike<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(index: number, list: ReadonlyArray<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]

  (index: number): SplitAtArity1
}

export interface SplitAtArity1 {
  (str: string): [ string, string ]
  <A>(list: Array<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(list: ArrayLike<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
  <A>(list: ReadonlyArray<A>): [ ReadonlyArray<A>, ReadonlyArray<A> ]
}
