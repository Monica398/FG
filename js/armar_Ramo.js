// Arreglo donde se van a guardar las flores que vienen del JSON
let flores = [];

// Arreglo para extras. Por ahora no se está usando mucho,
// pero se puede dejar por si después agregas más extras.
let extras = [];

// Traemos del HTML el contenedor donde se van a mostrar las flores
const contenedorFlores = document.getElementById("contenedorFlores");

// Traemos del HTML la parte donde se muestra el resumen del ramo
const listaResumen = document.getElementById("listaResumen");

// Traemos del HTML donde se muestra el subtotal de las flores
const subtotalFlores = document.getElementById("subtotalFlores");

// Traemos del HTML donde se muestra el total final
const totalGeneral = document.getElementById("totalGeneral");

// Traemos del HTML donde se muestra el total de extras
const totalExtrasTexto = document.getElementById("totalExtras");

// Traemos los checkbox de los extras
const checkTarjeta = document.getElementById("tarjeta");
const checkChocolates = document.getElementById("chocolates");

// Cuando el usuario marca o desmarca tarjeta, se actualiza el resumen
checkTarjeta.addEventListener("change", actualizarResumen);

// Cuando el usuario marca o desmarca chocolates, se actualiza el resumen
checkChocolates.addEventListener("change", actualizarResumen);

// Traemos los filtros del HTML
const filtroTipo = document.getElementById("filtroTipo");
const filtroColor = document.getElementById("filtroColor");

// Cuando cambia el filtro de tipo, se vuelven a mostrar las flores
filtroTipo.addEventListener("change", mostrarFlores);

// Cuando cambia el filtro de color, se vuelven a mostrar las flores
filtroColor.addEventListener("change", mostrarFlores);

// Costo fijo de entrega
const costoEntrega = 2500;


// Esta función muestra las flores en la página
function mostrarFlores() {

    // Aquí vamos guardando todo el HTML que se va a mostrar
    let contenido = "";

    // Recorremos todas las flores
    for (const flor of flores) {

        // Si el filtro de tipo no está en "Todas"
        // y la flor no coincide con el filtro, se salta esa flor
        if (filtroTipo.value !== "Todas" && flor.nombre !== filtroTipo.value) {
            continue;
        }

        // Variable para saber si la flor tiene el color seleccionado
        let tieneColor = false;

        // Recorremos los colores de cada flor
        for (const color of flor.colores) {

            // Si algún color de la flor es igual al filtro seleccionado
            if (color === filtroColor.value) {
                tieneColor = true;
            }
        }

        // Si el filtro de color no está en "Todos"
        // y la flor no tiene ese color, se salta esa flor
        if (filtroColor.value !== "Todos" && tieneColor === false) {
            continue;
        }

        // Aquí se guardan los botones de colores de cada flor
        let botonesColores = "";

        // Recorremos los colores de la flor para crear un botón por cada color
        for (const color of flor.colores) {
            botonesColores += `
                <button class="color-${color}" onclick="seleccionarColor(${flor.id}, '${color}')">
                    ${color}
                </button>
            `;
        }

        // Aquí se crea la tarjeta completa de cada flor
        contenido += `
            <div class="tarjeta-flor">

                <img src="${flor.imagen}" alt="${flor.nombre}">

                <h4>${flor.nombre}</h4>

                <p class="precio">₡${flor.precio} c/u</p>

                <p class="descripcion-flor">${flor.descripcion}</p>

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

    // Mostramos todo el contenido dentro del contenedor del HTML
    contenedorFlores.innerHTML = contenido;
}


// Esta función aumenta la cantidad de una flor
function sumarCantidad(id) {

    // Recorremos todas las flores
    for (const flor of flores) {

        // Buscamos la flor que tenga el mismo id
        if (flor.id === id) {

            // Aumentamos la cantidad en 1
            flor.cantidad++;
        }
    }

    // Volvemos a mostrar las flores para actualizar el número
    mostrarFlores();

    // Actualizamos el resumen
    actualizarResumen();
}


// Esta función resta la cantidad de una flor
function restarCantidad(id) {

    // Recorremos todas las flores
    for (const flor of flores) {

        // Buscamos la flor por id y revisamos que la cantidad sea mayor que 0
        if (flor.id === id && flor.cantidad > 0) {

            // Restamos 1
            flor.cantidad--;
        }
    }

    // Volvemos a mostrar las flores para actualizar el número
    mostrarFlores();

    // Actualizamos el resumen
    actualizarResumen();
}


// Esta función guarda el color que el usuario seleccionó para una flor
function seleccionarColor(id, color) {

    // Recorremos todas las flores
    for (const flor of flores) {

        // Buscamos la flor que tenga el mismo id
        if (flor.id === id) {

            // Guardamos el color seleccionado
            flor.colorSeleccionado = color;
        }
    }

    // Volvemos a mostrar las flores
    mostrarFlores();

    // Actualizamos el resumen
    actualizarResumen();
}


// Esta función actualiza el resumen del pedido
function actualizarResumen() {

    // Aquí se guarda el contenido que va a salir en el resumen
    let contenidoResumen = "";

    // Subtotal solo de flores
    let subtotal = 0;

    // Total solo de extras
    let totalExtras = 0;

    // Si la tarjeta está marcada, se suma su precio
    if (checkTarjeta.checked) {
        totalExtras += 1500;
    }

    // Si los chocolates están marcados, se suma su precio
    if (checkChocolates.checked) {
        totalExtras += 3000;
    }

    // Recorremos todas las flores
    for (const flor of flores) {

        // Solo agregamos al resumen las flores que tengan cantidad mayor que 0
        if (flor.cantidad > 0) {

            // Calculamos el total de esa flor
            let totalFlor = flor.precio * flor.cantidad;

            // Sumamos ese total al subtotal
            subtotal = subtotal + totalFlor;

            // Agregamos esa flor al resumen
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

    // Si no hay flores agregadas, se muestra un mensaje
    if (contenidoResumen === "") {
        listaResumen.innerHTML = `
            <p class="mensaje-vacio">
                Aún no has agregado flores.
            </p>
        `;
    } else {

        // Si sí hay flores, se muestra el resumen
        listaResumen.innerHTML = contenidoResumen;
    }

    // Mostramos el subtotal de flores
    subtotalFlores.innerHTML = "₡" + subtotal;

    // Mostramos el total de extras
    totalExtrasTexto.innerHTML = "₡" + totalExtras;

    // Mostramos el total general: flores + extras + entrega
    totalGeneral.innerHTML = "₡" + (subtotal + totalExtras + costoEntrega);
}


// Esta parte carga las flores desde el archivo JSON
// Esto es lo único más nuevo, porque sirve para leer el archivo flores.json
fetch("data/flores.json")
    .then(respuesta => respuesta.json())
    .then(datos => {

        // Guardamos las flores del JSON dentro del arreglo flores
        flores = datos.flores;

        // A cada flor le agregamos cantidad y color seleccionado
        for (const flor of flores) {
            flor.cantidad = 0;
            flor.colorSeleccionado = "";
        }

        // Mostramos las flores en la página
        mostrarFlores();

        // Mostramos el resumen inicial
        actualizarResumen();
    });