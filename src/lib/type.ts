
// * generic utility types
/*
  ? inspiration
  https://www.typescriptlang.org/docs/handbook/2/objects.html#generic-object-types
*/

export type {
  Func,
  Maybe,
  UnionToIntersection,
}


type Func<T = void> = () => T

type Maybe<T> = T | null | undefined

// type OneOrMany<T> = T | T[]

type UnionToIntersection<T> = 
  (T extends any ? (x: T) => any : never) extends 
  (x: infer R) => any ? R : never









