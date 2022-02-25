
// * generic utility types
/*
  ? inspiration
  https://www.typescriptlang.org/docs/handbook/2/objects.html#generic-object-types
*/

export type {
  Func,
  Maybe,
  ObjLiteralKey,
  UnionToIntersection,
}


// ? are these equal? if so, which is more correct?
type Func<T = void> = () => T
// type Func<T = void> = (val: T) => T


type Maybe<T> = T | null | undefined

/**
 * all object literal possible keys
 */
type ObjLiteralKey = number | string | symbol

// type OneOrMany<T> = T | T[]

type UnionToIntersection<T> = 
  (T extends any ? (x: T) => any : never) extends 
  (x: infer R) => any ? R : never









