// =========================
// FLORES DISPONIBLES
// =========================

const flores = [

    {
        id: 1,
        nombre: "Rosa",
        precio: 1800,
        imagen: "assets/images/rosaRoja.jpg"
    },

    {
        id: 2,
        nombre: "Tulipan",
        precio: 1800,
        imagen: "assets/images/tulipanRojo.jpg"
    },

    {
        id: 3,
        nombre: "Lirio",
        precio: 1800,
        imagen: "assets/images/lirioAmarillo.jpg"
    }

];

// =========================
// CONTENEDOR HTML
// =========================

const contenedorFlores =
document.getElementById("contenedorFlores");

// =========================
// MOSTRAR FLORES
// =========================

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

            <button onclick="verFlor(${flor.id})">
                Ver detalle
            </button>

        </div>
        
        `;
    }

    contenedorFlores.innerHTML = contenido;
}

// =========================
// VER DETALLE
// =========================

function verFlor(id) {

    for (const flor of flores) {

        if (flor.id === id) {

            alert(
                "Flor: " +
                flor.nombre +
                "\nPrecio: ₡" +
                flor.precio
            );

        }

    }

}

// =========================
// INICIAR
// =========================

mostrarFlores();