var express = require('express');
var router = express.Router();

const {obtenerTodosLosDatos } = require("../../model/connectionRDS")
/* GET home page. */
router.get('/', async function(req, res, next) {    
  const BTC = []
  const ETH = []
  const timestamp = []

    obtenerTodosLosDatos((err, data) => {
    if (err) {
      res.status(500).send('Error al obtener los datos');
    } else {
      console.log("Data: ", data[0]);
      for (const pos in data) {                
        if (data[pos].symbol === 'ETH') {
          ETH.push(data[pos].price);
        } else {
          BTC.push(data[pos].price);
          timestamp.push(data[pos].timestamp);
        }
      }
      console.log("BTC: ", BTC);
      console.log("ETH: ", ETH);
      console.log("timestamp: ", timestamp);
      res.render('index', { ETH, BTC, timestamp });
    }
  });    
});

module.exports = router;