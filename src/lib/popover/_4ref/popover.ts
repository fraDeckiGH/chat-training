
// * a tooltip w/ a chosen component inside of it, as it's content
// client side module

/*
  ? code originally from (also see bookmarks)
  https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
  REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
*/

// import './_popover.scss'
import type { Args, Controller, Controllers } from "./type"
import { stackingContext } from "$lib/misc"
import { createWritable$ } from "$lib/store"
import maxSize from 'popper-max-size-modifier'

import tippy from 'tippy.js'
import type { 
  Content as TooltipContent,
  Instance as TooltipInstance, 
  Props as TooltipProps,
} from 'tippy.js'
import 'tippy.js/dist/tippy.css'


export {
  popover,
  controllers as popoverCtrls,
  
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


// ? doesn't work: thinks the type is "{}"
// const controllers = createWritable$({})
// ? both work
const controllers = createWritable$<Controllers>({})
// const controllers = createWritable$(<Controllers>{})

function myFunc(ctrlId: any) {
  // return $controllers[ctrlId]
}


/**
 * usage: svelte's use:action
 * 
 * req. args
 * either pass cmp || content 
 * cmp: to a component as content
 * content: for static as content
 */
function popover(htmlEl: HTMLElement, args: Args) {
  console.log(`log ts`, )
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
    const ctrl$ = createWritable$(ctrl)
    
    // controllers[ctrlId] = ctrl$
    controllers.update(val => ({
        ...val,
        // [ctrlId]: ctrl,
        [ctrlId]: ctrl$,
      })
    )
    
    if (!cmpInstance) {
      console.log(`return: !cmpInstance`, )
      return
    }
    cmpInstance.$set({ 
      // popoverCtrl: ctrl,
      popoverCtrl: ctrl$,
    })
    
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
  
  









