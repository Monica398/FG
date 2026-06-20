/*=====================================================
ARREGLOS PRINCIPALES
=====================================================*/
/* En este bloque se crean los arreglos principales
del programa. Se utilizan para almacenar las flores
y otros datos necesarios para armar el ramo. */

// Arreglo donde se almacenarán las flores obtenidas desde el archivo JSON.
// Este arreglo se refleja en las tarjetas de flores que aparecen en pantalla.
let flores = [];

// Arreglo reservado para extras.
// Actualmente no se utiliza mucho, pero permite agregar nuevos extras en el futuro.
let extras = [];


/*=====================================================
OBTENER ELEMENTOS DEL HTML
=====================================================*/
/* En este bloque se obtienen elementos del HTML para
poder manipularlos desde JavaScript. */

const contenedorFlores = document.getElementById("contenedorFlores");
// Obtiene el contenedor donde se mostrarán las flores.
// Se refleja en la zona izquierda de la página.

const listaResumen = document.getElementById("listaResumen");
// Obtiene el contenedor donde aparecerá el resumen del ramo.
// Se refleja en el lado derecho de la página.

const subtotalFlores = document.getElementById("subtotalFlores");
// Obtiene el elemento donde se mostrará el subtotal de las flores.

const totalGeneral = document.getElementById("totalGeneral");
// Obtiene el elemento donde se mostrará el total final del pedido.

const totalExtrasTexto = document.getElementById("totalExtras");
// Obtiene el elemento donde se mostrará el total de extras.

const checkTarjeta = document.getElementById("tarjeta");
// Obtiene el checkbox del extra tarjeta.

const checkChocolates = document.getElementById("chocolates");
// Obtiene el checkbox del extra chocolates.

const btnPagar = document.getElementById("btnPagar");
// Obtiene el botón Pagar de la sección de entrega.

const buscarFlor = document.getElementById("buscarFlor");
// Obtiene el campo de búsqueda para buscar flores por nombre o color.


/*=====================================================
EVENTOS
=====================================================*/
/* En este bloque se agregan eventos para detectar
acciones realizadas por el usuario. */

buscarFlor.addEventListener("input", mostrarFlores);
// Cada vez que el usuario escribe en el buscador,
// se vuelven a mostrar las flores aplicando el filtro.

checkTarjeta.addEventListener("change", actualizarResumen);
// Cuando el usuario marca o desmarca la tarjeta,
// se actualiza automáticamente el resumen.

checkChocolates.addEventListener("change", actualizarResumen);
// Cuando el usuario marca o desmarca chocolates,
// se actualiza automáticamente el resumen.

btnPagar.addEventListener("click", pagar);
// Cuando el usuario presiona el botón pagar,
// se ejecuta la función pagar().

const filtroTipo = document.getElementById("filtroTipo");
// Obtiene el filtro por tipo de flor.

const filtroColor = document.getElementById("filtroColor");
// Obtiene el filtro por color.

filtroTipo.addEventListener("change", mostrarFlores);
// Cuando cambia el filtro de tipo,
// se actualizan las flores mostradas.

filtroColor.addEventListener("change", mostrarFlores);
// Cuando cambia el filtro de color,
// se actualizan las flores mostradas.


/*=====================================================
COSTOS FIJOS
=====================================================*/
/* Aquí se guardan valores fijos utilizados en el sistema. */

const costoEntrega = 2500;
// Costo fijo de entrega.
// Se refleja en el resumen del ramo.

/*=====================================================
FUNCIÓN MOSTRAR FLORES
=====================================================*/
/* Esta función se encarga de mostrar las flores en la página.
Se refleja en la sección "Elige tus flores", donde aparecen
las tarjetas con imagen, nombre, precio, colores y cantidad. */

function mostrarFlores() {

    // Variable donde se va guardando todo el HTML de las tarjetas.
    // Luego este contenido se coloca dentro de contenedorFlores.
    let contenido = "";

    // Recorre una por una todas las flores que vienen del JSON.
    for (const flor of flores) {

        // Si el usuario escribió algo en el buscador, se revisa si coincide.
        // Esto se refleja cuando la página muestra solo flores relacionadas
        // con lo que la persona escribió.
        if (buscarFlor.value !== "") {

            // Guarda el texto escrito en minúscula para comparar mejor.
            let texto = buscarFlor.value.toLowerCase();

            // Revisa si el nombre de la flor coincide con la búsqueda.
            let coincideNombre = flor.nombre.toLowerCase().includes(texto);

            // Variable para saber si algún color coincide con la búsqueda.
            let coincideColor = false;

            // Recorre los colores de la flor.
            for (const color of flor.colores) {

                // Si el color coincide con el texto escrito,
                // entonces coincideColor pasa a true.
                if (color.toLowerCase().includes(texto)) {
                    coincideColor = true;
                }
            }

            // Si no coincide ni el nombre ni el color,
            // esta flor no se muestra en pantalla.
            if (!coincideNombre && !coincideColor) {
                continue;
            }
        }

        // Si el filtro de tipo no está en "Todas"
        // y la flor no coincide con el tipo seleccionado,
        // entonces esa flor no se muestra.
        if (filtroTipo.value !== "Todas" && flor.nombre !== filtroTipo.value) {
            continue;
        }

        // Variable para saber si la flor tiene el color filtrado.
        let tieneColor = false;

        // Recorre todos los colores disponibles de la flor.
        for (const color of flor.colores) {

            // Si algún color de la flor es igual al filtro seleccionado,
            // entonces la flor sí tiene ese color.
            if (color === filtroColor.value) {
                tieneColor = true;
            }
        }

        // Si el filtro de color no está en "Todos"
        // y la flor no tiene ese color, no se muestra.
        if (filtroColor.value !== "Todos" && tieneColor === false) {
            continue;
        }

        // Variable donde se guardan los botones de colores.
        let botonesColores = "";

        // Recorre los colores de cada flor para crear botones.
        for (const color of flor.colores) {

            // Crea un botón por cada color disponible.
            // Se refleja debajo de "Colores disponibles".
            botonesColores += `
                <button class="color-${color}" onclick="seleccionarColor(${flor.id}, '${color}')">
                    ${color}
                </button>
            `;
        }

        // Aquí se crea la tarjeta visual completa de cada flor.
        // Esto es lo que se ve en la página como tarjeta de producto.
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

    // Coloca todas las tarjetas creadas dentro del contenedor de flores.
    // Esto hace que las flores aparezcan en la página.
    contenedorFlores.innerHTML = contenido;
}
/*=====================================================
FUNCIÓN SUMAR CANTIDAD
=====================================================*/
/* Esta función aumenta la cantidad de una flor.
Se refleja en las tarjetas de flores cuando el usuario
presiona el botón "+" y también actualiza el resumen. */

function sumarCantidad(id) {

    // Recorremos todas las flores del arreglo.
    for (const flor of flores) {

        // Buscamos la flor que tenga el mismo id recibido.
        if (flor.id === id) {

            // Aumentamos la cantidad de esa flor en 1.
            flor.cantidad++;
        }
    }

    // Volvemos a mostrar las flores para actualizar
    // el número que aparece en la tarjeta.
    mostrarFlores();

    // Actualizamos el resumen del ramo.
    actualizarResumen();
}


/*=====================================================
FUNCIÓN RESTAR CANTIDAD
=====================================================*/
/* Esta función disminuye la cantidad de una flor.
Se refleja cuando el usuario presiona el botón "-"
en las tarjetas de flores. */

function restarCantidad(id) {

    // Recorremos todas las flores del arreglo.
    for (const flor of flores) {

        // Buscamos la flor por id y verificamos
        // que tenga una cantidad mayor que cero.
        if (flor.id === id && flor.cantidad > 0) {

            // Disminuimos la cantidad en 1.
            flor.cantidad--;
        }
    }

    // Actualizamos las tarjetas para mostrar
    // la nueva cantidad en pantalla.
    mostrarFlores();

    // Actualizamos el resumen del ramo.
    actualizarResumen();
}


/*=====================================================
FUNCIÓN SELECCIONAR COLOR
=====================================================*/
/* Esta función guarda el color seleccionado por el usuario.
Se refleja en el resumen del ramo donde aparece:
"Color: rojo", "Color: blanco", etc. */

function seleccionarColor(id, color) {

    // Recorremos todas las flores.
    for (const flor of flores) {

        // Buscamos la flor que tenga el mismo id.
        if (flor.id === id) {

            // Guardamos el color seleccionado.
            flor.colorSeleccionado = color;
        }
    }

    // Volvemos a mostrar las flores.
    // Esto permite mantener actualizada la información.
    mostrarFlores();

    // Actualizamos el resumen para mostrar
    // el color elegido.
    actualizarResumen();
}
/*=====================================================
FUNCIÓN ACTUALIZAR RESUMEN
=====================================================*/
/* Esta función se encarga de actualizar el resumen del ramo.
Se refleja en el lado derecho de la página, donde aparecen
las flores seleccionadas, extras, subtotal y total final. */

function actualizarResumen() {

    // Variable donde se irá guardando el HTML del resumen.
    let contenidoResumen = "";

    // Variable que almacenará el subtotal de las flores.
    let subtotal = 0;

    // Variable que almacenará el total de los extras.
    let totalExtras = 0;

    // Si la tarjeta está seleccionada,
    // se suman ₡1500 al total de extras.
    if (checkTarjeta.checked) {
        totalExtras += 1500;
    }

    // Si los chocolates están seleccionados,
    // se suman ₡3000 al total de extras.
    if (checkChocolates.checked) {
        totalExtras += 3000;
    }

    // Recorremos todas las flores.
    for (const flor of flores) {

        // Solo se agregan al resumen las flores
        // cuya cantidad sea mayor que cero.
        if (flor.cantidad > 0) {

            // Calculamos el total de esa flor.
            let totalFlor = flor.precio * flor.cantidad;

            // Sumamos el total de la flor al subtotal.
            subtotal = subtotal + totalFlor;

            // Agregamos la información de la flor al resumen.
            // Esto se refleja en el panel derecho de la página.
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

    // Si no hay flores agregadas,
    // se muestra un mensaje indicando que el resumen está vacío.
    if (contenidoResumen === "") {

        listaResumen.innerHTML = `
            <p class="mensaje-vacio">
                Aún no has agregado flores.
            </p>
        `;

    } else {

        // Si sí existen flores seleccionadas,
        // se muestra el resumen completo.
        listaResumen.innerHTML = contenidoResumen;
    }

    // Muestra el subtotal de las flores en el resumen.
    subtotalFlores.innerHTML = "₡" + subtotal;

    // Muestra el total de extras en el resumen.
    totalExtrasTexto.innerHTML = "₡" + totalExtras;

    // Muestra el total general:
    // subtotal + extras + costo de entrega.
    totalGeneral.innerHTML =
        "₡" + (subtotal + totalExtras + costoEntrega);

    // Guarda automáticamente el ramo en localStorage
    // para que no se pierda si el usuario cambia de página.
    guardarRamoPendiente();
}
/*=====================================================
FUNCIÓN GUARDAR RAMO PENDIENTE
=====================================================*/
/* Esta función guarda en localStorage el ramo que el usuario
está armando. Sirve para que el pedido no se pierda si la
persona se va a registrar y luego vuelve a Armar Ramo. */

function guardarRamoPendiente() {

    // Creamos un objeto con la información importante del ramo.
    const ramoPendiente = {

        // Guarda el arreglo de flores con cantidades y colores seleccionados.
        flores: flores,

        // Guarda si el usuario marcó la tarjeta.
        tarjeta: checkTarjeta.checked,

        // Guarda si el usuario marcó chocolates.
        chocolates: checkChocolates.checked
    };

    // Convertimos el objeto a texto JSON y lo guardamos en localStorage.
    localStorage.setItem("ramoPendiente", JSON.stringify(ramoPendiente));
}


/*=====================================================
FUNCIÓN PAGAR
=====================================================*/
/* Esta función se ejecuta cuando el usuario presiona el botón Pagar.
Se refleja cuando aparece una alerta de pago realizado o cuando
manda al usuario a registrarse. */

function pagar() {

    /*=====================================================
VALIDAR QUE EXISTA AL MENOS UNA FLOR
=====================================================*/
    /* Este bloque revisa si el usuario agregó al menos
    una flor al ramo antes de permitir el pago.
    Se refleja mostrando una alerta si el ramo está vacío. */

    // Variable para saber si el usuario agregó flores
    let hayFlores = false;

    // Recorremos todas las flores del arreglo
    for (const flor of flores) {

        // Si encontramos una flor con cantidad mayor que cero
        // significa que sí hay flores en el ramo
        if (flor.cantidad > 0) {

            // Cambiamos la variable a verdadero
            hayFlores = true;
        }
    }

    // Si no hay flores seleccionadas
    if (hayFlores === false) {

        // Mostramos un mensaje al usuario
        alert("Debes agregar al menos una flor al ramo.");

        // Detenemos la función para que no continúe el pago
        return;
    }

    // Revisamos si existe un usuario activo en localStorage.
    const usuarioActivo = localStorage.getItem("usuarioActivo");

    // Si no hay usuario activo, significa que no se ha registrado.
    if (usuarioActivo === null) {

        // Guardamos una señal para saber que debe volver a Armar Ramo.
        localStorage.setItem("volverArmarRamo", "si");

        // Mostramos una alerta al usuario.
        alert("Primero debes registrarte para realizar el pago.");

        // Mandamos al usuario a la página de registro.
        window.location.href = "registro.html";

    } else {

        // Si ya hay usuario registrado, se muestra el pago realizado.
        alert("Pago realizado correctamente. ¡Gracias por tu compra!");

        // Eliminamos el ramo pendiente porque ya se pagó.
        localStorage.removeItem("ramoPendiente");

        // Reiniciamos las cantidades y colores de todas las flores.
        for (const flor of flores) {
            flor.cantidad = 0;
            flor.colorSeleccionado = "";
        }

        // Desmarcamos los extras.
        checkTarjeta.checked = false;
        checkChocolates.checked = false;

        // Volvemos a mostrar las flores limpias.
        mostrarFlores();

        // Actualizamos el resumen para que vuelva a cero.
        actualizarResumen();
    }
}
/*=====================================================
CARGAR FLORES DESDE JSON
=====================================================*/
/* Esta parte se encarga de leer el archivo flores.json.
Se refleja en la página porque gracias a esto aparecen
las tarjetas de flores en la sección "Elige tus flores". */

fetch("data/flores.json")
    // Busca el archivo flores.json dentro de la carpeta data.

    .then(respuesta => respuesta.json())
    // Convierte la respuesta del archivo JSON a datos que JavaScript pueda usar.

    .then(datos => {
        // Cuando los datos ya están listos, se ejecuta este bloque.

        // Guardamos las flores del JSON dentro del arreglo flores.
        flores = datos.flores;

        // Revisamos si ya había un ramo guardado en localStorage.
        const datosRamo = localStorage.getItem("ramoPendiente");

        // Si existe un ramo pendiente, lo recuperamos.
        if (datosRamo !== null) {

            // Convertimos el texto guardado en localStorage a objeto JavaScript.
            const ramoPendiente = JSON.parse(datosRamo);

            // Recuperamos las flores con sus cantidades y colores seleccionados.
            flores = ramoPendiente.flores;

            // Recuperamos si la tarjeta estaba marcada.
            checkTarjeta.checked = ramoPendiente.tarjeta;

            // Recuperamos si los chocolates estaban marcados.
            checkChocolates.checked = ramoPendiente.chocolates;

        } else {

            // Si no había ramo pendiente, iniciamos todas las flores en cero.
            for (const flor of flores) {

                // Cada flor inicia con cantidad cero.
                flor.cantidad = 0;

                // Cada flor inicia sin color seleccionado.
                flor.colorSeleccionado = "";
            }
        }

        // Mostramos las flores en la página.
        mostrarFlores();

        // Mostramos el resumen inicial.
        actualizarResumen();
    });