export function copy<A>(list: Array<A>): ReadonlyArray<A>
export function copy<A>(list: ArrayLike<A>): ReadonlyArray<A>
export function copy<A>(list: ReadonlyArray<A>): ReadonlyArray<A>

export function copy<A>(list: Array<A>): ReadonlyArray<A> {
  const length = list.length
  const newList = Array(length)

  for (let i = 0; i < length; ++i)
    newList[i] = list[i]

  return newList
}
