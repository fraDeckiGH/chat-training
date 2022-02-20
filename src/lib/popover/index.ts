
// * barrel

export * from "./index.svelte"
// export * from "./popover"


// ? use these internally, w/in other modules(sheets) of this very cmp
// except in demo file(s), where I want to simulate outside-usage
export * from "./type"

// ? use these outside
export type {
  Args as PopoverArgs,
  Controller as PopoverCtrl,
  Controllers as PopoverCtrls,
  Controllers_key as PopoverCtrls_key,
} from "./type"














