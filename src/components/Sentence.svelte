<script>
import { onMount } from "svelte";
import { UTIL } from "../app_modules/UTIL.js";
import { scrambledSentenceAsPromise } from "../stores.js"

let words;

onMount(async function() {
  words = await UTIL.getSentence(1);
})

scrambledSentenceAsPromise.subscribe(assignWords);

function assignWords(value) {
  words = value;
}

</script>

<div id="sentence">
  <div id="scrambled-word">
  <h1>{ words }</h1>
  </div>
</div>

<style>
  h1 {
    color: steelblue;
  }
</style>
