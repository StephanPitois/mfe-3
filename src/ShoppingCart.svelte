<svelte:options tag="fl-shopping-cart" />

<script>
	import { registerEventListeners } from "./lib/EventListeners";

	let cart = [];
	let viewCart = false;

	const listener = ({ detail }) => {
		console.log(
			`Header heard ITEM_ADDED_TO_CART: ${JSON.stringify(detail)}`
		);
		cart = [...cart, detail];
	};

	registerEventListeners("App Shell: header", [
		{
			eventType: "ITEM_ADDED_TO_CART",
			listener,
		},
	]);
</script>

<div part="mfeCard">
	<div part="mfeCardTitle">Micro-Frontend</div>
	<div part="mfeCardBody" class="cartContent">
		{#if cart.length}
			{cart.length} item(s) in shopping cart
			<button style="margin-left: 5px;" on:click={() => (viewCart = true)}
				>View</button
			>
		{:else}
			Your shopping cart is empty
		{/if}
	</div>
</div>

{#if viewCart}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="viewCart" on:click={() => (viewCart = false)}>
		{#each cart as item}
			<div>{item.name}</div>
		{/each}
		<br />
		<button on:click={() => (viewCart = false)}>Close</button>
	</div>
{/if}

<style>
	.cartContent {
		padding: 5px 10px;
	}
	.viewCart {
		position: fixed;
		z-index: 1000;
		background: #eee;
		color: #333;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow-y: scroll;
	}
</style>
