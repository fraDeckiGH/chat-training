
// * helper module for the <Component>
// client-side module
// ? take inspiration from auth.ts, if this module needs to become more complex

import { htmlElems } from "$lib/misc"
// import { default as Component } from "$lib/modal/modal.svelte"
import Component from "./modal.svelte"


export {
  // create,
  create as createModal,
}
// export type {
//   // ? meant to be used in <component>.svelte file only
//   Component as default,
// }


function create() {
  if (!document) {
    console.log(`return: !document`, document)
    return
  }
  
  const target = htmlElems.appScroller
  if (!target) {
    console.log(`return: !target`, target)
    return
  }
  
  const component = new Component({
    intro: true,
    props: {
      component: <Component><unknown>null,
      
    },
    // target: document.body,
    target,
  })
  
  component.$set({
    component,
  })
  
  // console.log(`component`, component)
  
  
  //  works!
  // setTimeout(() => {
  //   component.$destroy()
  // }, 2000);
  
  // return component
}







