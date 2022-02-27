
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
    // T (-1 props (during tests))
    CmpInstance
  > 
  // work around
  & Record<string, any>
;

type CmpOpts<T, CmpInstance = Cmp<T>> = 
  Svelte2TsxComponentConstructorParameters<
    CmpProps<T, CmpInstance>
  >
;








