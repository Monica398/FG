// Aquí vamos a guardar las flores que vienen del JSON
let flores = [];

// Aquí guardamos lo que el cliente va escogiendo
let ramo = [];

// Contenedores del HTML
const contenedorFlores = document.getElementById("contenedorFlores");
const listaResumen = document.getElementById("listaResumen");
const totalRamo = document.getElementById("totalRamo");

// Cargar las flores desde el archivo JSON
fetch("data/flores.json")
    .then(respuesta => respuesta.json())
    .then(datos => {
        flores = datos.flores;
        mostrarFlores(flores);
    })
    .catch(error => {
        console.log("Error al cargar el JSON:", error);
    });

// Mostrar las flores en la página
function mostrarFlores(listaFlores) {
    contenedorFlores.innerHTML = "";

    listaFlores.forEach(flor => {

        // Tomamos la primera imagen como imagen inicial
        const imagenInicial = flor.colores[0].imagen;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-flor");

        tarjeta.innerHTML = `
            <img src="${imagenInicial}" alt="${flor.nombre}" id="imagen-${flor.id}">

            <h4>${flor.nombre}</h4>

            <p class="precio">₡${flor.precio}</p>

            <div class="colores">
                ${flor.colores.map(color => `
                    <button class="btn-color" onclick="cambiarColor(${flor.id}, '${color.nombre}', '${color.imagen}')">
                        ${color.nombre}
                    </button>
                `).join("")}
            </div>

            <div class="cantidad">
                <button onclick="restarFlor(${flor.id})">-</button>
                <span id="cantidad-${flor.id}">0</span>
                <button onclick="sumarFlor(${flor.id})">+</button>
            </div>
        `;

        contenedorFlores.appendChild(tarjeta);
    });
}