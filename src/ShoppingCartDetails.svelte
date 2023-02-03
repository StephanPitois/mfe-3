<script>
    import { cart } from "./lib/stores.js";
</script>

<main>
    <h1>Shopping Cart</h1>
    <div>
        {#each $cart as item}
            <div class="div-item no-flex">
                {item.name} <br />{item.qty} x <strong>${item.price}</strong>
            </div>
        {/each}
    </div>
    <p>
        Components <code>remote_app_3.ShoppingCart</code> and
        <code>remote_app_3.ShoppingCartDetails</code>
        show that it is possible to define several micro-frontends in the same bundle.
    </p>
</main>

<style>
    .div-item {
        padding-bottom: 2rem;
    }
</style>