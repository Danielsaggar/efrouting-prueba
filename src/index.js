const app = require('./app');
const path = require('path'); 
require('dotenv').config();


// Establece la ubicación de la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Se indica el motor del plantillas a utilizar
app.set('view engine', 'pug');

const port = process.env.PORT;

//Importar las rutas GET & POST
const indexRouter = require('./routes/get/route-index');

//Manejo de solicitudes GET
app.use('/', indexRouter);

// Puerto de escucha
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
  