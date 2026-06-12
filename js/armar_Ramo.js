const flores = [
    {
        id: 1,
        nombre: "Rosa",
        precio: 1800,
        imagen: "assets/images/rosaRosada.jpg",
        colores: ["Rojo", "Rosado", "Blanco", "Morado"],
        cantidad: 0
    },
    {
        id: 2,
        nombre: "Tulipán",
        precio: 1800,
        imagen: "assets/images/tulipanRosado.jpg",
        colores: ["Blanco", "Rosado", "Rojo"],
        cantidad: 0
    },
    {
        id: 3,
        nombre: "Lirio",
        precio: 1800,
        imagen: "assets/images/lirioRosado.jpg",
        colores: ["Amarillo", "Rosado", "Blanco", "Beige", "Naranja"],
        cantidad: 0
    },
    {
        id: 4,
        nombre: "Girasol",
        precio: 1800,
        imagen: "assets/images/girasol.jpg",
        colores: ["Amarillo"],
        cantidad: 0
    },
    {
        id: 5,
        nombre: "Gerberas",
        precio: 1700,
        imagen: "assets/images/Gerberas.jpg",
        colores: ["Rosa", "Rojo", "Naranja", "Amarillo", "Fucsia", "Blanco"],
        cantidad: 0
    },
    {
        id: 6,
        nombre: "Clavel",
        precio: 1800,
        imagen: "assets/images/clavelBlanco.jpg",
        colores: ["Rojo", "Rosado", "Blanco", "Naranja"],
        cantidad: 0
    },
    {
        id: 7,
        nombre: "Hortensia",
        precio: 1800,
        imagen: "assets/images/hortenciasCelestes.jpg",
        colores: ["Celeste", "Blanco"],
        cantidad: 0
    },
    {
        id: 8,
        nombre: "Baby's Breath",
        precio: 1800,
        imagen: "assets/images/bbyBreath.jpg",
        colores: ["Blanco"],
        cantidad: 0
    }
];

const contenedorFlores = document.getElementById("contenedorFlores");

function mostrarFlores() {

    let contenido = "";

    for (const flor of flores) {

        let botonesColores = "";

        for (const color of flor.colores) {
            botonesColores += `<button>${color}</button>`;
        }

        contenido += `
            <div class="tarjeta-flor">

                <img src="${flor.imagen}" alt="${flor.nombre}">

                <h4>${flor.nombre}</h4>

                <p class="precio">₡${flor.precio}</p>

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