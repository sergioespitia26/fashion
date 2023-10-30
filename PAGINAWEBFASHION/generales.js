// Obtén elementos del DOM
const productos = document.querySelectorAll('.producto');
const carrito = document.getElementById('carrito');
const botonFinalizarCompra = document.getElementById('finalizarCompra');
const totalElement = document.getElementById('total');

// Array para rastrear los productos en el carrito
let carritoProductos = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    const nombre = producto.querySelector('h3').textContent;
    const precio = parseFloat(producto.querySelector('p').getAttribute('data-precio'));
    const color = producto.querySelector('.seleccion-color').value;
    const talla = producto.querySelector('.seleccion-talla').value;

    const itemCarrito = { nombre, precio, color, talla };
    carritoProductos.push(itemCarrito);

    // Crear un elemento en el carrito
    const li = document.createElement('li');
    li.textContent = `Nombre: ${nombre}, Precio: $${precio.toFixed(2)}, Color: ${color}, Talla: ${talla}`;
    
    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<i class="fas fa-times"></i>'; // Aquí se agrega el ícono de "x" de Font Awesome
    botonEliminar.classList.add('eliminar-item'); // Agregar una clase para estilizar el botón
    botonEliminar.addEventListener('click', () => {
        eliminarDelCarrito(carritoProductos.indexOf(itemCarrito));
    });
    
    li.appendChild(botonEliminar);
    carrito.appendChild(li);

    

    // Actualizar el total
    calcularTotal();
    guardarCarritoEnLocalStorage();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carritoProductos.splice(index, 1);
    actualizarCarrito();
    calcularTotal();
    guardarCarritoEnLocalStorage();
}

// Actualiza el carrito después de eliminar un producto
function actualizarCarrito() {
    const listaCarrito = document.getElementById('carrito');
    listaCarrito.innerHTML = '';

    carritoProductos.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            Nombre: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}, Color: ${producto.color}, Talla: ${producto.talla}
            <button class="eliminar-item"><i class="fas fa-times"></i></button>
        `;

        const botonEliminar = li.querySelector('.eliminar-item');
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(index);
        });

        listaCarrito.appendChild(li);
    });
}



// Función para calcular el total del carrito
function calcularTotal() {
    const total = carritoProductos.reduce((acumulador, producto) => {
        return acumulador + producto.precio;
    }, 0);

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Guarda el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritoProductos));
}

// Recupera los datos del carrito del almacenamiento local (si existen)
if (localStorage.getItem('carrito')) {
    carritoProductos = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
    calcularTotal();
}

// Agrega productos al carrito al hacer clic en los botones "Agregar al Carrito"
productos.forEach(producto => {
    const botonAgregar = producto.querySelector('.agregar-al-carrito');
    botonAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto);
    });
});

// Función para finalizar la compra
// Función para finalizar la compra
botonFinalizarCompra.addEventListener('click', () => {
    if (carritoProductos.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    } else {
        // Crear un mensaje de WhatsApp con los detalles de la compra y el total
        const detallesCompra = carritoProductos.map(producto => {
            return `Nombre: ${producto.nombre}, Precio: $${producto.precio.toFixed(2)}, Color: ${producto.color}, Talla: ${producto.talla}`;
        });

        const totalCompra = carritoProductos.reduce((acumulador, producto) => {
            return acumulador + producto.precio;
        }, 0);

        detallesCompra.push(`Total de la compra: $${totalCompra.toFixed(2)}`);

        const mensajeWhatsApp = `¡Hola... GLAMOUR FASHION esta es la compra que quiero realizar!\n\nDetalles de la compra:\n${detallesCompra.join('\n')}`;

        // Reemplaza 'NUMERODETELEFONO' con el número de teléfono al que deseas enviar el mensaje
        const numeroDeTelefono = '573174899803';

        // Abre WhatsApp con el mensaje predefinido
        window.open(`https://wa.me/${numeroDeTelefono}?text=${encodeURIComponent(mensajeWhatsApp)}`, '_blank');
        alert("Compra finalizada. Se procesará el pago y se enviará un mensaje de WhatsApp.");

        // Limpia el carrito después de finalizar la compra
        carritoProductos = [];
        actualizarCarrito();
        calcularTotal();
        localStorage.removeItem('carrito');
    }
});



const botonCarrito = document.getElementById('botoncarrito');
const botonCerrarCarrito = document.getElementById('cerrarCarrito');
const cartContainer = document.getElementById('cartContainer');

// Mostrar el carrito al hacer clic en el botón
botonCarrito.addEventListener('click', function() {
    cartContainer.style.display = 'block';
});

// Ocultar el carrito al hacer clic en el botón de cerrar carrito
botonCerrarCarrito.addEventListener('click', function() {
    cartContainer.style.display = 'none';
});


productos.forEach(producto => {
    const seleccionColor = producto.querySelector('.seleccion-color');
    const imagenProducto = producto.querySelector('img');

    seleccionColor.addEventListener('change', function () {
        const nuevaImagen = seleccionColor.options[seleccionColor.selectedIndex].getAttribute('data-imagen');
        imagenProducto.src = nuevaImagen;
    });

    // Resto de tu código para agregar productos al carrito...
});



// JavaScript para ocultar/mostrar el encabezado y el campo de búsqueda al hacer scroll
var pageHeader = document.getElementById("pageHeader");
var searchContainer = document.getElementById("searchContainer");
var cartLink = document.getElementById("cartLink");
var hamburger = document.querySelector(".hamburger");
var isHeaderVisible = true;

var lastScrollTop = 0;

// Detectar el evento de scroll
// Detectar el evento de scroll
window.addEventListener("scroll", function () {
    var scrollTop = window.scrollY || window.pageYOffset;

    if (scrollTop > lastScrollTop && isHeaderVisible) {
        // Si has hecho scroll hacia abajo y el encabezado es visible, ocúltalo
        pageHeader.classList.add("hidden");
        searchContainer.style.opacity = 0;
        cartLink.style.opacity = 0;
        hamburger.style.opacity = 0;
        isHeaderVisible = false;
    } else if (scrollTop < lastScrollTop && !isHeaderVisible) {
        // Si has hecho scroll hacia arriba y el encabezado no es visible, muéstralo
        pageHeader.classList.remove("hidden");
        searchContainer.style.opacity = 1;
        cartLink.style.opacity = 1;
        hamburger.style.opacity = 1;
        isHeaderVisible = true;
    }

    lastScrollTop = scrollTop;
});


// JavaScript para realizar la búsqueda




// JavaScript para el menú desplegable en pantallas pequeñas
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    hamburger.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});


document.querySelector(".hamburger").addEventListener("click", AnimateBar);
var line1__bar = document.querySelector(".line1__bar-hamburger");
var line2__bar = document.querySelector(".line2__bar-hamburger");
var line3__bar = document.querySelector(".line3__bar-hamburger");

function AnimateBar(){
    line2__bar.classList.toggle(".hamburger:active .line1__bar");
    line2__bar.classList.toggle(".hamburger:active .line2__bar");
    line3__bar.classList.toggle(".hamburger:active .line3__bar");
}

// Datos de ejemplo para la ropa (reemplaza con tus datos reales)
// Datos de ejemplo para la ropa (reemplaza con tus datos reales)
const ropa = [
    { nombre: "Camiseta", descripcion: "Una camiseta elegante.", precio: 20 },
    { nombre: "Pantalones", descripcion: "Pantalones cómodos.", precio: 30 },
    { nombre: "Vestido", descripcion: "Un vestido hermoso.", precio: 50 },
    // Agrega más elementos de ropa aquí
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();
    const filteredRopa = ropa.filter(item => {
        // Puedes personalizar cómo se realiza la búsqueda aquí
        return item.nombre.toLowerCase().includes(searchText) || item.descripcion.toLowerCase().includes(searchText);
    });

    displaySearchResults(filteredRopa);
});

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = "No se encontraron resultados.";
    } else {
        searchResults.innerHTML = "";
        results.forEach((item, index) => {
            const resultItem = document.createElement("div");
            resultItem.classList.add("ropa-item");
            resultItem.innerHTML = `
                <h3>${item.nombre}</h3>
                <p>${item.descripcion}</p>
                <p>Precio: $${item.precio}</p>
            `;
            resultItem.addEventListener("click", () => {
                // Dirigirse al resultado y limpiar el cuadro de búsqueda
                window.location.hash = `result-${index}`;
                searchInput.value = "";
                searchResults.innerHTML = "";
            });
            searchResults.appendChild(resultItem);
        });
    }
}

// Obtener el índice de resultado desde la URL para navegar a través de enlaces
window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#result-")) {
        const index = parseInt(hash.substring(8));
        if (!isNaN(index) && index >= 0 && index < ropa.length) {
            // Puedes realizar acciones específicas aquí al hacer clic en un resultado.
        }
    }
});
