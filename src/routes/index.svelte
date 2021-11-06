<script lang=ts>
  import { Gun } from '../gun/chainExtension'
  
  import { nanoid } from 'nanoid'
  import { gun_state } from '../gun/util'
  
  import Login from './Login.svelte'
  
  const gun = Gun({
    // localStorage: false,
    // peers: [
    //   "https://gundb-peer.herokuapp.com/gun",
    // ],
    radisk: false,
  })
  const db = gun.get("db")
  
  
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
  
  
  // ----------------------------
  // execution
  
  
  // createNodes()
  // createPaginationChains()
  // interrogateGun("date")
  
  
  // ----------------------------
  // functions
  
  function createNodes() {
    // console.log('createNodes()')
    
    let elToAdd: any
    
    files.forEach(async (el, i) => {
      elToAdd = enrichEl(el)
      
      // add elem
      
      const elDbRef = gun
        .user()
        .get("File")
        // .get("_id")
        // .get(elToAdd._id)
        .get(i + "")
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
  
  function enrichEl(el: any/* , i: number */) {
    // adding fields which allow for proper storage
    
    let elToAdd = {
      // _id: i,
      _id: nanoid(),
      
      // FIXME trading(losing) nanosecond precision for millisecond
      // TODO change Windows hour 
      // testare che Gun.state() rimanga giusto (utilizzando + di 1 peer)
      _dateCreated: new Date(gun_state()).toISOString(),
      // _dateUpdated: new Date(gun_state()).toISOString(),
      
      // _entityName: "File", // useful?
    }
    
    // key sort needed?
    elToAdd = {
      ...elToAdd,
      ...el,
    }
    
    return elToAdd
  }
  
  function interrogateGun(path: string = "no-path") {
    console.log('interrogateGun() path', path)
    
    /* const ref =  */gun
      .user()
      .get("kvobufgb03tVotqu1W6m4QU")
      .get("File")
      /* .get(
        // @ts-ignore
        {
          '.': {
            // '>': `${path}:2019-06-20T11:40:16.301Z`,
            // '<': `${path}:2019-07-24b`, // added a "b" at the end
            '>': `1`,
            '<': `9`, // added a "b" at the end
            // "*": path,
            // "=": "",
          },
          // 1 item = ~200 bytes -> ~50 items
          // '%': 10000,
        }
      ) */
      .get("1")
      // .map()
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
  
  
</script>


<main class="content-container">
  <Login></Login>
  
  <h4>
    index
  </h4>
  
  <div class="actions-panel">
    
    <!-- <button on:click="{queueElems}">
      queue elems
    </button> -->
    <button on:click="{createNodes}">
      createNodes
    </button>
    <button on:click="{(event) => interrogateGun('File')}">
      interrogateGun
    </button>
    
  </div>
  
</main>


<style lang=scss>
  
  .actions-panel {
    display: flex;
    gap: 1em;
  }
  
</style>
