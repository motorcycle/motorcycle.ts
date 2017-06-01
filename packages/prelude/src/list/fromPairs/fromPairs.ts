export function fromPairs<K extends number, V>(list: Array<[K, V]>): { readonly [ key: number ]: V }
export function fromPairs<K extends string, V>(list: Array<[K, V]>): { readonly [ key: string ]: V }
export function fromPairs<K extends number, V>(list: ArrayLike<[K, V]>): { readonly [ key: number ]: V }
export function fromPairs<K extends string, V>(list: ArrayLike<[K, V]>): { readonly [ key: string ]: V }
export function fromPairs<K extends number, V>(list: ReadonlyArray<[K, V]>): { readonly [ key: number ]: V }
export function fromPairs<K extends string, V>(list: ReadonlyArray<[K, V]>): { readonly [ key: string ]: V }

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 */
export function fromPairs<K extends string, V>(list: Array<[K, V]>): { readonly [ key: string ]: V } {
  const length = list.length
  const obj: any = {}

  for (let i = 0; i < length; ++i)
  {
    const [ key, value ] = list[i]

    obj[key] = value
  }

  return obj
}
