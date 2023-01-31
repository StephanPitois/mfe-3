<script>
    import { registerEventListeners } from "./lib/EventListeners";
    import ItemAddedAlert from "./lib/components/ItemAddedAlert.svelte";
    import { tick } from 'svelte';
    import { cart } from "./lib/stores.js";

    let viewAlert = false;
    let alertTimeout = null;
    let lastItemAdded = "---";

    $: itemCount = $cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
    }, 0);

    const listener = async ({ detail }) => {
        console.log(
            `Cart heard ITEM_ADDED_TO_CART: ${JSON.stringify(detail)}`
        );
        let newCart = [...$cart];
        let item = { ...detail, qty: 1 };
        const existingItem = newCart.find((itm) => itm.name === detail.name);
        if (existingItem) {
            newCart = newCart.filter((itm) => itm.name !== detail.name);
            item.qty = item.qty + existingItem.qty;
        }
        $cart = [...newCart, item];

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
        {#if $cart.length}
        <a href="/shopping-cart">{itemCount} item(s) in shopping cart
        </a>
        {:else}
        Your shopping cart is empty
        {/if}
    </div>
</div>

{#if viewAlert}
<div class="alertWrapper">
    <ItemAddedAlert message={`${itemCount} item(s) in shopping cart`} />
</div>
{/if}

<style>
    .cartContent {
        padding: 5px 10px;
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