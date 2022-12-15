# Desafio 9 mongodb

## 1 - Crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

Creamos la base de datos

```
use ecommerce
```

Creamos la coleccion Productos
```
db.createCollections("productos")
```

Creamos la coleccion Productos
```
db.createCollections("mensajes")
```

## 2 - Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

Insertamos los documentos de productos

```
db.productos.insertMany(
    [
        { name: "Buzo en oferta", price: 580, description: "lorem ipsum asa asas", image: "image url"}, 
        { name: "Campera en oferta top 3 lowest", price: 900, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Remera en oferta", price: 110, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Buzo", price: 1700, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Campera", price: 2300, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Remera premium", price: 1280, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Buzo premium", price: 2860, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Campera gold", price: 3350, description: "lorem ipsum aasa asa", image: "url"},
        { name: "Campera premium", price: 4320, description: "lorem ipsum aasa asa", image: "url"}
    ]
)
```

Insertamos los documentos de mensajes

```
db.mensajes.insertMany(
    [
        {email: "manu@manu.com", text: "Holaaa", date: "11/11/2022 a las 18:30"}, 
        {email: "admin@admin.com", text: "Hola", date: "11/11/2022 a las 18:30"},
        {email: "valen@valen.com", text: "Hi", date: "11/11/2022 a las 18:30"},
        {email: "manu@manu.com", text: "?", date: "11/11/2022 a las 18:30"}, 
        {email: "admin@admin.com", text: "??", date: "11/11/2022 a las 18:30"},
        {email: "valen@valen.com", text: "????", date: "11/11/2022 a las 18:30"},
        {email: "manu@manu.com", text: "ña", date: "11/11/2022 a las 18:30"}, 
        {email: "admin@admin.com", text: "ñe", date: "11/11/2022 a las 18:30"},
        {email: "valen@valen.com", text: "ño", date: "11/11/2022 a las 18:30"},
        {email: "valen@valen.com", text: "chau", date: "11/11/2022 a las 18:30"}
    ]
)
```

## 3 - Listar todos los documentos en cada colección.

Listamos productos

```
db.productos.find()
```

Listamos mensajes

```
db.mensajes.find()
```

## 4 - Mostrar la cantidad de documentos almacenados en cada una de ellas.

Contamos productos

```
db.productos.find().count()
```

Contamos mensajes

```
db.mensajes.find().count()
```

## 5 - Realizar un CRUD sobre la colección de productos:

### A - Agregar un producto más en la colección de productos 

```
db.productos.insertOne({name: "Buzo last edition", price: 1500, description: "loem ipsum nanana", image: "url"})
```

### B - Listar los productos con precio menor a 1000 pesos.

```
db.productos.find({"price": {$lt: 1000}})
```

### C - Listar los productos con precio entre los 1000 a 3000 pesos.

```
db.productos.find({"price": { $gte : 1000 , $lte : 3000}})
```

### D - Listar los productos con precio mayor a 3000 pesos.

```
db.productos.find({"price": {$gt: 3000}})
```

### E - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

```
db.productos.find({"price": {$lt:1000}}, { name: 1 }).sort({"price": 1}).limit(1).skip(2)
```

## 6 - Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.

```
db.productos.updateMany({}, {$set: {stock: 100}})
```

## 7 - Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 

```
db.productos.updateMany({"price": {$gt: 4000}}, {$set: {stock: 0}})
```

## 8 - Borrar los productos con precio menor a 1000 pesos 

```
db.productos.deleteMany({"price": {$lt: 1000}})
```

## 9 - Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

```
use admin
```
```
db.createUser({user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" }]})
```
