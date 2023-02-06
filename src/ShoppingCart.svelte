<script>
    import { registerEventListeners } from "./lib/EventListeners";
    import { cart } from "./lib/stores.js";
    import { getUpdatedCart } from "./lib/addToCart";

    $: itemCount = $cart.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.qty;
    }, 0);

    const listener = async (evt) => {
        console.log(
            `ShoppingCart received ${evt.type} ${JSON.stringify(evt.detail)}`
        );
        const product = evt.detail;
        $cart = getUpdatedCart($cart, product, 1);
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
