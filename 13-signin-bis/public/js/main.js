const socket = io()

const logOutButton = document.getElementById('logout');


logOutButton.addEventListener('click', async () => {
    // socket.emit('logout:exit')
    const res = await fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: 'error god', url: '/'})
    })
    const response = await res.json()
    if( response.data ){
        location.href = '/error'
    }else{
        location.href = '/login'
    }
})

