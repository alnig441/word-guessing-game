<script>
	import { onMount } from "svelte";
	import { UTIL } from "./app_modules/UTIL.js";

	let counter = 1;
	const URL = `https://api.hatchways.io/assessment/sentences/${counter}`;

	let words;

	onMount(async function() {
		words = await UTIL.getSentence(URL);
	})

</script>

<main>
	<div id="scrambled-word">{ words }</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
