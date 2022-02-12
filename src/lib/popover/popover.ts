
// * 
// client side module

/*
? code mainly from (also see bookmarks)
https://stackoverflow.com/questions/59889859/how-can-i-return-the-rendered-html-of-a-svelte-component
REPL (corrected 1) https://svelte.dev/repl/ffd2b212ae9e48e4b0279e72c1c7cb21?version=3.17.3
*/

import tippy from 'tippy.js';
import type { 
  Content as TippyContent,
  Instance as TippyInstance, 
  Props as TippyProps,
} from 'tippy.js';

import 'tippy.js/dist/tippy.css'
import './_popover.scss'

import maxSize from 'popper-max-size-modifier';

import type Menu from "$lib/menu/menu.svelte"
import type Menu_1 from "$lib/menu/menu-1.test.svelte" // test
import type { UnionToIntersection } from '$lib/type'


export {
  popover,
  popoverCtrl,
  
}
export type {
  PopoverArgs, // autocompletion
  
}


/**
 * either pass cmp || content
 */
type PopoverArgs<T = PopoverContent> = {
  /**
   * a component to use as the tippy's content
   * see related: 'Popover.cmp'
   */
  cmp?: new (...args: any) => T
  
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
      NonNullable<
        PopoverArgs<T>["cmpProps"]
      >
    >
  >
  
  /**
   * static content
   */
  content?: TippyContent
  
  /**
   * a key identifier of a popoverCtrl's prop
   * to further manipulate the popover once generated
   * 
   * recommended: Symbol(); cuz unique
   */
  ctrlId?: keyof (typeof popoverCtrl)
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TippyProps>
}

/**
 * ? possible content types for the popup
 */
type PopoverContent = 
  | Menu 
  | Menu_1 // test

type PopoverCtrl_value = {
  /**
   * component (within tooltip content)
   * ? work around: interesection over union, to fix a very subtle usage bug
   */
  cmp?: 
    UnionToIntersection<
      InstanceType<
        NonNullable<
          PopoverArgs["cmp"]
        >
      >
    >
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TippyInstance
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
  [key: number | string | symbol]: PopoverCtrl_value
} = {}



/**
 * usage: svelte's use:action
 * 
 * req. args
 * either pass cmp || content 
 * cmp: to a component as content
 * content: for static as content
*/
function popover(htmlEl: HTMLElement, args: PopoverArgs) {
  console.log(`popover() `, )
  // console.log(`popover() htmlEl`, htmlEl)
  // console.log(`popover() popoverArgs`, popoverArgs)
  const {
    cmp = null, 
    cmpProps = {}, 
    cmpOpts,
    content,
    ctrlId,
    tooltipOpts = {},
  } = args
  
  
  // * content
  
  let cmpInstance: InstanceType<
    NonNullable<typeof cmp>
  > | undefined
  
  if (cmp) {
    tooltipOpts.onCreate = (instance: TippyInstance) => {
      // console.log(`onCreate`, instance)
      instance.popper.classList.add("tippy-root")
      
      cmpInstance = new cmp({ 
        target: instance.popper.querySelector('.tippy-content'),
        
        ...cmpOpts, // untested
        
        // ? {pinned down} so that cmpProps overwrites cmpOpts.props
        props: {
          // defaults here (valid for every component)
          ...cmpProps
        },
      })
    }
    
  } else if (content) {
    tooltipOpts.content = content
  }
  
  
  // * tooltip
  
  const local_tippyOpts: typeof tooltipOpts = {
    
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
    
    ...tooltipOpts
  }
  
  const tooltip = tippy(htmlEl, local_tippyOpts)
  
  
  // * controller
  
  if (ctrlId) {
    const ctrl: PopoverCtrl_value = {
      tooltip,
    }
    
    popoverCtrl[ctrlId] = ctrl
    
    if (cmpInstance) {
      ctrl.cmp = <PopoverCtrl_value["cmp"]>cmpInstance
    }
  }
  
  
  // * use:action return
  
  const useActionReturn: SvelteActionReturnType = {
    /* triggers when 'args' change from outside
      
      * NOTE initial func args
      cmpProps & tooltipOpts initially passed to this func 
      will continue working but won't appear when logged
    */
    update: (updatedArgs: typeof args) => {
      console.log(`use:action.update()`, updatedArgs)
      
      // ensure reactivity
      if (updatedArgs.cmpProps) {
        cmpInstance?.$set(updatedArgs.cmpProps)
      }
      if (updatedArgs.tooltipOpts) {
        tooltip.setProps(updatedArgs.tooltipOpts)
      }
    },
    
    destroy: () => {
      console.log(`use:action.destroy()`, )
      
      /*
      in case the reference htmlEl is removed from the DOM
      these instances need to be destroyed manually
      */
      cmpInstance?.$destroy()
      ctrlId && delete popoverCtrl[ctrlId]
      tooltip.destroy()
    },
  }
  
  return useActionReturn
  
}
  
  









