const formLogin = document.getElementById('formLogin')
const formLoginInput = document.getElementById('formLoginInput');
console.log('login file');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault()
    await fetch('/api/auth/login?username='+formLoginInput.value , {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.reload();
})

