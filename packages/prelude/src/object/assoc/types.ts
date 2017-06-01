export interface AssocArity3 {
  <A extends object, B>(path: string, value: B, obj: A): Readonly<A> & { readonly [S in typeof path]: B }
  <A extends object, B>(path: string, value: B): AssocArity1<A, typeof path, B>
  <A extends object>(path: string): AssocArity2<A, typeof path>
}

export interface AssocArity2<A extends object, P extends string> {
  <B>(value: B, obj: A): Readonly<A> & { readonly [S in P]: B }
  <B>(value: B): AssocArity1<A, P, B>
}

export type AssocArity1<A extends object, P extends string, B> = (obj: A) => Readonly<A> & { readonly [S in P]: B }
