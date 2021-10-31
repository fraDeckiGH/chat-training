


<script lang=ts>
  // @ts--nocheck
  
  // import "../app.scss"
  // import "app.scss"
  
  
  import Login from './Login.svelte'
  import { username } from "../user"
  
  // import Gun from "gun"
  import { Gun } from '../gun/chainExtension'
  // import "gun/lib/match"
  // import "gun/lib/not"
  // import "gun/lib/unset"
  
  import { nanoid } from 'nanoid'
  import { gun_state } from '../gun/util'
  
  const gun = Gun({
    // file: "./gen/gundb.json", // ? doesn't work
    // localStorage: false,
    // peers: [
    //   "https://gundb-peer.herokuapp.com/gun",
    // ],
    radisk: false,
  })
  
  
  // 2011-10-05T14:48:00.000Z
  // entity/property
  
  // sorting (top=priority): 
  // date ascending
  // size descending
  // seeds ascending
  
  // 5 6 3 0 1 4 2
  
  const files: any[] = [
    { // 1
      date: '2019-06-21',
      seeds: 76,
      size: 360,
    },
    { // 0
      date: '2019-06-20T11:40:16.301Z',
      seeds: 0,
      size: 1,
    },
    { // 2
      date: '2019-07-24',
      seeds: 12,
      size: 1111,
    },
    { // 3
      date: '2019-06-20T11:40:16.301Z',
      seeds: 2,
      size: 2,
    },
    
    { // 4
      date: '2019-07-24',
      seeds: 2,
      size: 9999,
    },
    { // 5 (almost identical to 3)
      date: '2019-06-20T11:40:16.301Z',
      seeds: 1,
      size: 2,
    },
    { // 6 (identical to 5)
      date: '2019-06-20T11:40:16.301Z',
      seeds: 1,
      size: 2,
    },
    
  ]
  
  let localChangesQueue: any[] = []
  
  $: {
    console.log(`$: localChangesQueue`, localChangesQueue);
    (async () => {
      for await (const el of localChangesQueue) {
        localChangesQueue.shift()
        // localChangesQueue = localChangesQueue
        console.log(`for await`, JSON.parse(JSON.stringify(localChangesQueue)))
      }
    })
  }
  
  
  // ----------------------------
  // execution
  
  initApp()
  
  // createNodes()
  // createPaginationChains()
  // interrogateGun("date")
  
  
  // ----------------------------
  // functions
  
  function createNodes() {
    // console.log('createNodes()')
    
    let elToAdd: any
    
    files.forEach(async (el, i) => {
      // adding fields which allow for proper storage
      
      elToAdd = {
        _id: i,
        // _id: nanoid(),
        
        // FIXME trading(losing) nanosecond precision for millisecond
        // TODO change Windows hour 
        //   testare che Gun.state() rimanga giusto
        _dateCreated: new Date(gun_state()).toISOString(),
        _dateUpdated: new Date(gun_state()).toISOString(),
        
        // _entityName: "File", // useful?
      }
      // elToAdd["_id"] = i
      // elToAdd["_id"] = nanoid()
      
      // key sort needed?
      elToAdd = {
        ...elToAdd,
        ...el,
      }
      
      // add elem
      
      const elDbRef = gun
        .get("File")
        .get("_id")
        .get(elToAdd["_id"])
      elDbRef.put(elToAdd)
      
      // 
      
      // createChains()
      
      
      // for each prop, create nodes that link to the elem just added
      
      // const elCopy = {...el}
      // delete elCopy.id
      
      // Object.keys()
      // for (const prop in elCopy) {
      // for (const prop in el) {
      //   gun
      //     .get("File")
      //     .get(`${prop}:${el[prop]}/id:${el.id}`)
      //     .put(elDbRef)
      // }
      
    })
  }
  
  /* function createNodes() {
    // console.log('createNodes()')
    
    files.forEach((el, i) => {
      // el.id
      
      el["id"] = i
      // el["id"] = nanoid()
      // console.log(`el["id"]`, el["id"])
      
      // add elem
      
      const elRef = gun.get(`Id/id:${el.id}`)  
      elRef.put(el)
      
      // for each prop, create nodes that link to the elem just added
      
      const elCopy = {...el}
      delete elCopy.id
      
      // Object.keys()
      for (const prop in elCopy) {
        gun
          .get("File")
          .get(`${prop}:${el[prop]}/id:${el.id}`)
          .put(elRef)
      }
      
    })
  } */
  
  function enrichEl(el: any, i: number) {
    // adding fields which allow for proper storage
    
    let elToAdd = {
      _id: i,
      // _id: nanoid(),
      
      // FIXME trading(losing) nanosecond precision for millisecond
      // TODO change Windows hour 
      //   testare che Gun.state() rimanga giusto
      _dateCreated: new Date(gun_state()).toISOString(),
      _dateUpdated: new Date(gun_state()).toISOString(),
      
      // _entityName: "File", // useful?
    }
    // elToAdd["_id"] = i
    // elToAdd["_id"] = nanoid()
    
    // key sort needed?
    elToAdd = {
      ...elToAdd,
      ...el,
    }
    
    return elToAdd
  }
  
  function interrogateGun(path: string) {
    console.log('interrogateGun()')
    
    /* const ref =  */gun
      .get("File")
      .get(
        // @ts-ignore
        {
          '.': {
            '>': `${path}:2019-06-20T11:40:16.301Z`,
            '<': `${path}:2019-07-24b`, // added a "b" at the end
            // "*": path,
            // "=": "",
          },
          // 1 item = ~200 bytes -> ~50 items
          // '%': 10000,
        }
      )
      .map()
      .once(function(data, key) {
        console.log(key, data)
        
        // delete all collections
        // gun
        //   .get(path)
        //   .get(key)
        //   .put(<any>null)
      })
    
    // console.log(`ref`, ref)
  }
  
  // * changes queue
  
  function queueElem(index: number) {
    gun
      .get("changesQueue")
      .get(`index${index}`)
      .put(enrichEl(files[index], index))
  }
  
  function queueElems() {
    console.log(`$username`, $username)
    if ($username === "fdc") {
      console.log(`here fdc`, )
      // queueElem(0)
    }
    // queueElem(1)
  }
  
  // * pagination chain
  
  /* function createPaginationChains() {
    files.forEach((el, i) => {
      paginationChain_elemAdd(el, i)
    })
  } */
  
  async function paginationChain_elemAdd(el: any, i?: number) {
    return new Promise(async (resolve) => {
      for (const key in el) {
        // TODO cases to evaluate:
        // el[key] may be nullish
        // make distinction based on type: isoString, number, bool, string
        
        if (key !== "date") continue
        console.log(`started adding el`, el._id)
        
        // if (i > 0) break
        // if (i === 0) continue
        // if (i > 1) break
        
        
        const chainHeadRef = gun
          .get("File")
          .get(key)
        const chainHead = await chainHeadRef
          // @ts-ignore
          .count("count", 1) // move somewhere below?
          .valueCopy_()
          // .put(elDbRef)
        
        // might need to place this within a promise
        const chainValueRef = gun
          .get("File")
          .get(key)
          .get("values")
          .get(el[key])
          // @ts-ignore
          .count("count", 1)
        
        
        // assumption: both first & last are populated or none of them is
        if (!chainHead?.first) {
          // being here means this whole chain is being created right now
          // chainHeadRef.put({
          //   first: el[key],
          //   last: el[key],
          // })
          await new Promise((resolve) => {
            chainHeadRef.put({
              first: el[key],
              last: el[key],
            }, () => {
              resolve(null)
            })
          })
          
        } else {
          // rank first, last & el[key]
          const values = [
            chainHead.first,
            chainHead.last,
            el[key],
          ].sort(
            // comparing numbers?
            typeof el[key] === "number" ?
            ((a: number, b: number) => a - b) : undefined
          )
          
          const indexStart = values.indexOf(el[key])
          const indexEnd = values.lastIndexOf(el[key])
          
          if (indexStart === indexEnd) {
            switch (indexStart) {
              case 0:
                console.log(`case 0`, )
                
                // chainHeadRef.put({
                //   first: el[key],
                // })
                await new Promise((resolve) => {
                  chainHeadRef.put({
                    first: el[key],
                  }, () => {
                    resolve(null)
                  })
                })
                // setTimeout(() => {
                //   console.log(`case0 chainHead`, chainHead)
                // }, 1000);
                
                // chainValueRef.put({
                //   next: chainHead.first,
                //   // prev: null, // don't think it's needed
                // })
                await new Promise((resolve) => {
                  chainValueRef.put({
                    next: chainHead.first,
                    // prev: null, // don't think it's needed
                  }, () => {
                    resolve(null)
                  })
                })
                
                // update the content of the - now former - chain edge
                // gun
                //   .get("File")
                //   .get(key)
                //   .get("values")
                //   .get(chainHead.first)
                //   .put({
                //     prev: el[key],
                //   })
                await new Promise((resolve) => {
                  gun
                    .get("File")
                    .get(key)
                    .get("values")
                    .get(chainHead.first)
                    .put({
                      prev: el[key],
                    }, async () => {
                      resolve(null)
                    })
                })
                break
              case 1:
                console.log(`case 1`, )
                
                const chainValue = await chainValueRef
                  .value_()
                
                if (!chainValue.next) {
                  // chainValueRef.put({
                  //   next: chainHead.last,
                  // })
                  await new Promise((resolve) => {
                    chainValueRef.put({
                      next: chainHead.last,
                    }, () => {
                      resolve(null)
                    })
                  })
                }
                if (!chainValue.prev) {
                  // chainValueRef.put({
                  //   prev: chainHead.first,
                  // })
                  await new Promise((resolve) => {
                    chainValueRef.put({
                      prev: chainHead.first,
                    }, () => {
                      resolve(null)
                    })
                  })
                }
                break
              case 2:
                
                break
              default:
                
            }
          } else {
            if (indexStart === 0 && indexEnd === 1) {
              
            } else if (indexStart === 1 && indexEnd === 2) {
              
            }
          }
          
          
        }
        
        
        
        
      }
      
      console.log(`resolving el._id`, el._id)
      resolve(null)
    })
  }
  
  // * start-up
  
  // TODO move up
  
  
  function initApp() {
    // console.log(`res`, Date.now() - 1635089520000)
    setTimeout(() => {
      console.log(`eeeeeeeee`, )
    }, Date.now() - 1635089520000)
    
    gun
      .get("changesQueue")
      .map()
      .once(async (data, key) => {
        console.log(key, data)
        
        // offline mode
        // #region
        /* 
        if a peer goes offline we don't want to do any operations
        to the pagination chain(s)
        
        I'm willing to bet, the way Gun solves conflicts may make 
        this "changes-queue system" pointless and break the said 
        pag. chain(s) anyway.
        
        Instead find a way to resume pag. chain ops when the user 
        comes back online
        */
        // #endregion 
        
        // I might need to shallow copy 'data'
        // paginationChain_elemAdd(data)
        localChangesQueue.push(paginationChain_elemAdd(data))
        localChangesQueue = localChangesQueue
        
        // FIXME do this when pagination chain operations are finished
        // gun
        //   .get("changesQueue")
        //   .get(key)
        //   .put(<any>null)
      })
  }
  
  // * tests
  
  async function quickTest() {
    
    // const log = gun
    //   .get("changesQueue")
    //   .get(`index0`)
    //   .put(files[0])
    
    // console.log(`log`, log)
    
    await paginationChain_elemAdd(enrichEl(files[0], 1))
    await paginationChain_elemAdd(enrichEl(files[1], 1))
  }
  
  
  
</script>


<main class="content-container">
  <Login></Login>
  
  <h4>
    paginationChain
  </h4>
  
  <div class="actions-panel">
    
    <button on:click="{queueElems}">
      queue elems
    </button>
    <button on:click="{quickTest}">
      quick test
    </button>
    
  </div>
  
</main>


<style lang=scss>
  
  .actions-panel {
    display: flex;
    gap: 1em;
  }
  
</style>
