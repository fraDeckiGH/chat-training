
<script lang=ts>
  // @ts--nocheck
  
  // import "../app.scss"
  // import "app.scss"
  
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
  
  
  // createNodes()
  createPaginationChains()
  // interrogateGun("date")
  
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
  
  async function createPaginationChains() {
    files.forEach(async (el, i) => {
      for (const key in el) {
        // TODO cases to evaluate:
        // el[key] may be nullish
        // make distinction based on type: isoString, number, bool, string
        
        if (key !== "date") continue
        
        // if (i > 0) break
        // if (i === 0) continue
        if (i > 1) break
        
        
        const chainHeadRef = gun
          .get("File")
          .get(key)
        
        const chainHead = await chainHeadRef
          // @ts-ignore
          .count("count", 1) // move somewhere below?
          .valueCopy_()
          // .put(elDbRef)
        // console.log(`chainHead`, JSON.parse(JSON.stringify(chainHead)))
        console.log(`chainHead`, chainHead)
        
        
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
          chainHeadRef.put({
            first: el[key],
            last: el[key],
          })
          chainValueRef.put({
            next: el[key],
            prev: el[key],
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
                chainHeadRef.put({
                  first: el[key],
                })
                // setTimeout(() => {
                //   console.log(`case0 chainHead`, chainHead)
                // }, 1000);
                
                chainValueRef.put({
                  next: chainHead.first,
                  // prev: null, // don't think it's needed
                })
                
                // update the content of the - now former - chain edge
                gun
                  .get("File")
                  .get(key)
                  .get("values")
                  .get(chainHead.first)
                  .put({
                    prev: el[key],
                  })
                
                break
              case 1:
                const chainValue = await chainValueRef
                  .value_()
                
                if (!chainValue.next) {
                  chainValueRef.put({
                    next: chainHead.last,
                  })
                }
                if (!chainValue.prev) {
                  chainValueRef.put({
                    prev: chainHead.first,
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
  
  
  // quick tests
  
  // quickTest()
  async function quickTest() {
    
    const log = gun
      .get("changesQueue")
      .put({
        
      })
    
    console.log(`log`, log)
  }
  
  
  
</script>

<main class="content-container">
  index
</main>

<style lang=scss>
  
</style>
