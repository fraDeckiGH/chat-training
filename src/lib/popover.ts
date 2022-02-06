
/*
https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
see bookmarks
*/

import tippy from 'tippy.js';
// TODO try w/out styles
import 'tippy.js/dist/tippy.css'; // optional for styling

export {
  popover,
  tipz,
}

// TODO remove 'any' type where present

function popover(elem: HTMLElement, {
  cmp, 
  cmpProps, 
  cmpOpts,
  tippyOpts = {},
}: {
  cmp: any
  cmpProps?: any
  cmpOpts?: any
  tippyOpts?: any
}) {
  // console.log(`elem`, elem)
  
  // defaults (tippy instance's options)
  // opts = { delay: 100, distance: '-20px', ...opts }
  
  
  if (typeof cmp === 'function') {
    // supposing content is a Component
    tippyOpts.onCreate = (instance: any) => {
      cmp = new cmp({ 
        props: cmpProps,
        target: instance.popper.querySelector('.tippy-content'),
        ...cmpOpts // untested (usage)
      })
    }
  }

  // tippy instance
  const tp = tippy(elem, tippyOpts)
  
  
  return {
    update(params: any) {
      // ensure reactivity
      cmp.$set(params.props)
    },
    
    destroy() {
      tp.destroy()
      // cleanup component
      cmp.$destroy()
    },
  }
  
}


/**
 * closer to the original
 */
function tipz(elem: HTMLElement, {
  content, 
  props, 
  ...opts
}: any) {
  // console.log(`elem`, elem)
  
  // let tp: any // tippy instance
  let cmp: any // component instance

  // defaults (tippy instance's options)
  // opts = { delay: 100, distance: '-20px', ...opts }
  console.log(`opts`, opts)
  
  
  if (typeof content === 'function') {
    // supposing content is a Component
    opts.onCreate = (instance: any) => {
      cmp = new content({ 
        target: instance.popper.querySelector('.tippy-content'),
        props,
      })
    }
  } else {
    opts.content = content
  }

  // tippy instance
  const tp = tippy(elem, opts)
  
  
  return {
    update(params: any) {
      // ensure reactivity
      if (cmp) {
        cmp.$set(params.props)
      }
    },
    
    destroy() {
      tp.destroy();
      if (cmp) {
        // debugger;
        // cleanup component
        cmp.$destroy()
      }
    },
  }
  
}








