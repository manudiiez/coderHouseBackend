const socket = io()

const form = document.getElementById('form')
const formInputs = document.querySelectorAll('#form input');
const listProducts = document.getElementById('listProducts')
const logOutButton = document.getElementById('logout');

console.log('main file');


logOutButton.addEventListener('click', async () => {
    socket.emit('logout:exit')
})


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



socket.on('product:save', (data) => {
    listProducts.innerHTML = ''
    data.map(product => {
        listProducts.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.description}</td>
                <td><img class="table__img" src=${product.image} alt=""></td>
            </tr>
        `
    })
})

socket.on('logout:exit', async () => {
    console.log('exit');
    await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.reload();

})
