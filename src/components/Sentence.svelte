<script>
import { onMount } from "svelte";
import { UTIL } from "../app_modules/UTIL.js";
import { scrambledSentenceAsPromise } from "../stores.js"

let counter = 1;

let words;
scrambledSentenceAsPromise.subscribe(value => words = value)

onMount(async function() {
  words = await UTIL.getSentence(counter);
})


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
