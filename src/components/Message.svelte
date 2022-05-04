<script>
export let message, type
</script>

<div>
  <h1 class={type}>{message}</h1>
</div>

<style>
  h1 {
    border-radius: 5px;
    margin: 10px;
  }
  .success {
    background-color: #66bb6a;
  }
  .error {
    background-color: #f44336;
  }
  .information {
    background-color: #90caf9;
  }


</style>
