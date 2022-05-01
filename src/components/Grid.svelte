<script>
  import { UTIL } from "../app_modules/UTIL.js";
  import { correctSentenceAsPromise, scoreAsPromise } from "../stores.js";
  import { beforeUpdate, tick } from 'svelte';

  let gridInputs;
  let correctSentence;
  let nextSentenceIndex = 1;
  let score;
  let coorectInputs = 0;
  let currentGridInputItem = 0;
  let focusInputID;
  let spellChallengeIsComplete = false;

  beforeUpdate(async () => {
    document.getElementById("body").addEventListener("click", (e) => {
      e.preventDefault();
      if(!spellChallengeIsComplete) {
        if(!focusInputID) {
          document.getElementById('letter-0-0').focus();
        } else {
          document.getElementById(focusInputID).focus();
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

  correctSentenceAsPromise.subscribe(buildNewGrid);
  scoreAsPromise.subscribe(assignScore);


  function buildNewGrid(value) {
   currentGridInputItem = 0;
   correctSentence = value;
   gridInputs = document.getElementsByTagName("input");
   resetGrid();
  }

  function assignScore(value) {
    score = value;
  }


  function resetGrid() {
    for(var i = 0 ; i < gridInputs.length ; i ++) {
      gridInputs[i].removeAttribute('disabled');
      gridInputs[i].removeAttribute("style");
      gridInputs[i].value = "";
    }
      return;
  }

  function redirectCallToAction(e) {
    if(e.key.toLowerCase() === "backspace"){
      if(currentGridInputItem > 0) {
        unDoLastAction(this);
      }
    }
    else if(e.key.toLowerCase() === "enter" && this.attributes['type'].value === 'submit') {
      getNextSentence()
    }
    else if(e.key.length === 1 && !spellChallengeIsComplete){
      checkLetter(e, this);
    }
  }

  function unDoLastAction(input) {

    if(input.attributes['id'].value != focusInputID) {
      let i = 0;

      while(i < gridInputs.length) {
        if(gridInputs[i].attributes['id'].value === input.attributes['id'].value) {
          currentGridInputItem = i;
          break;
        }
        i++;
      }
    }

    currentGridInputItem --;

    if(gridInputs[currentGridInputItem].hasAttribute("disabled")) {
      gridInputs[currentGridInputItem].removeAttribute("disabled");
      gridInputs[currentGridInputItem].removeAttribute("style");
      coorectInputs --;
    }

    gridInputs[currentGridInputItem].focus();
    focusInputID = gridInputs[currentGridInputItem].attributes['id'].value

    gridInputs[currentGridInputItem].value= "";

    return;
  }

  async function getNextSentence() {
    spellChallengeIsComplete = false;
    coorectInputs = 0;
    nextSentenceIndex ++;
    score ++;

    if(nextSentenceIndex <= 10) {
      await UTIL.getSentence(nextSentenceIndex);
    }

    scoreAsPromise.set(score);
    focusInputID = "letter-0-0";

    return;
  }

  function checkLetter(e, input) {
    const LENGTH = correctSentence.toString().length;
    let value = input.attributes['data-value'].value;
    currentGridInputItem ++;


    if(e.key.toLowerCase() === value.toLowerCase()){
      coorectInputs ++;
      input.setAttribute('disabled', true);
      input.setAttribute('data-success', 'true')
      input.setAttribute('style', "background-color:#4caf50")
      input.value = e.key;
    }

    if(currentGridInputItem < gridInputs.length) {
      gridInputs[currentGridInputItem].focus();
      focusInputID = gridInputs[currentGridInputItem].attributes['id'].value
    }

    if(currentGridInputItem === gridInputs.length) {
      focusInputID = gridInputs[currentGridInputItem - 1].attributes['id'].value
    }

    if (coorectInputs === LENGTH) {
      spellChallengeIsComplete = true;
    }

    return;

  }


</script>
<form id="grid" autocomplete="off">
  {#each correctSentence as word, i}
    <div class="flex-container">
    {#each word as letter, j}
      <div class="flex-item" >
        <input id="letter-{i}-{j}" class="letter" type="text" data-value="{letter}" value="" maxlength="1" on:keyup="{redirectCallToAction}" >
      </div>
    {#if j === (word.length - 1) && i < (correctSentence.length - 1) }
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
