
const formChat = document.getElementById('formChat')
const formInputsChat = document.querySelectorAll('#formChat input');
const chatContainer = document.getElementById('chatContainer')


formChat.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newChat = {}
    formInputsChat.forEach(input => {
        newChat[input.name] = input.value;
    });
    const date = new Date()

    newChat['date'] = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`
    console.log(newChat);
    await fetch('/chat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newChat)
    })
    socket.emit('chat:message')
})



socket.on('chat:message', (data) => {
    chatContainer.innerHTML = ''
    data.map(message => {
        chatContainer.innerHTML += `
            <div class="chatMessage">
                <div>
                    <p class="chatEmail">${message.email}</p>
                    <p class="chatDate">${message.date}</p>
                </div>
                <p class="chatText">${message.text}</p>
            </div>
        `
    })
})