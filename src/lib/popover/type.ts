
// * 

import type { Writable$ } from '$lib/store'
import type { 
  SvelteCmp, 
  SvelteCmpClass, 
  SvelteCmpOpts,
  SvelteCmpProps, 
} from '$lib/type/svelte'
import type { 
  Content as TooltipContent,
  Instance as TooltipInstance, 
  
  Props as TooltipProps,
  Placement as PlacementTooltipProp,
  
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
  cmp: SvelteCmpClass<T, Cmp<T>>
  
  cmpProps?: SvelteCmpProps<T, Cmp<T>>
  
  cmpOpts?: Partial< 
    SvelteCmpOpts<T, Cmp<T>> 
  >
  
  /**
   * static content
   */
  // content?: TooltipContent
  
  /**
   * gen controller's id
   */
  // ? destructuring makes 'readonly' useless
  readonly ctrlId?: PropertyKey
  
  /** position / placement */
  pos: PlacementTooltipProp
  
  /**
    tooltip options
    these overwrite the ones passed by other means, 
    eg. 'pos' (which sets the placement)
  */
  tooltipOpts?: Partial<TooltipProps>
}



type Cmp<T> = 
  & SvelteCmp<T>
  & {
    popoverCtrl?: Controllers_val<T>
  }
;



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













