

<script lang=ts>
  
  export let items: any[] = [
    {
      lbl: "1",
    },
    {
      lbl: "2",
    },
    {
      lbl: "3",
    },
    {
      lbl: "4",
    },
    
  ]
  
  
</script>


<div 
  class="menu"
>
  {#each items as item}
    <div class="li">
      {item.lbl}
    </div>
  {/each}
</div>


<style lang=scss>
  
  .li:hover {
    background-color: red;
  }
  
</style>