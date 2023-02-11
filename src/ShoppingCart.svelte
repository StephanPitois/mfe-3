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

<div class="cartContent flex-row gap-5">
    <img
        style="width:24px; height: 24px"
        alt="GitHub"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM3ZTQxODQiIGQ9Ik0xNyAxOGMtMS4xMSAwLTIgLjg5LTIgMmEyIDIgMCAwIDAgMiAyYTIgMiAwIDAgMCAyLTJhMiAyIDAgMCAwLTItMk0xIDJ2MmgybDMuNiA3LjU5bC0xLjM2IDIuNDVjLS4xNS4yOC0uMjQuNjEtLjI0Ljk2YTIgMiAwIDAgMCAyIDJoMTJ2LTJINy40MmEuMjUuMjUgMCAwIDEtLjI1LS4yNWMwLS4wNS4wMS0uMDkuMDMtLjEyTDguMSAxM2g3LjQ1Yy43NSAwIDEuNDEtLjQyIDEuNzUtMS4wM2wzLjU4LTYuNDdjLjA3LS4xNi4xMi0uMzMuMTItLjVhMSAxIDAgMCAwLTEtMUg1LjIxbC0uOTQtMk03IDE4Yy0xLjExIDAtMiAuODktMiAyYTIgMiAwIDAgMCAyIDJhMiAyIDAgMCAwIDItMmEyIDIgMCAwIDAtMi0yWiIvPjwvc3ZnPg=="
    />
    {#if $cart.length}
        <a href="/shopping-cart">{itemCount} item{itemCount === 1
            ? ""
            : "s"} in shopping cart </a>
    {:else}
        <a href="/shopping-cart">Your shopping cart is empty</a>
    {/if}
</div>

<style>
    .cartContent {
        /* padding: 5px 10px; */
    }
</style>
