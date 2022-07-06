# proyectofinal

Aplicación Backend Node JS con Express, registro y autenticación utilizando Passport Local, 
encriptado de password con Bcrypt y renderizado con motor de plantillas ejs-mate.

Incluye connect-flash para mensajes entre las distintas páginas del sitio, y subida de imágenes al servidor con Multer.
Se utiliza Winston para registro de logs.

Dbaas: Mongo DB.

PaaS: Heroku.

Para correr el proyecto, ejecutar en consola: "npm run start".

Usuario ya registrados como ejemplo (para probar inicio de sesión):

user: nicojapaz@gmail.com

password: test


Endpoints:

GET / : Ruta raíz. 

GET /signin : Vista de inicio de sesión.

POST /signin :  Una vez validado el usuario, redirige a su perfil. 

GET /signup : Vista de registro de nuevo usuario. 

POST /signup : 

Se completan los datos y se sube una imagen al servidor. 
El input url de la imagen se debe completar con el mismo nombre de la imagen que se va a subir.
Una vez que se registra el usuario, se redirige a crear un nuevo carrito vacío con fecha y user id.
Cuando ya creó su carrito, puede ir a '/profile' y verá sus datos. En cada nuevoo registro, se envía un mail 
al administrador con todos los datos del usuario registrado.

POST /carrito : 

Crea un nuevo carrito vacío, con fecha y su user id. Si un usuario existente borra su carrito, cuando
vuelva a su perfil o inicie sesión se le pedirá que cree un nuevo carrito. Para agregar/borrar productos del carrito, se utilizan los
mismos endpoints de la segunda entrega (ver más abajo).

GET /profile :

Vista de los datos del usuario registrado, los _id's de los productos en su carrito, y el inventario de productos
disponibles (componentes card). La sesión permanece abierta 30 segundos por seguridad.

POST /profile : Se genera la orden de compra, se envía un mail y un sms al usuario con la lista de productos de su carrito.

GET /logout : Se cierra la sesión.

Para correr en modo fork ejecutar en consola:

pm2 start main.js --watch

Para correr en modo cluster con n hilos de procesamiento:

pm2 start main.js --watch -i n

Para pruebas con Artillery, con el servidor local funcionando, abrir otra terminal y ejecutar: 

artillery quick --count 20 -n 40 http://localhost:8080/api/producto > result.txt

Resulta más eficiente el modo cluster (media de respuestas por segundo y latencia).

En cuanto a los endpoints de la API, siguen funcionando tal cual la segunda entrega:

Endpoints Productos:

GET /api/productos  : Lista todos los productos.

GET /api/productos/:id_producto  : Lista el producto correspondiente al id_producto.

POST /api/productos  : Crea un nuevo producto en base al req.body.

PUT /api/productos/:id_producto  : Actualiza el producto correspondiente al id_producto.

DELETE /api/productos/:id_producto  : Elimina el producto correspondiente al id_producto.

Endpoints Carritos:

GET /api/carritos  : Lista todos los carritos.

GET /api/carritos/:id_carrito  : Lista el carrito correspondiente al id_carrito.

POST /api/carritos  : Crea un nuevo carrito con id, fecha de creación, y un array de productos vacío.

POST /api/carritos/:id_carrito/producto/:id_producto  : Agrega el producto id_producto al array del carrito id_carrito.

DELETE /api/carritos/:id_carrito/producto/:id_producto  : Borra el producto id_producto del array del carrito id_carrito.

GET /api/carritos/:id_carrito/producto/:id_producto  : Muestra la cantidad del producto id_producto que hay en el array del carrito id_carrito.

DELETE /api/carritos/:id_carrito  : Borra el carrito con id_carrito.

Implementación de CRUD de productos en GraphQL:

Queries:

{
  products{
    title
    _id
    price
    stock
    thumbnail 
  }
}

{
  productById(_id:"621142dacf7960c6f21cbd3c"){
    title
    _id
    price
    stock
    thumbnail 
  }
}

Mutations: 

mutation{
  createProduct(input:
    {
    title: "Node JS"
    price: 3400
    stock: 35
    thumbnail: "img/node"
    }) {
    title
    _id
    price
    stock
    thumbnail 
  } 
}

mutation{
  updateProduct(
    _id:"62a7db42753ccb0c27986910",
    input:
    {
    title: "Node JS"
    price: 2700
    stock: 40
    thumbnail: "img/node"
    }) {
    title
    _id
    price
    stock
    thumbnail 
  } 
}

mutation{
  deleteProduct(_id:"62a7db42753ccb0c27986910") 
  {
    title
    _id
    price
    stock
    thumbnail 
  } 
}