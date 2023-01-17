setTimeout(async() => {
    await fetch('/api/auth/logout', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    location.reload();
}, 2000)