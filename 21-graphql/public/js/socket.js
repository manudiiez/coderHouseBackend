const socket = io()
const product_list_container = document.querySelector('#product_list_container')

socket.on('product:save', (data) => {
    console.log('producto recivido');
    product_list_container.innerHTML = ''
    data.map(product => {

        product_list_container.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">
                        ${product.name}
                    </div>
                    ${product.description}
                        <p class="mt-2 text-success">
                            ${product.price}
                        </p>
                </div>
                <div class="col-md-4">
                    <img src=${product.image} class="img-fluid rounded-start" alt="...">
                </div>
            </li>
        `
    })
})

