import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // @Añadir funcionalidades extras a este modulo, ejemplo, conectar una base de datos
  imports: [
    TasksModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/prueba')
  ],
  // @Tener un archivo aparte con todas las rutas, ejemplo, rutas get post delete
  controllers: [],
  // @Para decir las funciones que pueden ser utilizadas en todas partes
})
export class AppModule {}
