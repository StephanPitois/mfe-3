<script>
    import { cart } from "./lib/stores.js";
    import { getUpdatedCart, removeItem } from "./lib/addToCart";
</script>

<main>
    <h1>Shopping Cart</h1>
    <div class="gap-6 w-full lg:w-1/2">
        {#if $cart.length}
            {#each $cart as item}
                <article class="flex flex-col gap-5 justify-between">
                    <div class="flex-row gap-5 justify-between">
                        <strong>{item.name}</strong>
                        <div class="gap-5" style="align-items: end;">
                            <div class="no-flex" style="white-space: nowrap">
                                Subtotal ({item.qty} item{item.qty === 1 ? "" : "s"}):
                                <strong>${item.qty * item.price}</strong>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row gap-5" style="align-items: center;">
                        <div class="flex flex-row qty">
                            <div>Qty:</div>
                            <button
                                class="round secondary"
                                on:click={() => ($cart = getUpdatedCart($cart, item, -1))}>-</button>
                            <div>
                                {item.qty}
                            </div>
                            <button
                                class="round secondary"
                                on:click={() => ($cart = getUpdatedCart($cart, item, 1))}>+</button>
                        </div>
                        <button
                            class="---secondary ---outline" style="font-size: small; width: auto;"
                            on:click={() => ($cart = removeItem($cart, item))}>Delete</button>
                    </div>
                </article>
            {/each}
            <!-- <button class="secondary outline" on:click={() => ($cart = [])}
                >Empty cart</button
            > -->
        {:else}
            <article class="div-item no-flex">Your shopping cart is empty</article>
        {/if}
    </div>
    <!-- <p>
        Components <code>remote_app_3.ShoppingCart</code> and
        <code>remote_app_3.ShoppingCartDetails</code>
        show that it is possible to define several micro-frontends in the same bundle.
    </p> -->
</main>

<style>
    /* article {
        margin: 0;
        padding: 1rem;
    } */
    button {
        width: 111px;
        margin: 0;
    }
    button.round {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        padding: 0 0;
        line-height: 22px;
        margin: 0;
    }
    .qty {
        gap: 0.5rem;
        align-items: baseline;
    }
</style>
