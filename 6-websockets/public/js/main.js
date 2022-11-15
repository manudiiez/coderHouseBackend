const socket = io()

const form = document.getElementById('form')

form.addEventListener('submit', async(e) => {
    e.preventDefault()
    await fetch('/productos',{
        method: 'POST',
        body: form
    })
    // action="/productos" method="post"
})

socket.on('server:connection', (data) => {
    console.log('server id:', data)
})


