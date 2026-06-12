const flores = [

    {
        id: 1,
        nombre: "Rosa",
        precio: 1800,
        imagen: "assets/images/rosa.jpg",
        colores: ["Rojo", "Rosado", "Blanco", "Morado"],
        cantidad: 0
    }

];

const contenedorFlores =
document.getElementById("contenedorFlores");

function mostrarFlores() {

    let contenido = "";

    for (const flor of flores) {

        contenido += `
        
        <div class="tarjeta-flor">

            <img src="${flor.imagen}" alt="${flor.nombre}">

            <h4>${flor.nombre}</h4>

            <p class="precio">
                ₡${flor.precio}
            </p>

            <div class="colores">

                <button>${flor.colores[0]}</button>
                <button>${flor.colores[1]}</button>
                <button>${flor.colores[2]}</button>
                <button>${flor.colores[3]}</button>

            </div>

            <div class="cantidad">

                <button onclick="restarCantidad(${flor.id})">
                    -
                </button>

                <span id="cantidad-${flor.id}">
                    ${flor.cantidad}
                </span>

                <button onclick="sumarCantidad(${flor.id})">
                    +
                </button>

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
}

function restarCantidad(id) {

    for (const flor of flores) {

        if (flor.id === id && flor.cantidad > 0) {

            flor.cantidad--;

        }

    }

    mostrarFlores();
}

mostrarFlores();