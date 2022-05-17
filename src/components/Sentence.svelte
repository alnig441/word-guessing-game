<script>
import { scrambledSentenceAsPromise } from "../stores.js"
import Message from "./Message.svelte"

let words;
let message;
let type;

scrambledSentenceAsPromise.subscribe(assignWords);

function assignWords(value) {
  if(!value) {
    message = "... LOADING ...";
    type = "information"
  } else if(typeof value === 'string') {
    message = null;
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
  <h1>{words}</h1>
  </div>
</div>
{/if}


<style>
  h1 {
    color: steelblue;
  }
</style>
