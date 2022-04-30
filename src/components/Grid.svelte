<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { originalSentenceAsPromise, scoreAsPromise } from "../stores.js";
  import { beforeUpdate, tick } from 'svelte';

  beforeUpdate(async () => {
    if(document.getElementById("flex-item-0-0")) {
      document.getElementById("flex-item-0-0").focus();
    }
    await tick();
    if(document.getElementById("submit")) {
      document.getElementById("submit").focus();
    } else if(document.getElementById("flex-item-0-0")) {
      document.getElementById("flex-item-0-0").focus();
    }
  });

  let inputs;
  let sentence;
  let sentenceIndex = 1;
  let score;
  let hide = 'true';
  let correctAnswers = 0;
  let inputItem = 0;

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
      inputItem = resetInputItem();
      goBack();
    }
    else if(e.key.toLowerCase() === "enter" && this.attributes['type'].value === 'submit') {
      getNextSentence()
    }
    else if(e.key.length === 1){
      checkLetter(e, this);
    }
  }

  function goBack() {
    inputs[inputItem].focus();
    inputs[inputItem].value= "";
    return;
  }

  function resetInputItem() {

    let indices = [];
    let newIndex;

    for(var i = 0 ; i < inputItem ; i ++) {
      if(!inputs[i].hasAttribute("disabled")) {
        indices.push(i);
      }
    }

    newIndex = indices.length > 0 ? indices[indices.length - 1] : inputItem

    return newIndex;
  }

  async function getNextSentence() {
    hide = true;
    correctAnswers = 0;
    sentenceIndex ++;
    score ++;

    if(sentenceIndex <= 10) {
      await UTIL.getSentence(sentenceIndex);
    }

    scoreAsPromise.set(score);

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
    }

    if (correctAnswers === LENGTH) {
      hide = 'false';
    }

    return;

  }


</script>
<form id="grid" autocomplete="off">
  {#each sentence as word, i}
    <div class="flex-container">
    {#each word as letter, j}
      <div class="flex-item" >
        <input id="flex-item-{i}-{j}" class="letter" type="text" data-value="{letter}" value="" maxlength="1" on:keyup="{redirectCallToAction}" >
      </div>
    {#if j === (word.length - 1) && i < (sentence.length - 1) }
      <div class="flex-item">
        <input class="space" type="text" data-value=" " maxlength="1" on:keyup="{redirectCallToAction}">
      </div>
    {/if}
    {/each}
    </div>
  {/each}
  {#if hide === 'false'}
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
  }

  input.letter {
    background-color:  #e1e1e1;
  }

  input:not(submit):focus {
    outline: none;
    color: black;
  }

</style>
