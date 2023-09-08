# Proyecto de Gestión de Productos, Carritos y Websockets

Este es un proyecto de una aplicación de gestión de productos, carritos y websockets desarrollado con Node.js, Express y Socket.io. La aplicación permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en productos y carritos, así como la integración de websockets para visualizar en tiempo real la lista de productos.

## Funcionalidades

### Gestión de Productos

#### Listar todos los productos

- Ruta: `GET /api/products`
- Descripción: Retorna una lista de todos los productos disponibles en la base de datos.
- Respuesta: JSON que contiene un array de objetos de productos.

#### Obtener un producto por su ID

- Ruta: `GET /api/products/:pid`
- Parámetros:
  - `pid`: ID del producto que se desea obtener.
- Descripción: Retorna los detalles del producto correspondiente al ID proporcionado.
- Respuesta: JSON con los detalles del producto.

#### Agregar un nuevo producto

- Ruta: `POST /api/products`
- Descripción: Agrega un nuevo producto a la base de datos con los campos especificados.
- Cuerpo de la solicitud (JSON):
  - `title`: Título del producto (string, obligatorio).
  - `description`: Descripción del producto (string, obligatorio).
  - `code`: Código del producto (string, obligatorio).
  - `price`: Precio del producto (number, obligatorio).
  - `stock`: Cantidad en stock del producto (number, obligatorio).
  - `status`: Estado del producto (boolean, opcional, valor por defecto: true).
  - `thumbnail`: Ruta de la imagen del producto (string, opcional).
- Respuesta: Mensaje de éxito.

#### Actualizar un producto existente

- Ruta: `PUT /api/products/:pid`
- Parámetros:
  - `pid`: ID del producto que se desea actualizar.
- Descripción: Actualiza los campos del producto correspondiente al ID proporcionado.
- Cuerpo de la solicitud (JSON): Campos a actualizar.
- Respuesta: Mensaje de éxito.

#### Eliminar un producto por su ID

- Ruta: `DELETE /api/products/:pid`
- Parámetros:
  - `pid`: ID del producto que se desea eliminar.
- Descripción: Elimina el producto correspondiente al ID proporcionado.
- Respuesta: Mensaje de éxito.

### Gestión de Carritos

#### Crear un nuevo carrito

- Ruta: `POST /api/carts`
- Descripción: Crea un nuevo carrito vacío en la base de datos.
- Respuesta: Mensaje de éxito.

#### Listar los productos de un carrito por su ID

- Ruta: `GET /api/carts/:cid`
- Parámetros:
  - `cid`: ID del carrito del cual se desea obtener los productos.
- Descripción: Retorna los productos incluidos en el carrito correspondiente al ID proporcionado.
- Respuesta: JSON que contiene un array de objetos de productos.

#### Agregar productos a un carrito existente

- Ruta: `POST /api/carts/:cid/product/:pid`
- Parámetros:
  - `cid`: ID del carrito al que se desea agregar el producto.
  - `pid`: ID del producto que se desea agregar al carrito.
- Descripción: Agrega el producto especificado al carrito correspondiente al ID proporcionado.
- Respuesta: Mensaje de éxito.

### Websockets

#### Visualización en Tiempo Real de la Lista de Productos

- Ruta: `/realtimeproducts`
- Descripción: Visualiza en tiempo real la lista de productos mediante websockets.
- Conexión: El servidor debe conectarse al cliente cuando se abre la ruta.
- Mensaje de Conexión: En la consola del servidor, se muestra un mensaje de "cliente conectado".
- Lista de Productos: Se muestra la lista de productos y se verifica que se esté enviando desde el servidor mediante websockets.

## Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta raíz del proyecto en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm start` para iniciar el servidor.
5. Abre tu navegador y visita `http://localhost:8080/` para acceder a la aplicación.
6. Utiliza herramientas como Postman o Thunder Client para realizar solicitudes a las rutas API.


## Autor

Escobar `backend`

