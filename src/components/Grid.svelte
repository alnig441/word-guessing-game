<script>
  import { API } from "../app_modules/api";
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

  /* MAINTAIN FOCUS ON CURRENT GRID INPUT WHEN */
  beforeUpdate(async () => {
    /* A:  CLICKING OCCURS OUTSIDE INPUT */
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

    await tick();

    /* B: GRID IS COMPLETE OR RELOADS */
    if(document.getElementById("submit")) {
      document.getElementById("submit").focus();
    } else if(document.getElementById("letter-0-0")) {
      document.getElementById("letter-0-0").focus();
    }
  });

  /* REACTIVELY BUILD GRID VIEW AND ASSIGN SCORE */
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


  /* RESET GRID */
  function resetGrid() {
    for(var i = 0, l = gridInputs.length ; i < l ; i ++) {
      gridInputs[i].removeAttribute('disabled');
      gridInputs[i].removeAttribute("style");
      gridInputs[i].value = "";
    }
      return;
  }


  /* CTA DISPATCHER */
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


  /* UNDO CTA */
  function unDoLastAction(input) {
    /* RESET CURRENT INPUT IF INPUT SELECTED AFTER GRID COMPLETION */
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

    /* UNDO PREVIOUS INPUT */
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


  /* GET NEXT SENTENCE AND UPDATE GAME SCORE CTA */
  async function getNextSentence() {
    spellChallengeIsComplete = false;
    coorectInputs = 0;
    nextSentenceIndex ++;
    score ++;

    if(nextSentenceIndex <= 10) {
      await API.get(nextSentenceIndex);
    }

    scoreAsPromise.set(score);
    focusInputID = "letter-0-0";

    return;
  }


  /* CHECK CURRENT INPUT CTA */
  function checkLetter(e, input) {
    const LENGTH = correctSentence.toString().length;
    let value = input.attributes['data-value'].value;
    currentGridInputItem ++;

    /* MARK CORRECT INPUT */
    if(e.key.toLowerCase() === value.toLowerCase()){
      coorectInputs ++;
      input.setAttribute('disabled', true);
      input.setAttribute('data-success', 'true')
      input.setAttribute('style', "background-color:#4caf50")
      input.value = e.key;
    }

    /* MOVE FOCUS TO NEXT INPUT */
    if(currentGridInputItem < gridInputs.length) {
      gridInputs[currentGridInputItem].focus();
      focusInputID = gridInputs[currentGridInputItem].attributes['id'].value
    }

    /* MARK GRID COMPLETE */
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
