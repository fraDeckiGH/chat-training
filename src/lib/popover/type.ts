
// * 

import type { Writable$ } from '$lib/store'
import type { UnionToIntersection } from '$lib/type'
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
  Controller,
  Controllers,
  Controllers_key,
  
}


/**
 * either pass cmp || content
 */
 type Args<T = Content> = {
  /**
   * a component to use as the tooltip's content
   * see related: 'Popover.cmp'
   */
  cmp/* ? */: new (...args: any) => T
  
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
   * a key (id), to navigate available controllers and use 1
   * like this: " controllers[<<key/id>>].doSth() ";
   * allowing to further manipulate the popover once generated
   * 
   * recommended: Symbol(); cuz unique
   */
  ctrlId?: Controllers_key
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TooltipProps>
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
          Args["cmp"]
        // >
      >
    >
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TooltipInstance
}

type Controllers = {
  [key: number | string | symbol]: Controller
  // [key: number | string | symbol]: Writable$<Controller>
}

type Controllers_key = Readonly<keyof Controllers>


/**
 * ? possible content types for the popup
 */
type Content = 
  | Menu 
  | Menu_1 // test
;














