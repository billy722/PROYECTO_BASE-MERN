import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import User from "../models/User.js";
import { normalizeRut, validateRut } from "../utils/rut.js";
import bcrypt from 'bcryptjs';

const router = express.Router();

//define que todo lo que sigue requiere de login y que usuario sea admin
router.use(authMiddleware);
router.use(requireRole("admin"));

//obtener usuarios
router.get("/", async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.json(users);

    }catch(err){
        res.status(500).json({msg: "Error del servidor"});
    }
});


//POST DE USUARIO CON CON RUT O EMAIL
router.post('/', async (req, res) => {
    try{

        console.log('Body recibido: ', req.body);

        const {name, email, rut, password, role} = req.body;

        if(!password){
            return res.status(400).json({msg: "La contraseña es obligatoria"});
        }

        if (!email && !rut) {
            return res.status(400).json({
              msg: "Debe ingresar email o RUT"
            });
          }

        let normalizedRut = null;

        if (rut) {
            if (!validateRut(rut)) {
              return res.status(400).json({ msg: "RUT inválido" });
            }
            normalizedRut = normalizeRut(rut);
          }
          
          const existeUsuario = await User.findOne({
            $or: [
                email ? { email: email.toLowerCase()} : null,
                normalizedRut ? { rut: normalizedRut } : null
            ].filter(Boolean)
          });
        
          if(existeUsuario) {
            if(existeUsuario.email === email?.toLowerCase()) {
                return res.status(400).json({ msg: "Correo ya registrado" });
            }
            if(existeUsuario.rut === normalizedRut){
                return res.status(400).json({ msg: "RUT ya existe"});
            }
          }

        const hashed = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email,
            password: hashed,
            role
          };

        if (normalizedRut) {
            userData.rut = normalizedRut;
        }  

        const nuevoUsuario = new User(userData);
        await nuevoUsuario.save();

        res.status(201).json({msg: "Usuario creado correctamente"});

    }catch(err){
        res.status(500).json({msg: 'Error en el servidor', error: err.message });
    }
});

//EJEMPLO DE POST SIMPLE
// router.post("/", async (req, res) => {
//     try{
//         const { name, email, rut, password, role} = req.body;

//         const hashed = await bcrypt.hash(password, 10);

//         const user = new User({
//             name, email, rut, password: hashed, role: role || "user"
//         });

//         await user.save();
//         res.status(201).json({msg: "Usuario creado"});

//     }catch(err){
//         res.status(500).json({msg: "Error del servidor"});
//     }
// });

router.put("/:id", async (req, res) => {
    try {
        const { name, email, rut, password, role } = req.body;

        if (!email && !rut) {
            return res.status(400).json({
                msg: "Debe ingresar email o RUT"
            });
        }

        let normalizedRut = null;

        if (rut) {
            if (!validateRut(rut)) {
                return res.status(400).json({ msg: "RUT inválido" });
            }
            normalizedRut = normalizeRut(rut);
        }

        // 🔍 buscar duplicados EXCLUYENDO al usuario actual
        const existeUsuario = await User.findOne({
            _id: { $ne: req.params.id },
            $or: [
                email ? { email: email.toLowerCase() } : null,
                normalizedRut ? { rut: normalizedRut } : null
            ].filter(Boolean)
        });

        if (existeUsuario) {
            if (existeUsuario.email === email?.toLowerCase()) {
                return res.status(400).json({ msg: "Correo ya registrado" });
            }
            if (existeUsuario.rut === normalizedRut) {
                return res.status(400).json({ msg: "RUT ya existe" });
            }
        }

        const updateData = {
            name,
            email: email ? email.toLowerCase() : undefined,
            role
        };

        if (normalizedRut) {
            userData.rut = normalizedRut;
        }  

        // 🔐 solo si viene password
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json({ msg: "Usuario actualizado correctamente" });

    } catch (err) {
        res.status(500).json({
            msg: "Error del servidor",
            error: err.message
        });
    }
});

//EJEMPLO SIMPLE DE UN PUT
// router.put("/:id", async (req, res) => {
//     try {
//         const { name, email, rut, role } = req.body;

//         await User.findByIdAndUpdate(req.params.id, {
//             name,
//             email,
//             rut,
//             role
//         });

//         res.json({ msg: "Usuario actualizado" });
//     } catch (err) {
//         res.status(500).json({ msg: "Error del servidor" });
//     }
// });

router.delete("/:id", async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({msg: "Usuario eliminado correctament"});
    }catch(err){
        res.status(500).json({msg: "Error del servidor"});
    }
});

export default router;