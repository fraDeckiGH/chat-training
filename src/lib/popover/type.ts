
// * 

import type { Writable$ } from '$lib/store'
import type { ObjLiteralKey } from '$lib/type'
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
   * see related: 'Popover.cmp'
   */
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
   * gen controller's id
   */
  // FIXME Readonly<> works only on objs
  ctrlId?: ObjLiteralKey
  
  /**
   * tooltip options
   */
  tooltipOpts?: Partial<TooltipProps>
}



type Cmp<T> = InstanceType<CmpClass<T>>

type CmpClass<T> = new (...args: any) => (
  & T 
  & Svelte2TsxComponent 
  & {
    popoverCtrl?: Controllers_val<T>
  }
)



type Controller<T> = {
  /**
   * component (w/in tooltip content)
   * ? work around: interesection over union, to fix a very subtle usage bug
   */
  cmp: Cmp<T>
  
  /**
   * meant to be used like: '_tippy' property
   * https://atomiks.github.io/tippyjs/v6/tippy-instance/#-property
   */
  tooltip: TooltipInstance
}

type Controllers<T> = Record<ObjLiteralKey, Controllers_val<T>>
// type Controllers_key = ObjLiteralKey
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













