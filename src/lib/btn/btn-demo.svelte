<script lang=ts>
  import Btn from "./btn.svelte";
  
  let submittingForm = false
  
</script>


<Btn 
  attr={{
    // will be overwritten (hint: look into the cmp)
    class: "btn-submit",
    
    disabled: submittingForm,
    style: `
      background: red;
      height: 2000px;
    `,
    type: "submit",
  }}
  on:click={() => {
    submittingForm = !submittingForm
  }}
>
  attr example
</Btn>











