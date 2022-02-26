
// * 

import type { Writable$ } from '$lib/store'
import type { 
  Content as TooltipContent,
  Instance as TooltipInstance, 
  Props as TooltipProps,
} from 'tippy.js'


export type {
  Args,
  Cmp,
  Controller,
  Controllers,
  // Controllers_key,
  Controllers_val,
  
}


type Args<T> = {
  /**
   * a component to use as the tooltip's content
   */
  cmp: CmpClass<T>
  
  // cmpProps?: any
  // BUG not all props intellisensed
  cmpProps?: 
    Partial<
      Svelte2TsxComponentConstructorParameters<
        // T // (-1 props (during tests))
        Cmp<T>
      >["props"]
    >
    // work around
    & Record<string, any>
  ;
  
  // BUG not all props intellisensed
  cmpOpts?: 
    Partial< 
      Svelte2TsxComponentConstructorParameters<
        
        // * 'props'
        Partial<
          // T // (-1 props (during tests))
          Cmp<T>
        >
        // work around
        & Record<string, any>
        
      >
    >
  ;
  
  /**
   * static content
   */
  // content?: TooltipContent
  
  /**
   * gen controller's id
   */
  // FIXME Readonly<> works only on objs
  ctrlId?: PropertyKey
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TooltipProps>
}



type Cmp<T> = InstanceType<CmpClass<T>>

type CmpClass<T> = new (
  ...args: Svelte2TsxComponentConstructorParameters<T>[]
) => (
  & T 
  & Svelte2TsxComponent 
  & {
    popoverCtrl?: Controllers_val<T>
  }
)



type Controller<T> = null | {
  /**
   * component (w/in tooltip content)
   */
  cmp: Cmp<T>
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TooltipInstance
}

type Controllers<T> = Record<PropertyKey, Controllers_val<T>>
// type Controllers_key = PropertyKey
type Controllers_val<T> = 
  /**
    limitation
    can't tell how many users(utilizers) there are in a given moment
    and that's needed to clean up a controller when its users go 
    from 1 to 0
  */
  // Controller<T>
  
  /** */
  Writable$<Controller<T>>
;













