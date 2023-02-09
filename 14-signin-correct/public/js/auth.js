const formRegister = document.getElementById('formRegister')
const formRegisterInput = document.querySelectorAll('.registerInput');
const formLogin = document.getElementById('formLogin')
const formLoginInput = document.querySelectorAll('.loginInput');

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('registrarse');
    const newUser = {}
    for (i = 0; i < formRegisterInput.length; i++) {
        newUser[formRegisterInput[i].name] = formRegisterInput[i].value
    }

    // if( newUser['password'] === newUser['confirmPassword']){
    //     const response = await fetch('/api/auth/register', {
    //         method: 'POST',
    //         headers: { 
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newUser)
    //     })
    //     const res = await response.json()
    //     if( res.data ){
    //         location.href = '/'
    //     }else{
    //         location.href = '/errorRegister'
    //     }
    // }else{
    //     location.href = '/errorRegister';
    // }

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })

    const res = await response.json()
    if (res.data) {
        location.href = '/'
    } else {
        location.href = '/error'
    }
})

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log('login');

    // const newUser = {}
    // for(i = 0; i< formLoginInput.length; i++){
    //     newUser[formLoginInput[i].name] = formLoginInput[i].value
    // }

    // const response = await fetch('/api/auth/login', {
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(newUser)
    // })
    // const res = await response.json()
    // if( res.data ){
    //     location.href = '/'
    // }else{
    //     location.href = '/errorLogin'
    // }
})