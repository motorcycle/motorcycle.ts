export function random(n: number): number {
  return Math.random() * n
}

export type Random = (n: number) => number
