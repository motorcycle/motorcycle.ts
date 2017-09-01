export interface Friend {
  readonly id: number
  readonly name: string
  readonly username: string
}

export type Friends = ReadonlyArray<Friend>
