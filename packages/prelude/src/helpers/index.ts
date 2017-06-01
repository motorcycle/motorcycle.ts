export function type(value: any): string {
  if (value === null)
    return `Null`

  if (value === void 0)
    return `Undefined`

  return Object.prototype.toString.call(value).slice(8, -1)
}

export function functionName(f: Function) {
  if (f.name) return f.name

  const m = String(f).match(/^function\s*([\w$]+)/)

  if (m) return m[1]
}
