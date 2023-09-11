const $ = document.querySelector.bind(document);
const $menu = $('#menu');
const $opciones = $('#opciones');
const $pedido = $('#pedido');
const $contenedorFinalizar = $('#finalizar');
const $colores = $('#colores')
const $cantidad = $('#cantidad');
const $botonSumar = $('#boton-sumar');
const $botonRestar = $('#boton-restar');
const $botonProcesarPedido = $('#procesar-pedido');
const $botonFinalizar = $('#boton-finalizar');
const $contenedorDePago = $('#contenedor-pago');


const API_URL = 'https://run.mocky.io/v3/49bec925-1ab8-46ca-8d95-e35c38b6a515';
const PRECIO_UNIDAD = 7500;


const botonAgregar = document.createElement('button');
botonAgregar.id = 'boton-agregar';
botonAgregar.textContent = 'Agregar esmaltes';

const botonFinalizar = document.createElement('button');
botonFinalizar.id = 'boton-finalizar';
botonFinalizar.textContent = 'Finalizar pedido';


const crearInputColores = (value, id) => {
    const colores = document.createElement('input');
    colores.disabled = true;
    colores.type = 'text';
    colores.className = 'colores';
    colores.id = id;
    colores.value = value;
    return colores;
};

const crearInputCantidad = (value, id) => {
    const cantidad = document.createElement('input');
    cantidad.disabled = true;
    cantidad.type = 'number';
    cantidad.className = 'cantidad';
    cantidad.id = id;
    cantidad.value = value;
    return cantidad;
};

const crearBotonSumar = () => {
    const boton = document.createElement('button');
    boton.textContent = '+';
    boton.className = 'boton-sumar';
    return boton;
};

const crearBotonRestar = () => {
    const boton = document.createElement('button');
    boton.textContent = '-';
    boton.className = 'boton-restar';
    return boton;
};

const agregarOpcionAlMenuOpciones = (value, id) => {
    let cantidadIngresada = 0;

    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-opcion';
    const cantidad = crearInputCantidad(cantidadIngresada, `cantidad${id}`);
    const botonSumar = crearBotonSumar();
    const botonRestar = crearBotonRestar();

    contenedor.append(
        crearInputColores(value, `colores${id}`),
        cantidad,
        botonRestar,
        botonSumar
    );

    botonSumar.addEventListener('click',() => {
        cantidadIngresada++;
        cantidad.value = cantidadIngresada;
    });

    botonRestar.addEventListener('click', () => {
        if (cantidadIngresada > 0) {
            cantidadIngresada--;
            cantidad.value = cantidadIngresada;
        }
    });

    return contenedor;
};

const crearMenuDeOpciones = async (url) => {
    
    const titulo = document.createElement('div');
    titulo.className = 'opciones-titulo';
    titulo.innerHTML = '<h3>Agrega tus esmaltes:</h3>';
    $opciones.append(titulo);
    
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    
    let id = 0;
    data.esmaltes.forEach(esmalte => {
        id++;
        const opcion = agregarOpcionAlMenuOpciones(esmalte.colores, id);
        $opciones.append(opcion);
    });
    $opciones.append(botonAgregar);
};


const carrito = [];

const agregarColoresAlCarrito = () => {
    
    const coloresIngresados = document.querySelectorAll('.colores');
    let id = 0;

    coloresIngresados.forEach(colores => {
        id++;
        const cantidad = Number(document.querySelector(`#cantidad${id}`).value);

        if (cantidad > 0) {
            carrito.push({colores: colores.value, cantidad: cantidad});
        }
    });
};

const vaciarPedido = (carrito) => {
    while (carrito.length > 0) {
        carrito.pop();
    };
};

const finalizarPedido = () => {
    swal({
        title: "¡Gracias por tu compra!",
        text: `Abonaste: $${cantidadDelPedido * PRECIO_UNIDAD}`,
        icon: "success",
        button: "Finalizar",
        className: "modal-sweetalert"
      });
};

crearMenuDeOpciones(API_URL);

const recargarMenuDeOpciones = () => {
    $opciones.innerHTML = '';
    crearMenuDeOpciones(API_URL);
};

const $carrito = $('#carrito');
const $coloresElegidos = $('#colores-elegidos');
const $cantidadesElegidas = $('#cantidades-elegidas');

botonAgregar.addEventListener('click', () => {

    
    vaciarPedido(carrito);
        agregarColoresAlCarrito();
    recargarMenuDeOpciones();
    

    const cantidades = document.querySelectorAll('.cantidad');
    cantidades.forEach(cantidad => {
        cantidad.value = 0;
    });

        carrito.forEach(producto => {
            const texto = document.createElement('p');
        texto.textContent = `> ${producto.colores}`;
        texto.className = 'producto';
            $coloresElegidos.append(texto);

            const cantidad = document.createElement('p');
        cantidad.textContent = `${producto.cantidad}`;
        cantidad.id = 'cantidadFinal';
            $cantidadesElegidas.append(cantidad);
    });

});


const $botonVaciarCarrito = document.querySelector('#vaciar-pedido');
$botonVaciarCarrito.addEventListener('click', () => {
    vaciarPedido(carrito);
    $coloresElegidos.innerHTML = '';
    $cantidadesElegidas.innerHTML = '';
});

let cantidadDelPedido = 0;
let clickBotonIrAPagar = 0;

$botonProcesarPedido.addEventListener('click', () => {

    clickBotonIrAPagar++;

    const carritoFinal = document.querySelectorAll('#cantidadFinal');
    carritoFinal.forEach(producto => {
        const cantidad = Number(producto.innerHTML);
        cantidadDelPedido += cantidad;
    });

    if (clickBotonIrAPagar === 1) {
        if (cantidadDelPedido > 0) {
            const mensajeFinal = document.createElement('p');
            mensajeFinal.textContent = `Tu total es de: $ ${cantidadDelPedido * PRECIO_UNIDAD}`;
            $contenedorDePago.append(mensajeFinal);
            $contenedorDePago.append(botonFinalizar);
            $contenedorDePago.className = 'contenedor-pago';
        } else {
            clickBotonIrAPagar = 0;
        }
    };

    $contenedorModal.classList.remove('contenedor-modal-activo');

});


let clickBotonFinalizar = 0;

botonFinalizar.addEventListener('click', () => {

    clickBotonFinalizar++;

    if (clickBotonFinalizar === 1) {
        if (cantidadDelPedido > 0) {
            finalizarPedido();
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        } else {
            clickBotonFinalizar = 0;
        }
    }
});



// CARRITO
const $contenedorModal = document.querySelector('#contenedor-modal');
const $modal = document.querySelector('#modal');
const $botonAbrirModal = document.querySelector('#modal-abrir');
const $botonCerrarModal = document.querySelector('#modal-cerrar');

$botonAbrirModal.addEventListener('click', () => {
    $contenedorModal.classList.add('contenedor-modal-activo');
});

$botonCerrarModal.addEventListener('click', () => {
    $contenedorModal.classList.remove('contenedor-modal-activo');
});

window.addEventListener('click', (evento) => {
    if (evento.target.id === 'contenedor-modal') {
        $contenedorModal.classList.remove('contenedor-modal-activo');
    }
});
