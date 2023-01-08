
const formChat = document.getElementById('formChat')
const formInputsChat = document.querySelectorAll('#formChat input');
const chatContainer = document.getElementById('chatContainer')


formChat.addEventListener('submit', async (e) => {
    e.preventDefault()
    const date = new Date()
    const newChat = {
        author: {
            id: formInputsChat[0].value,
            nombre: formInputsChat[1].value,
            apellido: formInputsChat[2].value,
            edad: formInputsChat[3].value,
            alias: formInputsChat[4].value,
            avatar: formInputsChat[5].value
        },
        text: formInputsChat[6].value,
        date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`
    }
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
                <div class="chatHeader">
                    <img src=${message.author.avatar} alt="">
                    <div class="chatInfo">
                        <p class="chatEmail">${message.author.alias}</p>
                        <p class="chatDate">${message.date}</p>
                    </div>
                </div>
                <p class="chatText">${message.text}</p>
            </div>
        `
    })
})