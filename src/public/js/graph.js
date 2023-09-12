
// Obtener una referencia al elemento canvas del DOM
const $grafica = document.querySelector("#graph");
const $BTC = document.querySelector("#BTC");
const $ETH = document.querySelector("#ETH");
const timestamp = document.querySelector("#timestamp");

// Analiza la cadena JSON para obtener un arreglo
const fechas = JSON.parse(timestamp.value);
const data1 = JSON.parse($ETH.value);
const data2 = JSON.parse($BTC.value);

// Podemos tener varios conjuntos de datos. Comencemos con uno
const Ethereum = {
    label: "Ethereum",
    data:  data1, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(98, 188, 83, 0.2)', // Color de fondo
    borderColor: 'rgba(98, 188, 83, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
const Bitcoin = {
    label: "Bitcoin",
    data: data2, // La data es un arreglo que debe tener la misma cantidad de valores que la cantidad de etiquetas
    backgroundColor: 'rgba(247, 202, 24, 0.2)', // Color de fondo
    borderColor: 'rgba(247, 202, 24, 1)', // Color del borde
    borderWidth: 1,// Ancho del borde
};
new Chart($grafica, {
    type: 'line',// Tipo de gráfica
    data: {
        labels: fechas,
        datasets: [
            Ethereum,
            Bitcoin            
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
        },
    }
});