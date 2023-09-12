const mysql = require('mysql2');

// Configuración de la conexión
const dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database:process.env.database,
};

// Función para obtener todos los datos de una tabla
function obtenerTodosLosDatos(callback) {
    const connection = mysql.createConnection(dbConfig);
  
    // Conectar a la base de datos
    connection.connect((err) => {
      if (err) {
        return callback(err, null);
      }
  
      // Realizar la consulta SQL para traer todos los datos de una tabla
      connection.query('SELECT * FROM cryptos', (err, results) => {
        if (err) {
          return callback(err, null);
        }
  
        // Cerrar la conexión a la base de datos
        connection.end();
  
        // Llamar al callback con los resultados
        callback(null, results);
      });
    });
}

module.exports = { obtenerTodosLosDatos }