<script>
	import Sentence from "./components/Sentence.svelte";
	import Instructions from "./components/Instructions.svelte";
	import Score from "./components/Score.svelte";
	import Grid from "./components/Grid.svelte";
	import { sentencesAsPromise, nextSentenceAsPromise, correctSentenceAsPromise } from "./stores.js";
	import { onMount } from 'svelte';
	import init from './app_modules/initialize';

	// let score = $nextSentenceAsPromise;
	// let sentences = $sentencesAsPromise;
	// let sentence = $correctSentenceAsPromise;
	let score, sentence, sentences;

	onMount(() => {
		init()
			.then(res => {
				sentencesAsPromise.set(res);
			})
	})

	nextSentenceAsPromise.subscribe(assignScore)
	correctSentenceAsPromise.subscribe(assignSentence);

	function assignSentence(value) {
		sentence = value;
	}

	function assignScore(value) {
		score = value;
	}


</script>

<main>
{#if score === 10 }
		<h1> You win! </h1>
{:else}
	<Sentence sentence={sentence}/>
	<Instructions/>
	<Score score={score}/>
	<Grid sentence={sentence}/>
{/if}
</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
