<script>
import { onMount } from "svelte";
import { UTIL } from "../app_modules/UTIL.js";


let counter = 1;
const URL = `https://api.hatchways.io/assessment/sentences/${counter}`;

let words;

onMount(async function() {
  words = await UTIL.getSentence(URL);
})


</script>

<div id="sentence">
  <div id="scrambled-word">
  <h1>{ words }</h1>
  </div>
</div>

<style>

</style>
