export const uniq = <A>(list: Array<A>): ReadonlyArray<A> => Array.from(new Set<A>(list))
