<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { originalSentenceAsPromise, scoreAsPromise } from "../stores.js";

  let sentence;
  let counter = 1;
  let score;
  let hide='hide' ;
  let correctAnswers = 0;

  originalSentenceAsPromise.subscribe(value => sentence = value)
  scoreAsPromise.subscribe(value => score = value)


  async function getNextSentence() {
    hide = 'hide';
    correctAnswers = 0;
    counter ++;
    score ++;

    if(counter <= 10) {
      await UTIL.getSentence(counter);
    }
    else {
      alert('you won')
    }
    return;
  }

  function checkLetter(e) {
    this.removeAttribute('disabled');
    const LENGTH = sentence.toString().length;
    let value = this.attributes['data-value'].value;

    if(e.key.toLowerCase() === value.toLowerCase()){
      correctAnswers ++;
      this.setAttribute('disabled', true);
      this.setAttribute('style', "background-color:#4caf50")
    }
    if (correctAnswers === LENGTH) {
      hide ='';
      score ++;
      scoreAsPromise.set(score);
    }
  }

</script>

{#each sentence as word, i}
  {#each word as letter, j}
  <input class="letter" type="text" value="" style="" data-value="{letter}" on:keyup="{checkLetter}">
  {#if j === (word.length - 1) && i < (sentence.length - 1) }
  <input class="space" type="text" value="" style="" data-value=" " on:keyup="{checkLetter}">
  {/if}
  {/each}
{/each}
<button class="{hide}" on:click="{getNextSentence}">Next</button>

<style>
  .hide {
    display: none;
  }

  button {
    color: white;
    background-color: #388e3c;
  }

  input {
    color: white;
  }

  input.space {
    background-color: #ffb74d;
  }

  input.letter {
    background-color:  #e1e1e1;
  }


</style>
