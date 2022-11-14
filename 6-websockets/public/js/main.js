const socket = io()


socket.on('server:connection', (data) => {
    console.log('server id:', data)
})