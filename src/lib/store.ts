
// * extended svelte stores

import { writable } from 'svelte/store'
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



function createWritable$<T>(initialVal: T): Writable$<T> {
  // ? https://svelte.dev/tutorial/custom-stores
  // const { set, subscribe, update } = writable<Controllers>({})
  const { set, subscribe, update } = writable/* <T> */(initialVal)

  const store = {
    subscribe,
    update,
    
    sync: () => update(val => val),
    
    // decrement: () => update(n => n - 1),
    // reset: () => set(0)
  }
  
  return store
}






