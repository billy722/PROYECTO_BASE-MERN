// Estas validan cosas como:
// Campos requeridos
// Formato de RUT
// Email válido
// Password obligatorio

import { validateRut } from "../utils/rut.js";

export function validateUserInput(data){
    const {name, email, rut, password} = data;

    const errors = {};

    if (!name || name.trim() === "" ){
        errors.mame = "El nombre es obligatorio.";
    }

    if(!password){
        errors.password = "La contraseña es obligatoria.";
    }

    if(!email && !rut){
        errors.general = "Debe ingresar email o RUT";
    }

    if(rut && !validateRut(rut)){
        errors.rut = "RUT inválido.";
    }

    return Object.keys(errors).lenght > 0 ? errors : null;

}