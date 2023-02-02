const formRegister = document.getElementById('formRegister')
const formRegisterInput = document.querySelectorAll('.registerInput');
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newUser = {}
    for(i = 0; i< formRegisterInput.length; i++){
        newUser[formRegisterInput[i].name] = formRegisterInput[i].value
    }
    if( newUser['password'] === newUser['confirmPassword']){
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        const res = await response.json()
        if( res.data ){
            location.href = '/'
        }else{
            location.href = '/errorRegister'
        }
    }else{
        location.href = '/errorRegister';
    }

    
})

