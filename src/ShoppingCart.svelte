<script>
	import { registerEventListeners } from "./lib/EventListeners";
	import { Modal } from "carbon-components-svelte";
	import Icon from "carbon-icons-svelte/lib/ShoppingCart.svelte";

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
		viewCart = true;
	};

	registerEventListeners("App Shell: header", [
		{
			eventType: "ITEM_ADDED_TO_CART",
			listener,
		},
	]);
</script>

<div class="mfeCard">
	<div class="mfeCardTitle">Micro-Frontend</div>
	<div class="mfeCardBody cartContent flex-row">
		<Icon />
		{#if cart.length}
			<a
				href="#shopping-cart"
				style="margin-left: 5px;"
				on:click={() => (viewCart = true)}
				>{itemCount} item(s) in shopping cart
			</a>
		{:else}
			Your shopping cart is empty
		{/if}
	</div>
</div>

<Modal
	passiveModal
	bind:open={viewCart}
	modalHeading="Shopping Cart"
	on:open
	on:close
>
	<div class="flex-column">
		{#each cart as item}
			<div>
				{item.name} <br />{item.qty} x <strong>${item.price}</strong>
			</div>
		{/each}
	</div>
</Modal>

<style>
	.cartContent {
		padding: 5px 10px;
	}

	a {
		color: #fff;
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 25px;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
		align-items: center;
	}
</style>
