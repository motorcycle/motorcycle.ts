export type Index = NonnegativeInteger & -1

export type NonnegativeInteger = number

export type Integer = number

export type Matrix2D<T> = Dimension<Dimension<T>>

export type Dimension<T> = ReadonlyArray<T>
