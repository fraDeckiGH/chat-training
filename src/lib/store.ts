
// * extended svelte stores
/**  
  ? https://svelte.dev/tutorial/custom-stores
  
  see also
  @type SvelteStore
*/

import { writable } from "svelte/store"
import type { StartStopNotifier } from "svelte/store"
import type { Writable } from 'svelte/store'
import type { 
  /* Subscriber,  */
  Updater, 
  Unsubscriber, 
} from 'svelte/store'
import type { Func } from "$lib/type/util"


export {
  // changes,
  writable$,
}
export type {
  ExtWritable$,
  Writable$,
  
}


/**
  stop callback
*/
type StopCb = () => void


// ? BUG during usage. somewhere T is lost (and 'unknown' is returned in its place)
// type Writable$<T> = ReturnType<typeof writable$<T>>

type Writable$<T> = 
  & Writable<T> 
  // & Omit<Writable<T>, "set"> 
  & {
    /**
     * alert/notify subscribers of potential changes
     * (doesn't make any changes itself)
     * think of this like hitting a refresh btn, but for stores
    */
    sync: Func
  }
  // ? additional entries not there by default but added by users(utilizers)
  /* more productive but w/ caveats
    non-existing methods don't throw error
    added methods are not intellisensed
  */
  & Record<
    string,
    
    Func<Unsubscriber | void>
    // | Writable<T>["set"]
    // | Writable<T>["update"]
  >
;

// TODO deduce added methods from sets & updaters, instead
/**
  wanted added methods to be intellisensed
  "ext" stays for extended/extensible
*/
type ExtWritable$<
  T, 
  /**
    an obj of added methods
  */
  AddedMethods
> = 
  & Writable$<T>
  & AddedMethods
;

/* usage example 
? coercion needed due to writable$()'s ReturnType

const counter = <
  ExtWritable$<number, {
    addedMethod: Func
  }>
> writable$(0, {
    updaters: {
      addedMethod: ...,
    },
  })
;
*/


type Writable$Args<T> = {
  // ? svelte ~default
  // startCb?: (set?: ((value: T) => void)) => StopCb
  // ? I want to pass StopCb separately
  startCb?: (set?: ((value: T) => void)) => void
  
  stopCb?: StopCb
  
  /**
   * set methods
   * same rules of "update methods" apply
  */
  sets?: Record<string, T>
  
  /**
   * update methods
   * as extra/additional or to override existing ones
  */
  updaters?: Record<string, Updater<T>>
}



/**
 * statement: Svelte has 'initial value' as optional
 * ? https://svelte.dev/docs#run-time-svelte-store-writable
*/
function writable$<T>(
    /**
      initial value
    */
    initVal?: T, 
    args: Writable$Args<T> = {}
  )
  // ? forcing return type might lose some intellisense
  // : 
  
  // more readable but doesnt get along w/ ExtWritable$ (coercion req.)
  // | Writable$<T>
   
  // TODO added methods should be deduced from sets, updaters
  // | ExtendedWritable$<T, any> // ? "any" loses some intellisense
{
  
  const {
    startCb,
    stopCb,
    sets = {},
    updaters = {},
  } = args
  
  
  // * startStopNotifier
  
  let startStopNotifier: StartStopNotifier<T> | undefined
  
  if (startCb) {
    startStopNotifier = () => {
      // TODO startCb: test: await, (long) loop
      // TODO set: test
      startCb(set)
      
      // "It must return a stop function"
      if (stopCb) {
        return stopCb
      } else {
        return () => {
          // console.log('no more subscribers')
        }
      }
    }
  } else if (stopCb) {
    startStopNotifier = () => {
      // console.log('got a subscriber')
      
      // "It must return a stop function"
      return stopCb
    }
  }
  
  
  // * store
  
  const { set, subscribe, update } = writable/* <T> */(
    initVal,
    startStopNotifier
  )
  
  
  const setMethods: Record<string, Writable<T>["set"]> = {}
  
  Object.entries(sets).forEach(([key, val]) => {
    setMethods[key] = () => set(val)
  })
  
  // const updateMethods: Record<string, any> = {} // ? works
  const updateMethods: Record<string, Writable<T>["update"]> = {}
  
  Object.entries(updaters).forEach(([key, val]) => {
    updateMethods[key] = () => update(val)
  })
  
  
  const retStore = {
    set,
    subscribe,
    update,
    
    // prev version: fails on primitives, not on objects
    // sync: () => update(val => val),
    
    /*
      tests were made, should work w/ everything
    */
    sync: () => (
      update(val => {
        // ? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#description
        if (
          typeof val === "object" 
          // make this method work w/ null (see else)
          && val !== null
        ) {
          return val
        } else {
          // in here, among other things 'val' might be
          // primitive
          // null
          // function
          return <T><unknown>!val
        }
      })
    ),
    
    // decrement: () => update(n => n - 1),
    // reset: () => set(0),
    
    ...setMethods,
    ...updateMethods,
  }
  
  return retStore
}






