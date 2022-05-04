<script>
import { onMount } from "svelte";
import { API } from "../app_modules/api";
import { scrambledSentenceAsPromise } from "../stores.js"
import Message from "./Message.svelte"

let words;
let message;
let type;

onMount(function() {
  words = API.get(11);
})

scrambledSentenceAsPromise.subscribe(assignWords);

function assignWords(value) {
  if(typeof value === 'string') {
    words = value;
  }
  else {
    message = value.message;
    type = 'error';
  }
}

</script>
{#if message}
<Message {message} {type}/>
{:else}
<div id="sentence">
  <div id="scrambled-word">
  <h1>{ words }</h1>
  </div>
</div>
{/if}
<style>
  h1 {
    color: steelblue;
  }
</style>
