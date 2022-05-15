<script>
  import { API } from "../app_modules/api";
  import { correctSentenceAsPromise, scoreAsPromise } from "../stores.js";
  import { beforeUpdate, tick } from 'svelte';
  import sanitize from "../directives/sanitize";

  let gridInputs;
  let correctSentence;
  let nextSentenceIndex = 1;
  let correctInputs = 0;
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

  /* REACTIVELY BUILD GRID VIEW */
  correctSentenceAsPromise.subscribe(buildNewGrid);

  function buildNewGrid(value) {
   currentGridInputItem = 0;
   correctSentence = value;
   gridInputs = document.getElementsByTagName("input");
   resetGrid();
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
      if(currentGridInputItem === gridInputs.length) {
        this.setAttribute('disabled', true);
      }

      if(currentGridInputItem > 0) {
        unDoLastAction(this);
      }
    }
    else if(e.key.toLowerCase() === "enter" && this.attributes['type'].value === 'submit') {
      getNextSentence()
    }
    else if(e.key.length === 1 && !spellChallengeIsComplete){
      this.value = e.key;
      checkLetter(this);
    }
  }


  /* UNDO CTA */
  function unDoLastAction(input) {
    /* RESET CURRENT INPUT IF INPUT SELECTED AFTER GRID COMPLETION */
    if(input.attributes['id'].value !== focusInputID) {
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
      correctInputs --;
    }

    gridInputs[currentGridInputItem].focus();
    focusInputID = gridInputs[currentGridInputItem].attributes['id'].value

    gridInputs[currentGridInputItem].value= "";

    return;
  }


  /* GET NEXT SENTENCE AND UPDATE GAME SCORE CTA */
  function getNextSentence() {
    spellChallengeIsComplete = false;
    correctInputs = 0;
    nextSentenceIndex ++;

    if(nextSentenceIndex <= 10) {
      API.get(nextSentenceIndex);
    }

    scoreAsPromise.update(value => value + 1);
    focusInputID = "letter-0-0";

    return;
  }


  /* CHECK CURRENT INPUT CTA */
  function checkLetter(input) {
    const LENGTH = correctSentence.toString().length;
    const correctValue = input.attributes['data-value'].value;
    currentGridInputItem ++;
    const doNotDisable = (currentGridInputItem === LENGTH && correctInputs < LENGTH - 1 );

    /* MARK CORRECT INPUT */
    if(input.value.toLowerCase() === correctValue.toLowerCase()){
      correctInputs ++;
      input.setAttribute('data-success', 'true');
      input.setAttribute('style', "background-color:#4caf50");

      if(!doNotDisable) {
        input.setAttribute('disabled', true);
      }

    }

    /* MOVE FOCUS TO NEXT INPUT */
    if(currentGridInputItem < gridInputs.length) {
      gridInputs[currentGridInputItem].focus();
      focusInputID = gridInputs[currentGridInputItem].attributes['id'].value
    } else {
      document.getElementById('grid').focus();
    }

    /* MARK GRID COMPLETE */
    if (correctInputs === LENGTH) {
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
        <input id="letter-{i}-{j}" class="letter" type="text" data-value="{letter}" value="" pattern="[a-zA-Z0-9]+" maxlength="1" on:input={sanitize} on:keyup|preventDefault="{redirectCallToAction}" >
      </div>
    {#if j === (word.length - 1) && i < (correctSentence.length - 1) }
      <div class="flex-item">
        <input id="space-{i}" class="space" type="text" data-value=" " pattern="[a-zA-Z0-9]+" maxlength="1" on:input="{sanitize}" on:keyup|preventDefault="{redirectCallToAction}">
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
