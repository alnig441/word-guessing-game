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
	main {
		font-family: Open Sans;
		background-color:  #e1e1e1;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.container {
		/* width: 250px; */
		color: teal;
		margin: auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
