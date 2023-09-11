import { crearMenu } from "./scripts/menu.js";

const $menuEsmaltes = document.querySelector('#menu-contenedor');
const API_ESMALTES = 'https://run.mocky.io/v3/49bec925-1ab8-46ca-8d95-e35c38b6a515';

crearMenu(API_ESMALTES);
