<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { originalSentenceAsPromise, scoreAsPromise } from "../stores.js";

  let sentence;
  let counter = 1;
  let score;
  // let hide='hide' ;
  let hide = 'true';
  let correctAnswers = 0;

  originalSentenceAsPromise.subscribe(value => {
    sentence = value;
   })
  scoreAsPromise.subscribe(value => score = value)

  async function getNextSentence() {
    // hide = 'hide';
    hide = true;
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
    // this.removeAttribute('disabled');
    const LENGTH = sentence.toString().length;
    let value = this.attributes['data-value'].value;

    if(e.key.toLowerCase() === value.toLowerCase()){
      correctAnswers ++;
      this.setAttribute('disabled', true);
      // this.setAttribute('style', "background-color:#4caf50")
      // this.setAttribute("class", "disabled")
    }
    if (correctAnswers === LENGTH) {
      hide = 'false';
      score ++;
      scoreAsPromise.set(score);
    }
  }

</script>
<div id="grid">
  {#each sentence as word, i}
    <div class="flex-container">
    {#each word as letter, j}
      <div class="flex-item">
        <input class="letter" type="text" style="" value="" data-value="{letter}" on:keyup="{checkLetter}" maxlength="1" autocomplete="off">
      </div>
    {#if j === (word.length - 1) && i < (sentence.length - 1) }
      <div class="flex-item">
        <input class="space" type="text" style="" value="" data-value=" " on:keyup="{checkLetter}" maxlength="1" autocomplete="off">
      </div>
    {/if}
    {/each}
    </div>
  {/each}
  {#if hide === 'false'}
    <div class="flex-item">
      <input type="submit" on:click="{getNextSentence}" value="Next">
    </div>
  {/if}
</div>

<style>
  #grid {
    padding: 5px;
  }

  .flex-container {
    display: flex;
    flex-direction: row;
  }

  .flex-item {
    flex-basis: auto;
    width: 100%;
    margin: 5px;
  }

  .hide {
    display: none;
  }

  input[type="submit"] {
    color: white;
    background-color: #388e3c;
  }

  input {
    width: 100%;
    text-align: center;
    color: white;
    margin: 0px;
  }

  input[type="submit"] {
    width: auto;
  }

  input.space {
    background-color: #ffb74d;
    /* width: auto; */
  }

  input.letter {
    background-color:  #e1e1e1;
  }

  input:focus {
    outline: none;
    color: black;
  }

</style>
