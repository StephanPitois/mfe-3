<script>
    import { registerEventListeners } from "./lib/EventListeners";
    import { cart } from "./lib/stores.js";

    $: itemCount = $cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
    }, 0);

    const listener = async (evt) => {
        console.log(`ShoppingCart received ${evt.type} ${JSON.stringify(evt.detail)}`);
        const product = evt.detail;
        let newCart = [...$cart];
        let item = { ...product, qty: 1 };
        const existingItem = newCart.find((itm) => itm.name === product.name);
        if (existingItem) {
            newCart = newCart.filter((itm) => itm.name !== product.name);
            item.qty = item.qty + existingItem.qty;
        }
        $cart = [...newCart, item];
    };

    registerEventListeners("ShoppingCart", [
        {
            eventType: "product:add-to-cart",
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
