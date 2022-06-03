<script>
import { beforeUpdate } from "svelte";
import Message from "./Message.svelte"
import { UTIL } from '../app_modules/utilities'

export let sentence;

let words;
let message;
let type;

beforeUpdate(() => {
  if(!sentence) {
    message = "... LOADING ...";
    type = "information"
  } else {
    message = null;
    words = UTIL.scramble(sentence);
  }
})

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
