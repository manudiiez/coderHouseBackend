
const btn_new_product = document.querySelector('#btn_new_product')
const form_new_product = document.querySelector('#form_new_product')
const form_new_product_inputs = document.querySelectorAll('.form_new_product_input')

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
