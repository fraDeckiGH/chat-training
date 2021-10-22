
// * chain extensions
/*
function names that end in _ are chain enders
meaning the chain won't be able to continue after them
*/

import Gun from "gun"

export {
  Gun
}

/**
 * node.key += addendum
 * if key doesn't exists creates it
 */
// @ts-ignore
Gun.chain.count = function(key: string, addendum: number) {
  const ref = this.get(key)
  ref
    .once((data/* , key */) => {
      // console.log(`data`, data)
      // console.log(`key`, key)
      
      ref.put(<any>(data || 0) + addendum)
    })
  
  return this
}

/**
 * returns a node's entry, ie {key: value}
 * usage: data = await gun.get(...).entry_()
 */
// @ts-ignore
Gun.chain.entry_ = function(): Promise<unknown> {
  return new Promise((resolve/* , reject */) => {
    this
      .once((data, key) => {
        // console.log(`data`, data)
        // console.log(`key`, key)
        resolve({
          [key]: data
        })
      })
  })
}

/**
 * returns a node's key
 * usage: data = await gun.get(...).key_()
 */
// @ts-ignore
Gun.chain.key_ = function(): Promise<unknown> {
  return new Promise((resolve/* , reject */) => {
    this
      .once((data, key) => {
        // console.log(`data`, data)
        // console.log(`key`, key)
        resolve(key)
      })
  })
}

/**
 * returns a node's value
 * usage: data = await gun.get(...).value_()
 */
// @ts-ignore
Gun.chain.value_ = function(): Promise<unknown> {
  return new Promise((resolve/* , reject */) => {
    this
      .once((data/* , key */) => {
        // console.log(`data`, data)
        // console.log(`key`, key)
        resolve(data)
      })
  })
}

/**
 * returns a shallow copy of node's value
 * usage: data = await gun.get(...).valueCopy_()
 */
// @ts-ignore
Gun.chain.valueCopy_ = function(): Promise<unknown> {
  return new Promise((resolve/* , reject */) => {
    this
      .once((data/* , key */) => {
        // console.log(`data`, data)
        // console.log(`key`, key)
        resolve(
          // shallow copy
          data ? {...data} : data
        )
      })
  })
}
























