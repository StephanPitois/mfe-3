<script>
    import { cart } from "./lib/stores.js";
</script>

<div class="mfeCard">
    <div class="mfeCardBody">
        <main class="mfeMain">
            <h1 class="mfeMainH1">Shopping Cart</h1>
            {#each $cart as item}
            <div class="pb-10">
                {item.name} <br />{item.qty} x <strong>${item.price}</strong>
            </div>
            {/each}
            <p>
                Components <code>remote_app_3.ShoppingCart</code> and <code>remote_app_3.ShoppingCartDetails</code>
                show that it is possible to define several micro-frontends in the same bundle.
            </p>
            <p>
                But there is a bug at the moment where if you load the app from the shopping cart page, the bundle
                is included twice, and each instance has its own store, and the $cart store is not shared. Solution:
                change buncle include code to never include more than once..
            </p>
        </main>
    </div>
</div>

<style>
</style>