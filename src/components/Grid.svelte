<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { originalSentenceAsPromise, scoreAsPromise } from "../stores.js";
  import { beforeUpdate, tick } from 'svelte';

  beforeUpdate(async () => {

    document.getElementById("body").addEventListener("click", (e) => {
      e.preventDefault();
      if(!spellChallengeIsComplete) {
        if(!focusElementID) {
          document.getElementById('letter-0-0').focus();
        } else {
          document.getElementById(focusElementID).focus();
        }
      }
    })

    if(document.getElementById("letter-0-0")) {
      document.getElementById("letter-0-0").focus();
    }

    await tick();

    if(document.getElementById("submit")) {
      document.getElementById("submit").focus();
    } else if(document.getElementById("letter-0-0")) {
      document.getElementById("letter-0-0").focus();
    }
  });

  let inputs;
  let sentence;
  let sentenceIndex = 1;
  let score;
  let correctAnswers = 0;
  let inputItem = 0;
  let focusElementID;
  let spellChallengeIsComplete = false;

  originalSentenceAsPromise.subscribe(value => {
    inputItem = 0;
    sentence = value;
    inputs = document.getElementsByTagName("input");
    cleanInputs();
   })

  scoreAsPromise.subscribe(value => score = value)

  function cleanInputs() {
    for(var i = 0 ; i < inputs.length ; i ++) {
      inputs[i].removeAttribute('disabled');
      inputs[i].removeAttribute("style");
      inputs[i].value = "";
    }
      return;
  }

  function redirectCallToAction(e) {
    if(e.key.toLowerCase() === "backspace"){
      if(inputItem > 0) {
        unDoLastAction();
      }
    }
    else if(e.key.toLowerCase() === "enter" && this.attributes['type'].value === 'submit') {
      getNextSentence()
    }
    else if(e.key.length === 1 && !spellChallengeIsComplete){
      checkLetter(e, this);
    }
  }

  function unDoLastAction() {
    inputItem --;

    if(inputs[inputItem].hasAttribute("disabled")) {
      inputs[inputItem].removeAttribute("disabled");
      inputs[inputItem].removeAttribute("style");
      correctAnswers --;
    }

    inputs[inputItem].focus();
    focusElementID = inputs[inputItem].attributes['id'].value

    inputs[inputItem].value= "";
    return;
  }

  async function getNextSentence() {
    spellChallengeIsComplete = false;
    correctAnswers = 0;
    sentenceIndex ++;
    score ++;

    if(sentenceIndex <= 10) {
      await UTIL.getSentence(sentenceIndex);
    }

    scoreAsPromise.set(score);
    focusElementID = "letter-0-0";

    return;
  }

  function checkLetter(e, input) {
    const LENGTH = sentence.toString().length;
    let value = input.attributes['data-value'].value;
    inputItem ++;


    if(e.key.toLowerCase() === value.toLowerCase()){
      correctAnswers ++;
      input.setAttribute('disabled', true);
      input.setAttribute('data-success', 'true')
      input.setAttribute('style', "background-color:#4caf50")
      input.value = e.key;
    }

    if(inputItem < inputs.length) {
      inputs[inputItem].focus();
      focusElementID = inputs[inputItem].attributes['id'].value
    }

    if(inputItem === inputs.length) {
      focusElementID = inputs[inputItem - 1].attributes['id'].value
    }

    if (correctAnswers === LENGTH) {
      spellChallengeIsComplete = true;
    }

    return;

  }


</script>
<form id="grid" autocomplete="off">
  {#each sentence as word, i}
    <div class="flex-container">
    {#each word as letter, j}
      <div class="flex-item" >
        <input id="letter-{i}-{j}" class="letter" type="text" data-value="{letter}" value="" maxlength="1" on:keyup="{redirectCallToAction}" >
      </div>
    {#if j === (word.length - 1) && i < (sentence.length - 1) }
      <div class="flex-item">
        <input id="space-{i}" class="space" type="text" data-value=" " maxlength="1" on:keyup="{redirectCallToAction}">
      </div>
    {/if}
    {/each}
    </div>
  {/each}
  {#if spellChallengeIsComplete}
    <div class="flex-item">
      <input id="submit" type="submit" value="Next" on:click="{getNextSentence}" on:keypress|preventDefault="{redirectCallToAction}">
    </div>
  {/if}
</form>

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
  }

  input.letter {
    background-color:  #e1e1e1;
  }

  input:not(submit):focus {
    outline: none;
    color: black;
  }

</style>
