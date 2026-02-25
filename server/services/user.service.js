// Aquí validamos:
// Email ya existe
// RUT ya existe

import User from "../models/User.js";
import { normalizeRut } from "../utils/rut.js";
import bcrypt from 'bcryptjs';

export async function validateUserBussinessRules(data, userId = null){
    const { email, rut } = data;

    const errors = {};
    let normalizedRut = null;

    if(rut){
        normalizedRut = normalizeRut(rut);
    }

    const query = [];

    if(email){
        query.push({email: email.toLowerCase()});
    }
    if(rut){
        query.push({rut: normalizedRut});
    }

    if(query.length === 0) return null;

    const existingUser = await User.findOne({
        $or: query,
            ...(userId && {_id: {$ne: userId}})
    });

    if(existingUser){
        if(email && existingUser.email === email.toLowerCase()){
            errors.email = "Correo ya registrado."
        }
        if(rut && existingUser.rut === normalizedRut){
            errors.rut = "RUT ya existe."
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

export async function buildUserUpdateData(data){
    const { name, email, rut, password, role} = data;
    const updateData = {};

        //se actulaiza nombre
        if(name !== undefined){
            updateData.name = name;
        } 

        // se actualiza email
        if(email !== undefined){
            updateData.email = email.toLowerCase();
        }

        //se actualiza rut
        if(rut !== undefined){
            updateData.rut = normalizeRut(rut);
        }

        // contraseña
        if(password){
            updateData.password = await bcrypt.hash(password, 10);
        }
        // role
        if(role !== undefined){
            updateData.role = role;
        }
        
    return updateData;
}