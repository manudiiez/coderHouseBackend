
const btn_new_product = document.querySelector('#btn_new_product')
const form_new_product = document.querySelector('#form_new_product')
const form_new_product_inputs = document.querySelectorAll('.form_new_product_input')
const btn__product__add__cart = document.querySelectorAll('.btn__product__add__cart')

btn__product__add__cart.forEach(btn => {
    btn.addEventListener('click', async() => {
        await fetch('/api/shoppingcartproducts', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productId: btn.dataset.id})
        })
        location.reload()
    })
})

btn_new_product.addEventListener('click', async () => {
    const newProduct = {}
    form_new_product_inputs.forEach(input => {
        newProduct[input.name] = input.value;
    });
    await fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    socket.emit('product:save')
})
