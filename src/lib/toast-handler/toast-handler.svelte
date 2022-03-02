
<script lang=ts>
  import { stackingContext } from "$lib/misc"
  import { nanoid } from 'nanoid'
  import { createIntersectionObserver } from "./toast-handler.intersection-observer"
  import { onMount } from 'svelte'
  
  type Toast = {
    [key: string]: any
    id: string
    msg: string
    type?: 
      // | "error"
      | "info"
      | "progress--determinate"
      | "progress--indeterminate"
      // | "warning"
    toRemove: boolean
  }
  
  let toasts: Toast[] = []
  // let toasts: any/* { [key: string]: Toast } */ = {}
  
  const toastsToAdd = <Toast[]>[
    {
      msg: `a message with few words. But longer, yep! looonger!
      A message with few words. But longer, yep! looonger!`,
    },
    {
      msg: "ALongWordALongWordALongWordALongWordALon\
      gWordALongWordALongWordALongWordALongWordALong\
      WordALongWordALongWordALongWordALongWordALongWo\
      rdALongWordALongWordALongWordALongWordALongWord\
      ALongWordALongWordALongWordALongWord",
    },
    {
      msg: "A message with few words.",
    },
    {
      msg: `a messy message with quite the number of words, 
      in fact it is at a loss of 'em; a messy message with 
      quite the number of words, in fact it is at a loss of 'em`,
    },
    {
      msg: `ALL CAPS HERE; ALL CAPS HERE; ALL CAPS HERE; 
      ALL CAPS HERE; ALL CAPS HERE; `,
    },
    {
      msg: "1234567890",
    },
    {
      msg: "12345678901234567890123456789012345678901234567890",
    },
    
  ]
  
  $: if (toasts[0]?.toRemove) {
    toasts.shift()
    toasts = toasts
    console.log(`reactive`, toasts)
  }
  
  
  // * {pinned} lifecycle
  
  // onMount(() => {})
  
  
  /**
   * ? https://svelte.dev/docs#template-syntax-element-directives-use-action
   */
  function toastsElIsLive(HTMLEl: HTMLElement) {
		// the node has been mounted in the DOM
    // console.log(`HTMLEl`, HTMLEl)
    
    createIntersectionObserver({
      root: HTMLEl,
      threshold: 0.99,
    })
    
    return {
			destroy() {
				// the node has been removed from the DOM
			}
		}
  }
  
  function singleToastIsLive(HTMLEl: HTMLElement, { i, id }: {
    i: number
    id: Toast["id"]
  }) {
    // the node has been mounted in the DOM
    // console.log(`HTMLEl`, HTMLEl)
    
    /* BUG ontransitionend when hovering the toast
      
      possible solution
      use HTMLEl.PointerEvent
      https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
      
      see also
      mouseenter, mousemove, mouseover
      https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_event_mouseenter_mouseover#:~:text=mouseenter%20and%20mouseover.-,The%20mouseover%20event%20triggers%20when%20the%20mouse%20pointer%20enters%20the,moved%20over%20the%20div%20element.
    */
    
    HTMLEl.onanimationstart = (/* ev */) => {
      // console.log(`ev`, ev)
      // srcElement, target, toElement
      // https://stackoverflow.com/questions/31865416/what-is-the-difference-between-event-target-event-toelement-and-event-srcelemen
      // console.log(`ev.target`, ev.target)
      
      const classes = HTMLEl.classList
      classes.remove("fade--delay")
      classes.add("fade--out")
    }
    HTMLEl.ontransitionend = () => {
      // console.log(`removing index`, i)
      // console.log(`removing id`, id)
      
      // toasts.splice(i, 1)
      // delete toasts[id]
      
      const found = toasts.findIndex((item) => item.id === id)
      if (found === -1) {
        console.log(`return: found -1`, found)
        return
      }
      toasts[found].toRemove = true
      
      // toasts = toasts
    }
    
    
    return {
			destroy() {
				// the node has been removed from the DOM
			}
		}
  }
  
  // * test
  
  export async function add() {
    // console.log(`toasts length`, toasts.length + 1)
    // console.log(`toastsToAdd.length`, toastsToAdd.length)
    
    const id = nanoid()
    
    toasts.push({
      ...toastsToAdd[toasts.length % toastsToAdd.length],
      id,
    })
    // toasts[id] = {
    //   id,
    //   ...toastsToAdd[toasts.keys().length % toastsToAdd.length]
    // }
    toasts = toasts
  }
  
  export function remove() {
    toasts.shift()
    // delete (toasts.keys())[0]
    toasts = toasts
  }
  
  
</script>


<div class="component component--toast-handler"
  style:z-index={stackingContext.toastHandler}
>
  <div class="notification-area">
    
    <!-- <div class="visibile-notifications"> -->
    <ul 
      class="toasts" 
      use:toastsElIsLive
    >
    
      <!--
        ? https://svelte.dev/docs#template-syntax-each
      -->
      {#each toasts as item, i (item.id)}
        <li class="
            toast toast--{item.id} 
            fade fade--delay
          "
          class:removed={item.toRemove}
          use:singleToastIsLive={{
            i,
            id: item.id,
          }}
        >
          toast {item.id}
          <div class="toast__msg">
            {item.msg}
          </div>
        </li>
      {:else}
        <span>
          no notifications
        </span>
      {/each}
    
    </ul>
    <!-- </div> -->
    
    <!-- <div class="test-bar">
    
      <button
        on:click="{addToast}"
      >
        add toast
      </button>
    
      <button
        on:click="{removeToast}"
      >
        remove toast
      </button>
    
    </div> -->
    
  </div>
</div>


<style lang=scss>
  
  @use "../../lib/page";
  @use "../../lib/reset";
  
  @include reset.list(ul);
  
  
  .component {
    position: absolute;
    // z-index: ;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    
    pointer-events: none;
    
    .notification-area {
      @include page.ux-size();
      
      position: sticky;
      top: 0;
      height: 100vh;
      
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
  }
  
  // .visibile-notifications {}
  .toasts {
    // test
    // pointer-events: initial;
    
    background-color: darkgreen;
    
    $item_px: 1em;
    height: 400px;
    /* max- */width: min(40ch + ($item_px * 2), 100%);
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    
    .toast {
      border: 1px solid red;
      padding: .5em $item_px;
      
      pointer-events: initial;
      
      &.fade {
        transition: opacity 1.5s;
        
        &--delay {
          // fake animation used just to delay the transition
          // and the utility to pause the delay
          @keyframes ani {}
          animation-delay: 4s;
          animation-name: ani;
          &:hover {
            animation-play-state: paused;
          }
        }
        &--out {
          opacity: 0;
          &:hover {
            transition-duration: 100ms;
            opacity: 100%;
          }
        }
        
      }
      
      &.removed {
        visibility: hidden;
      }
      
      &:not(:last-child) {
        margin-bottom: .5em;
      }
      // &:not(:last-child) {
      //   margin-top: .5em;
      // }
    }
  }
  
</style>





