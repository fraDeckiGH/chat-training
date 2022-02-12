
// * 
// client side module

/*
? code mainly from (also see bookmarks)
https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
*/

import tippy from 'tippy.js';
import type { 
  Instance as TippyInstance, 
  Props as TippyProps
} from 'tippy.js';

// TODO try w/out styles
import 'tippy.js/dist/tippy.css'; // optional for styling
// import './_popover.scss'
import './_popover.scss'

import maxSize from 'popper-max-size-modifier';

import type Menu from "$lib/menu/menu.svelte"
import type { /* SvelteComponent,  */SvelteComponentTyped } from 'svelte'


export {
  popover,
  popoverCtrl,
  // tipz,
}
export type {
  PopoverContent,
  // ? if I need autocompletion
  PopoverArgs,
}

// TODO remove 'any' type where present


/**
 * ? possible content types for the popup
 */
type PopoverContent = Menu/*  | SomethingElse */

// type PopoverArgs<T> = {
type PopoverArgs = {
  // cmp: new (...args: any) => T & SvelteComponentTyped/* <{ record: T }> */
  cmp: new (...args: any) => PopoverContent
  cmpProps?: any
  cmpOpts?: any
  /**
   * ? an id (eg gen from nanoid() is safer than a simple string)
   */
  popoverCtrl_key?: Readonly<string>
  tippyOpts?: Partial<TippyProps>
}
// type PopoverCtrl_value<T> = {
type PopoverCtrl_value = {
  // cmp: T // component instance
  cmp: InstanceType<PopoverArgs["cmp"]>
  tippy: TippyInstance
  useActionReturn?: {
    update?: (parameters: any) => void
    destroy?: () => void
  }
}

 
// Create your own apply modifier that adds the styles to the state
/**
 * ? overflow handling (also see bookmarks)
 * {context} https://github.com/atomiks/tippyjs/issues/758
 * 
 * {pkg} https://www.npmjs.com/package/popper-max-size-modifier
 * {demo} https://codesandbox.io/s/great-tesla-3roz7
 * 
 */
const applyMaxSize = {
  name: 'applyMaxSize',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn({state}: any) {
    // The `maxSize` modifier provides this data
    const {width, height} = state.modifiersData.maxSize;
 
    state.styles.popper = {
      ...state.styles.popper,
      
      maxHeight: `${height}px`,
      maxWidth: `${width}px`,
      
      // Minimum acceptable size is 100px
      // maxHeight: `${Math.max(100, height)}px`,
      // maxWidth: `${Math.max(100, width)}px`,
    };
  }
}

/**
 * popover controller (global store)
 * each key controls a different popover
 */
const popoverCtrl: {
  // [key: string]: PopoverCtrl_value<PopoverContent>
  [key: string]: PopoverCtrl_value
} = {}


/**
 * usage https://svelte.dev/docs#template-syntax-element-directives-use-action
 */
// function popover<T>(htmlEl: HTMLElement, args: PopoverArgs<T>) {
function popover(htmlEl: HTMLElement, args: PopoverArgs) {
  console.log(`popover() `, )
  // console.log(`popover() htmlEl`, htmlEl)
  // console.log(`popover() popoverArgs`, popoverArgs)
  const {
    cmp, 
    cmpProps = {}, 
    cmpOpts,
    popoverCtrl_key,
    tippyOpts = {},
  } = args
  
  // defaults (tippy instance's options)
  // opts = { delay: 100, distance: '-20px', ...opts }
  
  
  let cmpInstance: InstanceType<typeof cmp>
  tippyOpts.onCreate = (instance: TippyInstance) => {
    // console.log(`onCreate`, instance)
    instance.popper.classList.add("tippy-root")
    
    cmpInstance = new cmp({ 
      props: {
        // defaults here
        ...cmpProps
      },
      target: instance.popper.querySelector('.tippy-content'),
      ...cmpOpts // untested (usage)
    })
  }
  
  
  // * tippy instance
  
  const tippyInstance = tippy(htmlEl, <TippyProps>{
    
    arrow: false,
    interactive: true,
    
    // onAfterUpdate(instance, partialProps) {
    //   console.log(`onAfterUpdate`, instance, partialProps)
    // },
    // onBeforeUpdate(instance, partialProps) {
    //   console.log(`onBeforeUpdate`, instance, partialProps)
    // },
    // onClickOutside(instance, event) {
    //   console.log(`onClickOutside`, instance, event)
    // },
    // onCreate
    onDestroy(instance) {
      console.log(`onDestroy instance`, instance)
    },
    // onHidden(instance) {
    //   console.log(`onHidden instance`, instance)
    // },
    // onHide(instance) {
    //   console.log(`onHide instance`, instance)
    // },
    // onMount(instance) {
    //   console.log(`onMount instance`, instance)
    // },
    // onShow(instance) {
    //   console.log(`onShow instance`, instance)
    // },
    // onShown(instance) {
    //   console.log(`onShown instance`, instance)
    // },
    // onTrigger(instance, event) {
    //   console.log(`onTrigger instance`, instance, event)
    // },
    // onUntrigger(instance, event) {
    //   console.log(`onUntrigger instance`, instance, event)
    // },
    
    placement: "bottom",
    
    popperOptions: {
      modifiers: [
        
        applyMaxSize,
        // maxSize,
        {
          ...maxSize,
          options: {
            // ? https://popper.js.org/docs/v2/utils/detect-overflow/#boundary
            // boundary: customBoundaryEl, // 'clippingParents' by default
            padding: 20,
          }
        },
        
        /* {
          name: 'preventOverflow',
          options: {
            // altAxis: true,
            tether: false,
          },
        }, */
        
      ],
    },
    
    // theme: "popover",
    // trigger: 'mouseenter focus', // default
    trigger: "click",
    
    ...tippyOpts
  })
  // console.log(`tippyInstance`, tippyInstance)
  
  
  const useActionReturn = {
    update(updatedArgs: typeof args) {
      console.log(`use:action.update()`, updatedArgs)
      
      // ensure reactivity
      // #region
      /* 
      triggers when arguments - passed by ref, 
      basically anything that's not primitive, 
      eg. obj literals - previously passed to the popover func 
      change from outside.
      Like in the very component which called the popover func 
      in the 1st place (for example)
      
      * also NOTE: func signature's defaults
      eg. args.cmpProps = {} 
      don't count in this scenario
      */
      // #endregion
      if (updatedArgs.cmpProps) { // no func signature's defaults
        cmpInstance.$set(updatedArgs.cmpProps)
      }
    },
    destroy() {
      console.log(`use:action.destroy()`, )
      
      /*
      in case htmlEl is removed from the DOM
      these instances need to be destroyed manually
      */
      cmpInstance.$destroy()
      tippyInstance.destroy()
    },
  }
  // const popoverController: PopoverCtrl_value<typeof cmpInstance> = {
  // const popoverController: PopoverCtrl_value<PopoverContent & T> = {
  const popoverController: PopoverCtrl_value = {
    // cmp: cmpInstance!,
    // cmp: <T & PopoverContent>cmpInstance!,
    cmp: cmpInstance!,
    tippy: tippyInstance,
    
    // ? useful?
    // useActionReturn,
  }
  
  
  if (popoverCtrl_key) {
    popoverCtrl[popoverCtrl_key] = popoverController
  }
  
  return useActionReturn
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








