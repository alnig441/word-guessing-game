<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { originalSentenceAsPromise } from "../stores.js";
  let sentence;
  let counter = 1;

  originalSentenceAsPromise.subscribe(value => sentence = value)

  async function getNextSentence() {
    counter ++;
    if(counter <= 10) {
      await UTIL.getSentence(counter);
    }
    else {
      alert('you won')
    }
    return;
  }

</script>

{#each sentence as word, i}
  {#each word as letter, j}
  <input type="text" value="{letter}">
  {#if j === (word.length - 1) && i < (sentence.length - 1) }
  <input type="text" value=' '>
  {/if}
  {/each}
{/each}
<button on:click="{getNextSentence}">Next</button>

<style>
</style>
