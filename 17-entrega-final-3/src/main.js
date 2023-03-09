import { MODO, PORT } from "./utils/config.js";
import { crearServer } from "./server/index.js";
import cluster from 'cluster'
import { cpus } from 'os';

if (MODO === 'cluster') {
    if (cluster.isPrimary) {
        console.log(cpus().length);
        console.log('Modo de ejecucion: CLUSTER');
        console.log('proceso primario: pid ' + process.pid);
        for (let i = 0; i < cpus().length; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker) => {
            // console.log('adios mundo cruel!! pid: ' + worker.process.pid);
            cluster.fork()
        })
    } else {
        console.log('soy un subproceso con el pid: ' + process.pid);
        const servidor = crearServer()
        await servidor.conectar({ puerto: PORT })
    }

}else{
    const servidor = crearServer()
    console.log('conectado!');
    await servidor.conectar({ puerto: PORT })
}
