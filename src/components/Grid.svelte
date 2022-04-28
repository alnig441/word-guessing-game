<script>
  import { originalSentenceAsPromise } from "../stores.js";
  let sentence;

  originalSentenceAsPromise.subscribe(value => sentence = value)

</script>

{#each sentence as word, i}
  {#each word as letter, j}
  <input type="text" value="{letter}">
  {#if j === (word.length - 1) && i < (sentence.length - 1) }
  <input type="text" value=' '>
  {/if}
  {/each}
{/each}
<button>Next</button>
<style>
</style>
