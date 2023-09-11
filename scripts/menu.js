const $menuEsmaltes = document.querySelector('#menu-contenedor');
const API_URL = 'https://run.mocky.io/v3/49bec925-1ab8-46ca-8d95-e35c38b6a515';

export const crearMenu = async (url) => {

    const respuesta = await fetch(url);
    const data = await respuesta.json();

    data.esmaltes.forEach(esmalte => {
        const contenedor = document.createElement('div');
        const nombre = document.createElement('p');
        const descripcion = document.createElement('p');
    
        nombre.textContent = esmalte.colores;
        descripcion.textContent = `(${esmalte.descripcion})`;
    
        contenedor.append(nombre, descripcion);
        $menuEsmaltes.appendChild(contenedor);
    });
};
