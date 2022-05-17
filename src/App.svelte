<script>
	import Sentence from "./components/Sentence.svelte";
	import Instructions from "./components/Instructions.svelte";
	import Score from "./components/Score.svelte";
	import Grid from "./components/Grid.svelte";
	import { scoreAsPromise, scrambledSentenceAsPromise } from "./stores.js";
	import init from './app_modules/initialize.js';
	import { onMount } from 'svelte';

	let score;

	onMount(() => {
		init()
	})

	scoreAsPromise.subscribe(assignScore);

	function assignScore(value) {
		score = value;
	}

</script>

<main>
{#if score === 10 }
		<h1> You win! </h1>
{:else}
	<Sentence/>
	<Instructions/>
	<Score/>
	<Grid/>
{/if}
</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
