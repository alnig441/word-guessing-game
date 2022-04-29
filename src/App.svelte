<script>
	import Sentence from "./components/Sentence.svelte";
	import Instructions from "./components/Instructions.svelte";
	import Score from "./components/Score.svelte";
	import Grid from "./components/Grid.svelte";
</script>

<main>
	<Sentence/>
	<Instructions/>
	<Score/>
	<Grid/>
</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
