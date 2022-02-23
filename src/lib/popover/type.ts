
// * 

import type { Writable$ } from '$lib/store'
import type { Maybe, UnionToIntersection } from '$lib/type'
import type { 
  Content as TooltipContent,
  Instance as TooltipInstance, 
  Props as TooltipProps,
} from 'tippy.js'

// {pinned down}
import type Menu from "$lib/menu/menu.svelte"
import type Menu_1 from "$lib/menu/_4ref/menu-1.test.svelte" // test


export type {
  Args,
  Cmp,
  Controller,
  Controllers,
  Controllers_key,
  Controllers_val,
  
}


type Args<T = Content> = {
  /**
   * a component to use as the tooltip's content
   * see related: 'Popover.cmp'
   */
  // cmp/* ? */: new (...args: any) => (T & Svelte2TsxComponent)
  cmp: CmpClass<T>
  
  cmpProps?: any
  // reminder  cmpProps?: Content // proposes all
  // ? only exported funcs are getting suggested
  // cmpProps?: Partial<T>
  // ? works like above, also same limitations
  // cmpProps?: Partial<
  //   InstanceType<
  //     NonNullable<
  //       Args<T>["cmp"]
  //     >
  //   >
  // >
  
  cmpOpts?: Partial<
    Svelte2TsxComponentConstructorParameters<
      // NonNullable<
        Args<T>["cmpProps"]
      // >
    >
  >
  
  /**
   * static content
   */
  // content?: TooltipContent
  
  /**
   * 
   */
  // FIXME readonly doesn't seem to do its job
  ctrlId?: Readonly<Controllers_key>
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TooltipProps>
}



// type Cmp = InstanceType<Args["cmp"]>
type Cmp<T = Content> = InstanceType<CmpClass<T>>

type CmpClass<T> = new (...args: any) => (
  & T 
  & Svelte2TsxComponent 
  & {
    popoverCtrl?: Controllers_val
  }
)



type Controller = {
  /**
   * component (w/in tooltip content)
   * ? work around: interesection over union, to fix a very subtle usage bug
   */
  cmp: UnionToIntersection<Cmp>
  // cmp: Cmp<T>
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TooltipInstance
}

type Controllers = {
  /**
    limitation
    can't tell how many users(utilizers) there are in a given moment
    and that's needed to clean up a controller when its users go 
    from 1 to 0
  */
  // [key: number | string | symbol]: Controller
  
  [key: number | string | symbol]: Writable$<Controller>
}

/**
 * a key (id), to navigate available controllers and use 1
 * like this: " controllers[<<key/id>>].doSth() ";
 * allowing to further manipulate the popover once generated
 * 
 * recommended: Symbol(); cuz unique
 */
// type Controllers_key = Readonly<keyof Controllers>
type Controllers_key = keyof Controllers

type Controllers_val = Controllers[Controllers_key]



/**
 * ? possible content types for the popup
 */
type Content = 
  | Menu 
  | Menu_1 // test
;














