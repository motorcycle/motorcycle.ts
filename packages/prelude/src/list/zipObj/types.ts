export interface ZipObjArity2 {
  <A>(strings: Array<string>, list: Array<A>): { readonly [ key: string ]: A }
  <A>(strings: Array<string>, list: ArrayLike<A>): { readonly [ key: string ]: A }
  <A>(strings: Array<string>, list: ReadonlyArray<A>): { readonly [ key: string ]: A }

  <A>(strings: ArrayLike<string>, list: Array<A>): { readonly [ key: string ]: A }
  <A>(strings: ArrayLike<string>, list: ArrayLike<A>): { readonly [ key: string ]: A }
  <A>(strings: ArrayLike<string>, list: ReadonlyArray<A>): { readonly [ key: string ]: A }

  <A>(strings: ReadonlyArray<string>, list: Array<A>): { readonly [ key: string ]: A }
  <A>(strings: ReadonlyArray<string>, list: ArrayLike<A>): { readonly [ key: string ]: A }
  <A>(strings: ReadonlyArray<string>, list: ReadonlyArray<A>): { readonly [ key: string ]: A }

  (strings: Array<string>): ZipObjArity1
  (strings: ArrayLike<string>): ZipObjArity1
  (strings: ReadonlyArray<string>): ZipObjArity1
}

export interface ZipObjArity1 {
  <A>(list: Array<A>): { readonly [ key: string ]: A }
  <A>(list: ArrayLike<A>): { readonly [ key: string ]: A }
  <A>(list: ReadonlyArray<A>): { readonly [ key: string ]: A }
}
