let flores = [];
const extras = [
    {
        nombre: "Tarjeta",
        precio: 1500,
        seleccionado: false
    },
    {
        nombre: "Chocolates",
        precio: 3000,
        seleccionado: false
    }
];
const contenedorFlores = document.getElementById("contenedorFlores");
const listaResumen = document.getElementById("listaResumen");
const subtotalFlores = document.getElementById("subtotalFlores");
const totalGeneral = document.getElementById("totalGeneral");
const totalExtrasTexto =document.getElementById("totalExtras");

const checkTarjeta = document.getElementById("tarjeta");
const checkChocolates = document.getElementById("chocolates");
checkTarjeta.addEventListener("change", actualizarResumen);
checkChocolates.addEventListener("change", actualizarResumen);

const costoEntrega = 2500;

function mostrarFlores() {

    let contenido = "";

    for (const flor of flores) {

        let botonesColores = "";

        for (const color of flor.colores) {
            botonesColores +=
        `<button class="color-${color}" onclick="seleccionarColor(${flor.id}, '${color}')"> ${color} </button>`;
        }

        contenido += `
            <div class="tarjeta-flor">

                <img src="${flor.imagen}" alt="${flor.nombre}">

                <h4>${flor.nombre}</h4>

                <p class="precio">₡${flor.precio} c/u</p>

                <p class="texto-colores">Colores disponibles:</p>
                <div class="colores">
                ${botonesColores}
                </div>

                <div class="cantidad">
                    <button onclick="restarCantidad(${flor.id})">-</button>

                    <span>${flor.cantidad}</span>

                    <button onclick="sumarCantidad(${flor.id})">+</button>
                </div>

            </div>
        `;
    }

    contenedorFlores.innerHTML = contenido;
}

function sumarCantidad(id) {

    for (const flor of flores) {

        if (flor.id === id) {
            flor.cantidad++;
        }

    }

    mostrarFlores();
    actualizarResumen();
}

function restarCantidad(id) {

    for (const flor of flores) {

        if (flor.id === id && flor.cantidad > 0) {
            flor.cantidad--;
        }

    }

    mostrarFlores();
    actualizarResumen();
}
function seleccionarColor(id, color) {

    for (const flor of flores) {

        if (flor.id === id) {
            flor.colorSeleccionado = color;
        }

    }

    mostrarFlores();
    actualizarResumen();
}
function actualizarResumen() {

    let contenidoResumen = "";
    let subtotal = 0;
    let totalExtras = 0;

    if (checkTarjeta.checked) {
        totalExtras += 1500;
    }

    if (checkChocolates.checked) {
        totalExtras += 3000;
    }

    for (const flor of flores) {

        if (flor.cantidad > 0) {

            let totalFlor = flor.precio * flor.cantidad;

            subtotal = subtotal + totalFlor;

            contenidoResumen += `
                <div class="item-resumen">
                    <p>
                    ${flor.nombre} x${flor.cantidad}<br>
                    Color: ${flor.colorSeleccionado}
                    </p>
                    <strong>
                        ₡${totalFlor}
                    </strong>
                </div>
            `;
        }
    }

    if (contenidoResumen === "") {
        listaResumen.innerHTML = `
            <p class="mensaje-vacio">
                Aún no has agregado flores.
            </p>
        `;
    } else {
        listaResumen.innerHTML = contenidoResumen;
    }

    subtotalFlores.innerHTML = "₡" + subtotal;
    totalGeneral.innerHTML ="₡" + (subtotal + totalExtras + costoEntrega);
    totalExtrasTexto.innerHTML ="₡" + totalExtras;
}
fetch("data/flores.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        flores = datos;
        mostrarFlores();
        actualizarResumen();
    });