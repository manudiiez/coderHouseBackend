
// Process es una clase de nodejs
// Message en un metodo que recibe un mensaje entre procesos
process.on('message', (msg) => {
    console.log(msg);
    setTimeout(() => {
        console.log('cerrando');
        process.exit()
    }, 3000)
} )