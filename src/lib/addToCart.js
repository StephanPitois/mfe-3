function getUpdatedCart(cart, product, qty) {
    let newCart = [...cart];
    let item = { ...product, qty: qty };
    const existingItem = newCart.find((itm) => itm.id === product.id);
    if (existingItem) {
        newCart = newCart.filter((itm) => itm.id !== product.id);
        item.qty = Math.max(1, item.qty + existingItem.qty);
    }
    let result = [...newCart, item];
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
}

function removeItem(cart, product) {
    let result = cart.filter((itm) => itm.id !== product.id);
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
}

export { getUpdatedCart, removeItem }