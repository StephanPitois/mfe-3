<script>
	import { registerEventListeners } from "./lib/EventListeners";
	import { Modal } from "carbon-components-svelte";
	import Icon from "carbon-icons-svelte/lib/ShoppingCart.svelte";
	// import ShoppingCardModal from "./lib/components/ShoppingCardModal.svelte";
	import ItemAddedAlert from "./lib/components/ItemAddedAlert.svelte";
	import { tick } from 'svelte';

	let cart = [];
	let viewCart = false;
	let viewAlert = false;
	let alertTimeout = null;
	let lastItemAdded = "aslkdjasldkjasdl";

	$: itemCount = cart.reduce(function (accumulator, currentValue) {
		return accumulator + currentValue.qty;
	}, 0);

	const listener = async ({ detail }) => {
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
		// viewCart = true;

		lastItemAdded = item;
		viewAlert = true;
		if (alertTimeout) {
			clearTimeout(alertTimeout);
			await tick();
		}
		alertTimeout = setTimeout(() => {
			viewAlert = false;
		}, 2000);
	};

	registerEventListeners("App Shell: header", [
		{
			eventType: "ITEM_ADDED_TO_CART",
			listener,
		},
	]);
</script>

<div class="mfeCard">
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
<!-- 
{#if viewCart}
	<ShoppingCardModal />
{/if} -->

{#if viewAlert}
	<div class="alertWrapper">
		<ItemAddedAlert message={`${itemCount} item(s) in shopping cart`} />
	</div>
{/if}

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

	.alertWrapper {
		position: fixed;
		bottom: 10px;
		right: 10px;
		max-width: 80%;
		z-index: 1000;
	}
</style>
