
export type {
  Cmp,
  CmpClass,
  CmpProps,
  CmpOpts,
  
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


// BUG not all props intellisensed
type CmpProps<T> = 
  Partial<
    Svelte2TsxComponentConstructorParameters<
      // T (-1 props (during tests))
      Cmp<T>
    >["props"]
  > 
  // work around
  & Record<string, any>
;

// BUG not all props intellisensed
type CmpOpts<T> = 
  Partial< 
    Svelte2TsxComponentConstructorParameters<
      
      // * 'props'
      Partial<
        // T (-1 props (during tests))
        Cmp<T>
      >
      // work around
      & Record<string, any>
      
    >
  >
;


