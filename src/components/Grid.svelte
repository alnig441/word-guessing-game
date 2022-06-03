<script>
  import { API } from "../app_modules/api";
  import { nextSentenceAsPromise } from "../stores.js";
  import { beforeUpdate, tick } from 'svelte';
  import sanitize from "../directives/sanitize";

  export let sentence;

  let gridInputs;
  let words;
  let currentGridInputItem = 0;
  let focusInputID;
  let spellChallengeIsComplete = false;

  /* MAINTAIN FOCUS ON CURRENT GRID INPUT WHEN */
  beforeUpdate(async () => {
    /* TEST if this sentence differs from previous, then clear grid */
    if(words && (sentence.split(' ')[0] !== words[0])) {
      gridInputs = document.getElementsByTagName('input');
      resetGrid()
    }
    /* Build new grid from sentence */
    if(sentence) {
      buildNewGrid(sentence);
    }
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

  /* BUILD GRID VIEW */
  function buildNewGrid(sentence) {
    if(sentence) {
     currentGridInputItem = 0;
     words = sentence.trim().split(' ');
     gridInputs = document.getElementsByTagName("input");
    }
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
      this.value = e.key;
      checkLetter(this);
    }
  }


  /* UNDO CTA */
  function unDoLastAction(input) {
    /* TEST IF IS LAST INPUT */
    if(input.attributes['id'].value === gridInputs[gridInputs.length -1].attributes['id'].value) {
      input.removeAttribute('style');
    }
    /* UNDO PREVIOUS INPUT */
    currentGridInputItem --;
    if(gridInputs[currentGridInputItem].hasAttribute("disabled")) {
      gridInputs[currentGridInputItem].removeAttribute("disabled");
      gridInputs[currentGridInputItem].removeAttribute("style");
    }

    gridInputs[currentGridInputItem].focus();
    focusInputID = gridInputs[currentGridInputItem].attributes['id'].value

    gridInputs[currentGridInputItem].value= "";

    return;
  }


  /* GET NEXT SENTENCE AND UPDATE GAME SCORE CTA */
  function getNextSentence() {
    spellChallengeIsComplete = false;
    nextSentenceAsPromise.update();
    focusInputID = "letter-0-0";
    return;
  }


  /* CHECK CURRENT INPUT CTA */
  function checkLetter(input) {
    const isLastInput = (input.attributes['id'].value === gridInputs[gridInputs.length -1].attributes['id'].value);
    const LENGTH = sentence.length;
    const correctValue = sentence[currentGridInputItem];
    currentGridInputItem ++;

    /* MARK CORRECT INPUT */
    if(input.value.toLowerCase() === correctValue.toLowerCase()){
      input.setAttribute('data-success', 'true');
      input.setAttribute('style', "background-color:#4caf50");
      input.setAttribute('disabled', true);
    }

    /* MOVE FOCUS TO NEXT INPUT */
    if(currentGridInputItem < gridInputs.length) {
      gridInputs[currentGridInputItem].focus();
      focusInputID = gridInputs[currentGridInputItem].attributes['id'].value
    } else {
      document.getElementById('grid').focus();
    }

    /* MARK GRID COMPLETE */
    if (isLastInput) {
      let correctInputs = 0;
      for (var index in gridInputs) {
        const attr = gridInputs[index].attributes;
        if(attr && Object.hasOwn(attr,'disabled')) {
          correctInputs ++;
        }
      }
      if (correctInputs === LENGTH) {
        spellChallengeIsComplete = true;
      } else {
        input.removeAttribute("disabled");
        input.focus();
      }
    }

    return;
  }


</script>
<form id="grid" autocomplete="off">
  {#if words}
    {#each words as word, i}
      <div class="flex-container">
      {#each word as letter, j}
        <div class="flex-item" >
          <input id="letter-{i}-{j}" class="letter" type="text" value="" pattern="[a-zA-Z0-9]+" maxlength="1" on:input={sanitize} on:keyup|preventDefault="{redirectCallToAction}" >
        </div>
      {#if j === (word.length - 1) && i < (words.length - 1) }
        <div class="flex-item">
          <input id="space-{i}" class="space" type="text" pattern="[a-zA-Z0-9]+" maxlength="1" on:input="{sanitize}" on:keyup|preventDefault="{redirectCallToAction}">
        </div>
      {/if}
      {/each}
      </div>
    {/each}
  {/if}
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
