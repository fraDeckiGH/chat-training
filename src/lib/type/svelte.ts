
export type {
  Cmp as SvelteCmp,
  CmpClass as SvelteCmpClass,
  CmpProps as SvelteCmpProps,
  CmpOpts as SvelteCmpOpts,
  
}



type Cmp<T> = 
  & T 
  & Svelte2TsxComponent 
;

type CmpClass<T, CmpInstance = Cmp<T>> = new (
  ...args: CmpOpts<T, CmpInstance>[]
) => CmpInstance



// BUG not all props intellisensed
type CmpProps<T, CmpInstance = Cmp<T>> = 
  Partial<
    Svelte2TsxComponentConstructorParameters<
      // T (-1 props (during tests))
      CmpInstance
    >["props"]
  > 
  // work around
  & Record<string, any>
;

type CmpOpts<T, CmpInstance = Cmp<T>> = 
  Svelte2TsxComponentConstructorParameters<
    CmpProps<T, CmpInstance>
  >
;








