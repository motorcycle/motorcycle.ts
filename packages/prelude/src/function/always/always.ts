export function always<A>(a: A) {
  return function (b?: any): A {
    return Function.prototype(b), a
  }
}
