<script>
    import { registerEventListeners } from "./lib/EventListeners";
    import { cart } from "./lib/stores.js";

    $: itemCount = $cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
    }, 0);

    const listener = async ({ detail }) => {
        console.log(`Cart heard ITEM_ADDED_TO_CART: ${JSON.stringify(detail)}`);
        let newCart = [...$cart];
        let item = { ...detail, qty: 1 };
        const existingItem = newCart.find((itm) => itm.name === detail.name);
        if (existingItem) {
            newCart = newCart.filter((itm) => itm.name !== detail.name);
            item.qty = item.qty + existingItem.qty;
        }
        $cart = [...newCart, item];
    };

    registerEventListeners("App Shell: header", [
        {
            eventType: "ITEM_ADDED_TO_CART",
            listener,
        },
    ]);
</script>

<div class="cartContent">
    {#if $cart.length}
        <a href="/shopping-cart">{itemCount} item(s) in shopping cart </a>
    {:else}
        <a href="/shopping-cart">Your shopping cart is empty</a>
    {/if}
</div>

<style>
    .cartContent {
        padding: 5px 10px;
    }
</style>
