const btn_delete_cart = document.querySelectorAll('.carrito__btn__delete')
const btn__delete__cart__all = document.querySelector('.carrito__btn__delete__all')
const carrito__btn__buy = document.querySelector('.carrito__btn__buy')

const deleteCartProduct = async(id) => {
    console.log(id);
    await fetch('/api/shoppingcartproducts/'+ id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.reload()
}

btn_delete_cart.forEach(btn => {
    btn.addEventListener('click', () => {
        deleteCartProduct(btn.dataset.id)
    })
})

btn__delete__cart__all.addEventListener('click', async() => {
    await fetch('/api/shoppingcartproducts', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.reload()
})

carrito__btn__buy.addEventListener('click', async() => {
    await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.href = '/'
})