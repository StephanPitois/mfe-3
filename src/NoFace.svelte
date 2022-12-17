<svelte:options tag="fl-noface" />

<script>
</script>

<div class="mfeCard">
	<div class="mfeCardTitle">Micro-Frontend</div>
	<div class="mfeCardBody">
		<main class="mfeMain">
			<h1 class="mfeMainH1">MFE 3: No-Face (顔無し, Kaonashi)</h1>
			<img
				class="mfeMainImg"
				src="/img/no-face.jpeg"
				alt="No-Face from Spirited Away"
			/>
		</main>
	</div>
</div>

<style>
	/* 
	@import url seems to be an acceptable way to share global styles.
	@import seems to only import the style once, even when called
	by several components on the same page. And from what I've seen
	so far, the imported styles don't seem to be inlined in the 
	generated web component, which is good as that prevents
	duplication and bloat. global.css is defined in the app shell.
	*/
	@import "/global.css";
</style>
