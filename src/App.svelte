<script>
	import Sentence from "./components/Sentence.svelte";
	import Instructions from "./components/Instructions.svelte";
	import Score from "./components/Score.svelte";
	import Grid from "./components/Grid.svelte";
	import {scoreAsPromise} from "./stores.js";

	let score;
	scoreAsPromise.subscribe(value => score = value);

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
