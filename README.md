
# Aplicación de Gestión de Productos

Esta es una aplicación de gestión de productos construida con Express.js que te permite administrar una lista de productos y realizar consultas específicas sobre ellos.

## Funcionalidades

1. **Cargar Productos desde Archivo JSON**: La aplicación carga automáticamente una lista de productos desde un archivo JSON al iniciarse.

2. **Consulta de Todos los Productos**:
   - Ruta: `/products`
   - Método: GET
   - Descripción: Devuelve una lista de todos los productos almacenados en la base de datos.
   - Ejemplo de respuesta:
     ```json
     [
       {
         "title": "productTitle",
         "description": "Modo description",
         "price": 200,
         "thumbnail": "Sin imagen",
         "code": "abc123",
         "stock": 78,
         "id": 1
       },
       // ... otros productos ...
     ]
     ```

3. **Consulta de Productos con Límite**:
   - Ruta: `/products?limit=5`
   - Método: GET
   - Descripción: Devuelve una lista de los primeros productos según el límite especificado en la consulta.
   - Ejemplo de respuesta:
     ```json
     [
       {
         "title": "productTitle",
         "description": "Modo description",
         "price": 200,
         "thumbnail": "Sin imagen",
         "code": "abc123",
         "stock": 78,
         "id": 1
       },
       {
         "title": "productTitle",
         "description": "Modo description",
         "price": 200,
         "thumbnail": "Sin imagen",
         "code": "abc133",
         "stock": 73,
         "id": 2
       },
       // ... otros productos ...
     ]
     ```

4. **Consulta de Producto por ID**:
   - Ruta: `/products/:id`
   - Método: GET
   - Descripción: Devuelve un producto específico según el ID proporcionado en la URL.
   - Ejemplo de respuesta:
     ```json
     {
       "title": "productTitle",
       "description": "Modo description",
       "price": 200,
       "thumbnail": "Sin imagen",
       "code": "abc123",
       "stock": 78,
       "id": 1
     }
     ```

5. **Manejo de Error para ID no Encontrado**:
   - Si se intenta acceder a la ruta `/products/:id` con un ID no existente, se devuelve un objeto de error.
   - Ejemplo de respuesta:
     ```json
     {
       "error": "Producto no encontrado"
     }
     ```

## Ejecución

1. Instala las dependencias utilizando `npm install`.
2. Asegúrate de que el archivo `products.json` contenga al menos 10 productos.
3. Ejecuta la aplicación con `node app.js` ó `npm start`.
4. Abre tu navegador y accede a las diferentes rutas mencionadas anteriormente para probar las funcionalidades.

## Autor

Escobar `backend`

