<svelte:options tag="fl-shopping-cart" />

<script>
	import { registerEventListeners } from "./lib/EventListeners";

	let cart = [];
	let viewCart = false;

	$: itemCount = cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
    }, 0);

	const listener = ({ detail }) => {
		console.log(
			`Header heard ITEM_ADDED_TO_CART: ${JSON.stringify(detail)}`
		);
		let newCart = [...cart];
		let item = { ...detail, qty: 1 };
		const existingItem = newCart.find((itm) => itm.name === detail.name);
		if (existingItem) {
			newCart = newCart.filter((itm) => itm.name !== detail.name);
			item.qty = item.qty + existingItem.qty;
		}
		cart = [...newCart, item];
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
			{itemCount} item(s) in shopping cart
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
		<div>
			<strong>Shopping cart</strong>
			{#each cart as item}
				<div>{item.name} <br />{item.qty} x ${item.price}</div>
			{/each}
			<br />
			<button on:click={() => (viewCart = false)}>Close</button>
		</div>
	</div>
{/if}

<style>
	.cartContent {
		padding: 5px 10px;
	}
	.viewCart {
		position: fixed;
		z-index: 1000;
		background: #33333366;
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
		gap: 10px;
	}

	.viewCart > div {
		display: flex;
		flex-direction: column;
		gap: 12px;
		background: white;
		padding: 50px;
		border-radius: 5px;
		min-width: 400px;
	}
</style>
