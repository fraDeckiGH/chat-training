
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

// TODO try w/out styles
import 'tippy.js/dist/tippy.css'; // optional for styling
// import './_popover.scss'
import './_popover.scss'

import maxSize from 'popper-max-size-modifier';

import type { /* SvelteComponent,  */SvelteComponentTyped } from 'svelte'
import type Menu from "$lib/menu/menu.svelte"
import type Menu1 from "$lib/menu/_4ref/menu-1.test.svelte"


export {
  create,
  create as createPopover,
  popoverCtrl,
}
export type {
  Popover,
  PopoverContent,
  // ? if I need autocompletion
  PopoverArgs,
}

// TODO remove 'any' type where present

// ! unfinished
// TODO in 'useActionReturn': handle tooltipOpts change


/**
 * ? possible content types for the popup
 */
// type PopoverContent = Menu/*  | SomethingElse */
type PopoverContent = Menu | Menu1 // test

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
   * may be a simple string (risky cuz not unique); 
   * for unique id gen see: Symbol(), nanoid()
   */
  // popoverCtrl_key?: Readonly<string>
  ctrlId?: Readonly<string>
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TippyProps>
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
  [key: string]: Popover
} = {}

function create() {
  const instance = new Popover()
  return instance
}


class Popover {
  
  /**
   * component (within tooltip content)
   */
  cmp?: 
    InstanceType<
      NonNullable<
        PopoverArgs/* <T> */["cmp"]
      >
    >
  ctrlId?: PopoverArgs["ctrlId"]
  tooltip!: TippyInstance
  
  /**
   * usage: svelte's use:action
   * 
   * req. args
   * either pass cmp || content 
   * cmp: to a component as content
   * content: for static as content
  */
  useAction(htmlEl: HTMLElement, args: PopoverArgs) {
    console.log(`useAction() `, )
    // console.log(`useAction() htmlEl`, htmlEl)
    // console.log(`useAction() popoverArgs`, popoverArgs)
    const {
      cmp, 
      cmpProps = {}, 
      cmpOpts,
      content,
      ctrlId,
      tooltipOpts = {},
    } = args
    
    
    // * content
    
    // let cmp: InstanceType<typeof cmp>
    if (cmp) {
      
      tooltipOpts.onCreate = (instance: TippyInstance) => {
        // console.log(`onCreate`, instance)
        instance.popper.classList.add("tippy-root")
        
        this.cmp = new cmp({ 
          target: instance.popper.querySelector('.tippy-content'),
          
          ...cmpOpts, // untested (usage)
          
          // ? {pinned down} so that cmpProps overwrites cmpOpts.props
          props: {
            // defaults here
            ...cmpProps
          },
        })
      }
      
    }
    if (content) {
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
    
    this.tooltip = tippy(htmlEl, local_tippyOpts)
    
    
    // * controller
    
    if (ctrlId) {
      popoverCtrl[ctrlId] = this
      this.ctrlId = ctrlId
    }
    
    
    // * return
    
    const useActionReturn: SvelteActionReturnType = {
      // ! unfinished
      update: (updatedArgs: typeof args) => {
        console.log(`use:action.update()`, updatedArgs)
        
        // ensure reactivity
        // #region
        /* 
        triggers when arguments - passed by ref, 
        basically anything that's not primitive, 
        eg. obj literals - previously passed to the this func 
        change from outside.
        Like in the very component which called the this func 
        in the 1st place (for example)
        
        * also NOTE: func signature's defaults
        eg. args.cmpProps = {} 
        don't count in this scenario
        */
        // #endregion
        if (updatedArgs.cmpProps) { // no func signature's defaults
          this.cmp?.$set(updatedArgs.cmpProps)
        }
        // TODO handle tooltipOpts change
        // ? what else?
      },
      destroy: () => {
        console.log(`use:action.destroy()`, )
        
        /*
        in case the reference htmlEl is removed from the DOM
        these instances need to be destroyed manually
        */
        this.cmp?.$destroy()
        ctrlId && delete popoverCtrl[ctrlId] // TODO test
        this.tooltip.destroy()
      },
    }
    
    return useActionReturn
  }
  
  
}









