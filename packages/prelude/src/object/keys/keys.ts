export const keys = <A extends object>(obj: A): ReadonlyArray<keyof A> =>
  Object.keys(obj) as any as ReadonlyArray<keyof A>
