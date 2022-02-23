
// * extended svelte stores
/*
  ? https://svelte.dev/tutorial/custom-stores
*/

import { writable } from "svelte/store"
import type { StartStopNotifier } from "svelte/store"
import type { Writable } from 'svelte/store'
import type { 
  Subscriber, Updater, Unsubscriber, 
} from 'svelte/store'

export {
  createWritable$,
  
}
export type {
  Writable$,
  
}


/**
 * stop callback
 */
type StopCb = () => void

/**
 * the minimal/simplest version of a custom store
 */
// ? BUG during usage. somewhere T is lost (and 'unknown' is returned in its place)
// type Writable$<T> = ReturnType<typeof createWritable$<T>>

// all good
type Writable$<T> = SvelteStore<T> & {
  update: (this: void, updater: Updater<T>) => void
  /**
   * alert/notify subscribers of potential changes
   * (doesn't make any changes itself)
   * think of this like hitting a refresh btn, but for stores
   */
  sync: () => void
}



/**
 * statement: Svelte has initialVal as optional
 * ? https://svelte.dev/docs#run-time-svelte-store-writable
 */
function createWritable$<T>({
  initialVal,
  startCb,
  stopCb,
}: {
  initialVal/* ? */: T, 
  
  // ? svelte ~default
  // startCb?: (set?: ((value: T) => void)) => StopCb
  // ? I want to pass StopCb separately
  startCb?: (set?: ((value: T) => void)) => void
  
  stopCb?: StopCb
}): Writable$<T> {
  
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
          console.log('no more subscribers')
        }
      }
    }
  } else if (stopCb) {
    startStopNotifier = () => {
      console.log('got a subscriber')
      
      // "It must return a stop function"
      return stopCb
    }
  }
  
  
  // * store
  
  const { set, subscribe, update } = writable/* <T> */(
    initialVal,
    startStopNotifier
  )

  const store = {
    subscribe,
    update,
    
    sync: () => update(val => val),
    
    // decrement: () => update(n => n - 1),
    // reset: () => set(0)
  }
  
  return store
}






