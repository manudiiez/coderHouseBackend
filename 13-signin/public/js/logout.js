setTimeout(async() => {
    await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.href = '/login';
}, 2000)