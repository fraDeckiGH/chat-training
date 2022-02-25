
// * extended svelte stores
/**  
  ? https://svelte.dev/tutorial/custom-stores
  
  see also
  @type SvelteStore
*/

import { writable } from "svelte/store"
import type { StartStopNotifier } from "svelte/store"
import type { Readable, Writable } from 'svelte/store'
import type { 
  Subscriber, Updater, Unsubscriber, 
} from 'svelte/store'
import type { Func } from "./type"


export {
  changes,
  writable$,
}
export type {
  Writable$,
  
}


/**
 * stop callback
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
  & Record<
    string,
    
    Func<Unsubscriber | void>
    // | Writable<T>["set"]
    // | Writable<T>["update"]
  >
;

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
  // sets?: TBA
  
  /**
   * update methods
   * as extra/additional or to override existing ones
   */
  updaters?: Record<string, Updater<T>>
}



/**
  help syncing changes
  
  --
  usage
  
  emit sender (eg. $lib/popover/core)
    changes.sync()
  
  receiver (eg. $lib/popover/popover-demo)
    $changes 
 */
const changes = writable$(0, {
  updaters: {
    sync: val => val + 1,
  },
})



/**
 * statement: Svelte has 'initial value' as optional
 * ? https://svelte.dev/docs#run-time-svelte-store-writable
 */
function writable$<T>(
  /**
   * initial value
   */
  initVal/* ? */: T, 
  args: Writable$Args<T> = {}
): Writable$<T> {
  
  const {
    startCb,
    stopCb,
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
  
  
  // const updateMethods: Record<string, Writable<T>["update"]> = {}
  const updateMethods: Record<string, any> = {}
  
  Object.entries(updaters).forEach(([key, val]) => {
    updateMethods[key] = () => update(val)
  })
  
  
  const retStore = {
    set,
    subscribe,
    update,
    
    sync: () => update(val => val),
    
    // decrement: () => update(n => n - 1),
    // reset: () => set(0),
    
    // ...setMethods,
    ...updateMethods,
  }
  
  return retStore
}






