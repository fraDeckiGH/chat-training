
// * helper module for the <Component>
// import this module only if the app is running in the browser

import { browser } from '$app/env';
// import { htmlElems } from "$lib/misc"
import ToastHandler from "./toast-handler.svelte"

export {
  // create,
  singleton,
}


function create() {
  if (!browser) {
    console.log(`return: !browser`, )
    return
  }
  // if (!document) {
  //   console.log(`return: !document`, document)
  //   return
  // }
  
  const target = document.body
  // BUG redirect removes this cmp
  // const target = htmlElems.appScrollable
  // const target = htmlElems.appScroller
  
  if (!target) {
    console.log(`return: !target`, !target)
    return
  }
  
  const instance = new ToastHandler({
    target,
  })
  return instance
}

const singleton = create()








