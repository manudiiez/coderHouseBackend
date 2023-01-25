const formRegister = document.getElementById('formRegister')
const formRegisterInput = document.querySelectorAll('.registerInput');
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newUser = {}
    for(i = 0; i< formRegisterInput.length; i++){
        newUser[formRegisterInput[i].name] = formRegisterInput[i].value
    }
    if( newUser['password'] === newUser['confirmPassword']){
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        location.href = '/';
    }else{
        location.href = '/errorRegister';
    }
})

