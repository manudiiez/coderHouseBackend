import { crearServer } from "../src/server/index.js"; 
import fetch from 'node-fetch';


const servidor = crearServer()
await servidor.conectar({ puerto: 8080 })
console.log('conectado!');

const result = await fetch('http://localhost:8080/').then((res) => res.text())
console.log(result);

await servidor.desconectar()

console.log('desconectado!');