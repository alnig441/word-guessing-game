<script>
  import { scoreAsPromise } from "../stores.js";
  let score;

  scoreAsPromise.subscribe(assignScore);

  function assignScore(value) {
    score = value;
  }

</script>

<div id="score">
  <h2>Score: { score } </h2>
</div>

<style>
</style>
