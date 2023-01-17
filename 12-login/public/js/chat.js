
const formChat = document.getElementById('formChat')
const formInputsChat = document.querySelectorAll('#formChat input');
const chatContainer = document.getElementById('chatContainer')
console.log('chat file');


formChat.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newChat = {}
    formInputsChat.forEach(input => {
        newChat[input.name] = input.value;
    });
    const date = new Date()

    newChat['date'] = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} a las ${date.getHours()}:${date.getMinutes()}`
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
                    <img src=${message.avatar} alt="">
                    <div class="chatInfo">
                        <p class="chatEmail">${message.alias}</p>
                        <p class="chatDate">${message.date}</p>
                    </div>
                </div>
                <p class="chatText">${message.text}</p>
            </div>
        `
    })
})