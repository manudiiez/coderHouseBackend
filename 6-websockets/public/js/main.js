const socket = io()

const form = document.getElementById('form')
const formInputs = document.querySelectorAll('#form input');
const listProducts = document.getElementById('listProducts')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newProduct = {}
    formInputs.forEach(input => {
        newProduct[input.name] = input.value;
    });
    await fetch('/productos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    socket.emit('product:save')
})

socket.on('server:connection', (data) => {
    console.log('server id:', data)
})


socket.on('product:save', (data) => {
    listProducts.innerHTML = ''
    data.map(product => {
        listProducts.innerHTML += `
            <tr>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td><img class="table__img" src=${product.thumbnail} alt=""></td>
            </tr>
        `
    })
})

