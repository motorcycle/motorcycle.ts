import { Curry2, curry2 } from '../../function'

export const or: Curry2<boolean, boolean, boolean> = curry2((a: boolean, b: boolean) => a || b)
