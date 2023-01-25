const formLogin = document.getElementById('formLogin')
const formLoginInput = document.querySelectorAll('.loginInput');
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()

    const newUser = {}
    for(i = 0; i< formLoginInput.length; i++){
        newUser[formLoginInput[i].name] = formLoginInput[i].value
    }

    await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
})

