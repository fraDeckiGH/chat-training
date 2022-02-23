
// * a tooltip w/ a chosen component inside of it, as it's content
// client side module

/*
  ? code originally from (also see bookmarks)
  https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
  REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
*/

import './_core.scss'
import type { 
  Args, 
  Controller, 
  Controllers, 
} from "./type"
import { stackingContext } from "$lib/misc"
import { createWritable$ } from "$lib/store"
import type { Maybe } from '$lib/type'
import maxSize from 'popper-max-size-modifier'
import { writable } from 'svelte/store'

import tippy from 'tippy.js'
import type { 
  // Content as TooltipContent,
  Instance as TooltipInstance, 
  // Props as TooltipProps,
  // {target}
  // MultipleTargets as TooltipTargets,
  // SingleTarget as TooltipTarget,
  
} from 'tippy.js'
import 'tippy.js/dist/tippy.css'


export {
  controllers as popoverCtrls,
  dispatchEvent as popoverEvents,
  popover,
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
    // console.log(`state`, state)
    
    // The `maxSize` modifier provides this data
    const {width, height} = state.modifiersData.maxSize;
    
    state.styles.popper = {
      ...state.styles.popper,
      
      maxHeight: `${height}px`,
      maxWidth: `${width}px`,
      
      // Minimum acceptable size is 280px 
      // BUG overflow-x in some viewports
      // maxHeight: `${Math.max(280, height)}px`,
      // maxWidth: `${Math.max(280, width)}px`,
    };
  }
}

const controllers: Controllers = {}

/**
 * dispatched events
 */
const dispatchEvent = writable(0)



/**
 * usage: svelte's use:action
 */
function popover<T>(htmlEl: HTMLElement, args: Args<T>) {
  const {
    cmp: CmpType, 
    cmpProps = {}, 
    cmpOpts,
    ctrlId,
    tooltipOpts = {},
  } = args
  
  
  // * controller
  
  const createController = () => {
    // ? all true? execute
    if (!(ctrlId && cmp && tooltip)) {
      // console.log(`return: !(ctrlId && cmpInstance && tooltip)`, )
      // console.log(!!ctrlId, !!cmp, !!tooltip)
      return
    }
    // console.log(`createController executing`, )
    
    // ! memory leak (according to tippy)
    /*
      toggle popover's ref/target elem (usually it's the triggerEl)
      I'll start seeing errors when interacting w/ the tippy or 
      it's content
    */
    //#region 
    /*
      val ?? true
      check is passed if 'val' === (null || undefined)
      doesn't pass if it is 1 of the other falsies
      
      val ?? false
      'val' === (null || undefined) ? else : then
    */
    //#endregion
    // if (controllers[ctrlId] ?? false) {
    //   // controller exists
      
    //   cmp.$set({ 
    //     popoverCtrl: controllers[ctrlId],
    //   })
      
    // } else {
    const ctrl = createWritable$<Controller>({
      initialVal: {
        cmp,
        tooltip,
      },
      stopCb() {
        /*
          removing the ref from containingObj should be enough 
          for the garbage collector to do its job,
          but I must be sure the entry's instance isn't referenced(used)
          anywhere when I do this.
          
          nullifying the entry itself creates overhead 
          (for me in the code/types)
        */
        ctrlId && delete controllers[ctrlId]
      },
    })
    
    cmp.$set({ 
      popoverCtrl: ctrl,
    })
    
    controllers[ctrlId] = ctrl
    dispatchEvent.update(val => val + 1)
    // }
    
    // console.log(`controllers[ctrlId]`, controllers[ctrlId])
  }
  
  
  // * content
  
  let cmp: Maybe<InstanceType<typeof CmpType>>
  
  const createCmp = (instance: TooltipInstance) => {
    // console.log(`onShow instance`, instance)
    if (cmp) {
      // console.log(`return: cmp instanced already`, )
      return
    }
    instance.popper.className += "popover tippy-root"
    
    cmp = new CmpType({ 
      target: instance.popper.querySelector('.tippy-content'),
      
      ...cmpOpts,
      
      // ? {pinned down} so that cmpProps overwrites cmpOpts.props
      props: {
        // defaults here (valid for every component)
        ...cmpProps,
      },
    })
    
    createController()
  }
  
  
  // * tooltip
  
  const tooltip = tippy(htmlEl, {
    
    // appendTo: htmlEl,
    arrow: false,
    interactive: true,
    maxWidth: 'none',
    
    // onAfterUpdate(instance, partialProps) {
    //   console.log(`onAfterUpdate`, instance, partialProps)
    // },
    // onBeforeUpdate(instance, partialProps) {
    //   console.log(`onBeforeUpdate`, instance, partialProps)
    // },
    // onClickOutside(instance, event) {
    //   console.log(`onClickOutside`, instance, event)
    // },
    // onCreate(instance) {
    //   console.log(`onCreate instance`, instance)
    // },
    onDestroy(instance) {
      // console.log(`onDestroy instance`, instance)
      cmp?.$destroy()
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
    onShow: createCmp,
    
    // onShown(instance) {
    //   console.log(`onShown instance`, instance)
    // },
    // onTrigger(instance, event) {
    //   console.log(`onTrigger`, instance, event)
    // },
    // onUntrigger(instance, event) {
    //   console.log(`onUntrigger`, instance, event)
    // },
    
    placement: "bottom",
    
    popperOptions: {
      modifiers: [
        
        <any>applyMaxSize, // BUG
        // maxSize,
        {
          ...maxSize,
          options: {
            // ? https://popper.js.org/docs/v2/utils/detect-overflow/#boundary
            // 'clippingParents' by default
            // boundary: customBoundaryHTMLEl,
            // boundary: htmlElems.appScroller,
            
            // padding: 20,
            padding: {
              top: 25,
              left: 20,
              right: 20,
              bottom: 25,
            },
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
    
    /* 
      ? did a number of tests
      reminders 
      
      focus events give keyboard focus a "mouse hover"-like behavior
      they make it so the popover shows right away when focusing the ref
      w/ the keyboard, whereas w/out 'enter' key must be pressed
      
      mouse events behave better than pointer's (at least w/ tippy.js)
      
      https://atomiks.github.io/tippyjs/v6/all-props/#hideonclick
      
      https://atomiks.github.io/tippyjs/v6/all-props/#touch
      https://atomiks.github.io/tippyjs/v6/misc/#touch-devices
    */
    // default
    // hideOnClick: true,
    // never hide upon clicking
    // hideOnClick: false,
    // hide only upon clicking the reference, but not outside
    // hideOnClick: 'toggle',
    
    trigger: "click",
    // trigger: 'click mouseenter', // no keyboard "mouse hover"-like behavior
    // trigger: 'click focus mouseenter',
    // trigger: 'click focus pointerenter',
    // trigger: 'click focus focusin mouseenter',
    // trigger: 'click focusin mouseenter', // * best (not perfect)
    // trigger: 'focus mouseenter', // * default
    // trigger: 'focus pointerenter',
    // trigger: 'mousedown', // no keyboard (at all)
    // trigger: 'pointerdown', // no keyboard (at all)
    
    zIndex: stackingContext.popover,
    
    ...tooltipOpts
  })
  createController()
  
  
  // * use:action return
  
  const useActionReturn: SvelteActionReturnType = {
    destroy: () => {
      console.log(`use:action.destroy()`, )
      
      /*
        in case the reference htmlEl is removed from the DOM
        ? needed
        ? wanted
      */
      tooltip.destroy()
      
      
      // ? not sure whether I should do the following part
      // (it ought be reliant on the number of subscribers)
      /* 
        and even so, where? svelte also has start & stop callbacks
        maybe I should do this there?
        
        --
        docs: store's start & stop callbacks
        
        "If a function is passed as the second argument..."
        https://svelte.dev/docs#run-time-svelte-store
        
        a simple example
        https://svelte.dev/tutorial/readable-stores
      */
      
      if (ctrlId) {
        // controllers.update(val => {
        //   delete val[ctrlId]
        //   return val
        // })
        
        // ? needed? maybe if I remove the reference to this obj 
        // I can rely on the garbage collector to actually remove it
        
        // nullify the entry itself
        // controllers[ctrlId] = null
      }
      
    },
  }
  
  return useActionReturn
}






