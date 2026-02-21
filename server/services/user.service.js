// Aquí validamos:
// Email ya existe
// RUT ya existe

import User from "../models/User.js";
import { normalizeRut } from "../utils/rut.js";

export async function validateUserBussinessRules(data){
    const { email, rut } = data;

    const errors = {};
    let normalizedRut = null;

    if(rut){
        normalizedRut = normalizeRut(rut);
    }

    const existingUser = await User.findOne({
        $or: [
            email ? { email: email.toLowerCase()} : null,
            rut ? { rut : normalizedRut } : null
        ].filter(Boolean)
    });

    if(existingUser){
        if(existingUser.email === email?.toLowerCase()){
            errors.email = "Correo ya registrado."
        }
        if(existingUser.rut === normalizedRut){
            errors.rut = "RUT ya existe."
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}