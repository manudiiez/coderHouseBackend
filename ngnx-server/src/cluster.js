// Para que sirven los Cluster

// Los cluster nos sirven para poder atender varias tareas a la vez, serian como la cantidad de empleados atendiendo a lso clientes



import cluster from 'cluster'
import {crearServer} from "./server/index.js";
// Esta es una funcion que nos devuelve informacion sobre lso cpues del sistema
import { cpus } from 'os';


// Se fija si es el bucle prnciupal
if (cluster.isPrimary) {
    // Asi sabemos cuantos cpus tenemos y esa es la cantidad de servidores que podemons tener
    console.log(cpus().length);
    console.log('Modo de ejecucion: CLUSTER');
    console.log('proceso primario: pid ' + process.pid);
    for (let i = 0; i < cpus().length; i++) {
        // Creamos un trabajor con las siguiente propiedad
        cluster.fork()
    }
    // Cuandos e elimine el proceso se ejecutara esto, lo podemos eliminar desde el administrador de trareas
    cluster.on('exit', (worker) => {
        console.log('adios mundo cruel!! pid: ' + worker.process.pid);
        cluster.fork()
    })
} else {
    console.log('soy un subproceso con el pid: ' + process.pid);
    const servidor = crearServer()
    await servidor.conectar({ puerto: 8080 })
}

