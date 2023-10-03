**Resumen del Proyecto: Creación de una Aplicación E-commerce con Node.js, Express, MongoDB y Handlebars**

Este proyecto tiene como objetivo crear una aplicación de comercio electrónico utilizando tecnologías como Node.js, Express, MongoDB y Handlebars para el motor de plantillas. A continuación, se presenta un resumen de los principales pasos y conceptos cubiertos en el proyecto:

1. **Configuración Inicial:**
   - Se configuró un proyecto Node.js.
   - Se importaron y configuraron los módulos necesarios, como Express, Mongoose (para MongoDB), y Handlebars.

2. **Conexión a MongoDB:**
   - Se realizó la conexión a una base de datos MongoDB en la nube utilizando Mongoose.

3. **Modelo de Datos:**
   - Se definió un modelo de datos para los productos en la base de datos usando Mongoose. El modelo incluyó campos como título, descripción, precio, categoría y disponibilidad.

4. **Rutas y Controladores:**
   - Se crearon rutas y controladores para administrar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de los productos.

5. **Vistas y Plantillas:**
   - Se configuraron vistas HTML dinámicas utilizando Handlebars como motor de plantillas.
   - Se crearon plantillas Handlebars para mostrar la lista de productos y detalles de productos.

6. **Rutas y Controladores de Vistas:**
   - Se crearon rutas y controladores para servir las vistas HTML.

7. **Manejo de Errores:**
   - Se implementó un manejador de errores para capturar y gestionar errores en la aplicación.

8. **Realizar Paginación:**
   - Se implementó una función de paginación para mostrar productos en varias páginas.

9. **Acceso a Propiedades del Prototipo:**
   - Se abordó un problema de seguridad relacionado con el acceso a propiedades del prototipo en Handlebars.
   - Se utilizó la opción `allowProtoPropertiesByDefault` para controlar el acceso a estas propiedades.

10. **Búsqueda y Filtrado de Productos:**
    - Se implementó la búsqueda y filtrado de productos por categoría y orden ascendente o descendente de precio.

11. **Servidor en Tiempo Real:**
    - Se configuró un servidor en tiempo real usando Socket.io para enviar actualizaciones de productos en tiempo real a los clientes.

12. **Despliegue (Opcional):**
    - Si se planea implementar la aplicación en un entorno de producción, es necesario llevar a cabo un proceso de despliegue.

Recuerda que este resumen es una guía general de lo que se ha cubierto en el proyecto. Cada uno de estos pasos requiere un trabajo más detallado, incluyendo la implementación de código específico y la configuración adecuada. Si tienes preguntas adicionales o necesitas más detalles sobre algún aspecto del proyecto, no dudes en preguntar.

### Instalación y Uso

1. Clona este repositorio en tu máquina local.
2. Navega a la carpeta raíz del proyecto en tu terminal.
3. Ejecuta `npm install` para instalar las dependencias.
4. Ejecuta `npm start` para iniciar el servidor.
5. Abre tu navegador y visita `http://localhost:8080/` para acceder a la aplicación.
6. Utiliza herramientas como Postman o Thunder Client para realizar solicitudes a las rutas API.


## Autor

Escobar `backend`

