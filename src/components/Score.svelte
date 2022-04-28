<script>
  import { scoreAsPromise } from "../stores.js";
  let appScore;

  scoreAsPromise.subscribe(value => appScore = value)

</script>

<div id="score">
  <h2>Score: {appScore} </h2>
</div>

<style>
</style>
