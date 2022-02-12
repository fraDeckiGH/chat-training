
// * generic utility types

export type {
  Maybe,
  UnionToIntersection,
}


type Maybe<T> = T | null | undefined


type UnionToIntersection<T> = 
  (T extends any ? (x: T) => any : never) extends 
  (x: infer R) => any ? R : never









