<script>
import { onMount } from "svelte";
import { API } from "../app_modules/api";
import { scrambledSentenceAsPromise } from "../stores.js"

let words;

onMount(async function() {
  words = await API.get(1);
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
