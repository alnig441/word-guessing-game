<script>
  import { scorePromise } from "../stores.js";
  let appScore;

  scorePromise.subscribe(value => appScore = value)

</script>

<div id="score">
  <h2>Score: {appScore} </h2>
</div>

<style>
</style>
