<script>
    import { cart } from "./lib/stores.js";
    import { getUpdatedCart } from "./lib/addToCart";
</script>

<main>
    <h1>Shopping Cart</h1>
    <div class="gap-6 w-full lg:w-1/2">
        {#if $cart.length}
            {#each $cart as item}
                <article class="flex flex-row gap-5 justify-between">
                    <div>{item.name}</div>
                    <div class="gap-5" style="align-items: end;">
                        <div class="no-flex">
                            Total price: <strong
                                >${item.qty * item.price}</strong
                            >
                        </div>
                        <div class="flex flex-row qty">
                            <div>Quantity:</div>
                            <button
                                class="secondary outline"
                                on:click={() =>
                                    ($cart = getUpdatedCart($cart, item, -1))}
                                >-</button
                            >
                            <div>
                                {item.qty}
                            </div>
                            <button
                                class="secondary outline"
                                on:click={() =>
                                    ($cart = getUpdatedCart($cart, item, 1))}
                                >+</button
                            >
                        </div>
                    </div>
                </article>
            {/each}
        {:else}
            <div class="div-item no-flex">Your shopping cart is empty</div>
        {/if}
    </div>
    <!-- <p>
        Components <code>remote_app_3.ShoppingCart</code> and
        <code>remote_app_3.ShoppingCartDetails</code>
        show that it is possible to define several micro-frontends in the same bundle.
    </p> -->
</main>

<style>
    article {
        margin: 0;
    }
    button {
        width: 2rem;
    }
    .qty {
        gap: 0.5rem;
        align-items: baseline;
    }
</style>
