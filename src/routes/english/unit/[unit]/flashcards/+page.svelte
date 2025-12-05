<script lang="ts">
	// Reaktivní stavy pro kartičky
	let current = $state(0);
	let showAnswer = $state(false);

	// Načítání dat z API
	let cards = $state<{ question: string; answer: string }[]>([]);

	$effect(() => {
		(async () => {
			const res = await fetch('/api/flashcards');
			if (res.ok) {
				cards = await res.json();
			} else {
				console.error('Error loading flashcards:', await res.json());
			}
		})();
	});

	// Funkce pro otočení kartičky
	function flip() {
		showAnswer = !showAnswer;
	}

	// Funkce pro přechod na další kartičku
	function next() {
		if (current < cards.length - 1) {
			current += 1;
			showAnswer = false;
		}
	}

	// Funkce pro přechod na předchozí kartičku
	function prev() {
		if (current > 0) {
			current -= 1;
			showAnswer = false;
		}
	}
</script>

{#if cards.length === 0}
	<p>Loading flashcards...</p>
<!-- svelte-ignore a11y_click_events_have_key_events -->
{:else}
	<!-- Zobrazení aktuální kartičky -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="flashcard" onclick={flip}>
		<div class:flipped={showAnswer}>
			<div class="front">
				<p>{cards[current].question}</p>
			</div>

			<div class="back">
				<p>{cards[current].answer}</p>
			</div>
		</div>
	</div>

	<!-- Ovládací tlačítka pro přechod mezi kartičkami -->
	<div class="controls">
		<button onclick={prev} disabled={current === 0}>◀︎</button>
		<button onclick={next} disabled={current === cards.length - 1}>▶︎</button>
	</div>
{/if}

<style>
	.flashcard {
		width: 320px;
		height: 200px;
		margin: 20px auto;
		perspective: 1000px;
		cursor: pointer;
	}

	.flashcard > div {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.front,
	.back {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		padding: 20px;
		border-radius: 12px;
		backface-visibility: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.front {
		background: #ffffff;
	}

	.back {
		background: #3b82f6;
		color: white;
		transform: rotateY(180deg);
	}

	.controls {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 10px;
	}

	button {
		padding: 8px 14px;
		border: none;
		background: #3b82f6;
		color: white;
		border-radius: 8px;
		cursor: pointer;
	}

	button:disabled {
		background: #999;
		cursor: not-allowed;
	}
</style>
