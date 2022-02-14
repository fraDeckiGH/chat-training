
// * helper module for the <Component>
// import this module only if the app is running in the browser

import { htmlElems } from "$lib/misc"
import ToastHandler from "./toast-handler.svelte"

export {
  // create,
  singleton,
}

function create() {
  if (!document) {
    console.log(`return: !document`, document)
    return
  }
  
  const target = htmlElems.appScrollable
  
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








