// Fork nos permite acceder a los subprocesos
import { fork } from 'child_process'

// Asi llamamos al subproceso
const proceso1 = fork('./subproceso.js')
const proceso2 = fork('./subproceso.js')
// Aqui no temrina la aplicacion ya que el procesos sigue en marcha
// Como son async cada mensaje llegaa a su tiempo, en este caso llega primero el mas liviano (los strings son mas livamos que los json)
proceso1.send({msg: 'Hola desde el archivo principal'})
proceso2.send('Hola!!')
