
// * a tooltip w/ a chosen component inside of it, as it's content
// client side module

/*
? code mainly from (also see bookmarks)
https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
*/

import { /* htmlElems,  */stackingContext } from "$lib/misc"
import type { UnionToIntersection } from '$lib/type'
import './_popover.scss'
import maxSize from 'popper-max-size-modifier'
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

import tippy from 'tippy.js'
import type { 
  Content as TooltipContent,
  Instance as TooltipInstance, 
  Props as TooltipProps,
} from 'tippy.js'
import 'tippy.js/dist/tippy.css'

import type Menu from "$lib/menu/menu.svelte"
import type Menu_1 from "$lib/menu/menu-1.test.svelte" // test


export {
  popover,
  controllers as popoverCtrls,
  
}
export type {
  Controller as PopoverCtrl,
  // Controllers as PopoverCtrls,
  PopoverArgs,
  
}


type Controllers = {
  [key: number | string | symbol]: Controller
}

type Controller = {
  /**
   * component (within tooltip content)
   * ? work around: interesection over union, to fix a very subtle usage bug
   */
  cmp/* ? */: 
    UnionToIntersection<
      InstanceType<
        // NonNullable<
          PopoverArgs["cmp"]
        // >
      >
    >
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TooltipInstance
}

/**
 * either pass cmp || content
 */
type PopoverArgs<T = PopoverContent> = {
  /**
   * a component to use as the tooltip's content
   * see related: 'Popover.cmp'
   */
  cmp/* ? */: new (...args: any) => T
  
  cmpProps?: any
  // reminder  cmpProps?: PopoverContent // proposes all
  // ? only exported funcs are getting suggested
  // cmpProps?: Partial<T>
  // ? works like above, also same limitations
  // cmpProps?: Partial<
  //   InstanceType<
  //     NonNullable<
  //       PopoverArgs<T>["cmp"]
  //     >
  //   >
  // >
  
  cmpOpts?: Partial<
    Svelte2TsxComponentConstructorParameters<
      // NonNullable<
        PopoverArgs<T>["cmpProps"]
      // >
    >
  >
  
  /**
   * static content
   */
  // content?: TooltipContent
  
  /**
   * a key (id), to navigate available controllers and use 1
   * like this: " controllers[<<key/id>>].doSth() ";
   * allowing to further manipulate the popover once generated
   * 
   * recommended: Symbol(); cuz unique
   */
  ctrlId?: Readonly<keyof Controllers>
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TooltipProps>
}

/**
 * ? possible content types for the popup
 */
type PopoverContent = 
  | Menu 
  | Menu_1 // test



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
    // const {x} = state.modifiersData.popperOffsets;
    
    // console.log(`window.innerWidth`, window.innerWidth)
    // console.log(`htmlElems.appScroller.clientWidth`, htmlElems.appScroller!.clientWidth)
    // console.log(`htmlElems.appScroller.offsetWidth`, htmlElems.appScroller!.offsetWidth)
    
    state.styles.popper = {
      ...state.styles.popper,
      
      maxHeight: `${height}px`,
      maxWidth: `${width}px`,
      
      // Minimum acceptable size is 280px 
      // BUG overflow-x in some viewports
      // maxHeight: `${Math.max(280, height)}px`,
      // maxWidth: `${Math.max(280, width)}px`,
      
      // maxHeight: `clamp(280px, ${height}, calc(100vh - 50px))`,
      
      // maxWidth: `90vw`,
      // maxWidth: `calc(100vw - 40px)`,
      // maxWidth: `${Math.max(htmlElems.appScroller!.clientWidth - (x/*  + 40 */), 280)}px`,
      // maxWidth: `${htmlElems.appScroller!.clientWidth - (x/*  + 40 */)}px`,
      // maxWidth: `${Math.max(280, Math.min(width, htmlElems.appScroller!.clientWidth - (x/*  + 40 */)))}px`,
    };
  }
}

/**
 * popover controller (global store)
 * each key controls a different popover
 */
// const controllers: Controllers = {}
// const controllers: Writable<Controllers> = writable({})
function createControllersStore() {
  // ? https://svelte.dev/tutorial/custom-stores
	const { set, subscribe, update } = writable<Controllers>({})

	return {
    subscribe,
    update,
    
    /**
     * alert/notify subscribers of the changes
     */
		sync: () => update(val => val),
    
		// decrement: () => update(n => n - 1),
		// reset: () => set(0)
	}
}
const controllers = createControllersStore()



/**
 * usage: svelte's use:action
 * 
 * req. args
 * either pass cmp || content 
 * cmp: to a component as content
 * content: for static as content
*/
function popover(htmlEl: HTMLElement, args: PopoverArgs) {
  const {
    cmp, 
    cmpProps = {}, 
    cmpOpts,
    // content,
    ctrlId,
    tooltipOpts = {},
  } = args
  
  
  // * content
  
  let cmpInstance: 
    InstanceType<
      // NonNullable<
        typeof cmp
      // >
    > | undefined
  
  if (cmp) {
    tooltipOpts.onCreate = (instance: TooltipInstance) => {
      // console.log(`onCreate`, instance)
      instance.popper.classList.add("tippy-root")
      
      cmpInstance = new cmp({ 
        target: instance.popper.querySelector('.tippy-content'),
        
        ...cmpOpts,
        
        // ? {pinned down} so that cmpProps overwrites cmpOpts.props
        props: {
          // defaults here (valid for every component)
          ...cmpProps,
        },
      })
    }
    
  }/*  else if (content) {
    tooltipOpts.content = content
  } */
  
  
  // * tooltip
  
  const tooltip = tippy(htmlEl, {
    
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
    // onDestroy(instance) {
    //   console.log(`onDestroy instance`, instance)
    // },
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
    
    // trigger: "click",
    // trigger: 'click mouseenter', // no keyboard "mouse hover"-like behavior
    // trigger: 'click focus mouseenter',
    // trigger: 'click focus pointerenter',
    // trigger: 'click focus focusin mouseenter',
    trigger: 'click focusin mouseenter', // * best (not perfect)
    // trigger: 'focus mouseenter', // * default
    // trigger: 'focus pointerenter',
    // trigger: 'mousedown', // no keyboard (at all)
    // trigger: 'pointerdown', // no keyboard (at all)
    
    zIndex: stackingContext.popover,
    
    ...tooltipOpts
  })
  
  
  // * controller
  
  // ? vers. where static 'content' is a possible parameter
  // #region
  /* if (ctrlId) {
    const ctrl: Controller = {
      tooltip,
    }
    
    controllers[ctrlId] = ctrl
    
    if (cmpInstance) {
      ctrl.cmp = <Controller["cmp"]>cmpInstance
    }
  } */
  // #endregion
  if (ctrlId/*  && cmpInstance */) {
    const ctrl: Controller = {
      cmp: <Controller["cmp"]>cmpInstance,
      tooltip,
    }
    
    cmpInstance.$set({ 
      popoverCtrl: ctrl,
    })
    controllers.update(val => ({
        ...val,
        [ctrlId]: ctrl
      })
    )
  }
  
  
  // * use:action return
  
  const useActionReturn: SvelteActionReturnType = {
    /* triggers when 'args' change from outside
      
      * NOTE initial func args
      cmpProps & tooltipOpts initially passed to this func 
      will continue working but won't appear when logged
    */
    // ? disabled: hard to maintain
    /* update: (updatedArgs: typeof args) => {
      console.log(`use:action.update()`, updatedArgs)
      
      // ensure reactivity
      if (updatedArgs.cmpProps) {
        cmpInstance?.$set(updatedArgs.cmpProps)
      }
      if (updatedArgs.tooltipOpts) {
        tooltip.setProps(updatedArgs.tooltipOpts)
      }
    }, */
    
    destroy: () => {
      console.log(`use:action.destroy()`, )
      
      /*
      in case the reference htmlEl is removed from the DOM
      I'll destroy these instances manually
      ? needed
      */
      cmpInstance?.$destroy()
      tooltip.destroy()
      
      // ctrlId && delete controllers[ctrlId]
      if (ctrlId) {
        controllers.update(val => {
          delete val[ctrlId]
          return val
        })
      }
      
    },
  }
  
  return useActionReturn
  
}
  
  









