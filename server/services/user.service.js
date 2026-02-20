// Aquí validamos:
// Email ya existe
// RUT ya existe

import User from "../models/User";
import { normalizeRut } from "../utils/rut";

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
        if(existingUser.rut === normalizeRut){
            errors.rut = "RUT ya existe."
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}