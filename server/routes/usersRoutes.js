import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { requireRole } from "../middlewares/roleMiddleware.js";
import User from "../models/User.js";
import { normalizeRut, validateRut } from "../utils/rut.js";
import bcrypt from 'bcryptjs';
import { validateUserInput } from "../validators/user.validator.js";
import { validateUserBussinessRules, buildUserUpdateData } from "../services/user.service.js";
import { sendValidationError } from "../utils/sendValidationError.js";


const router = express.Router();

//define que todo lo que sigue requiere de login y que usuario sea admin
router.use(authMiddleware);
router.use(requireRole("admin"));

//obtener usuarios
router.get("/", async (req, res, next) => {
    try{
        const users = await User.find().select("-password");
        res.json(users);

    }catch(err){
        next(err);
    }
});


//POST DE USUARIO CON CON RUT O EMAIL
router.post('/', async (req, res, next) => {
    try{
        const validationErrors = {};

        //VALIDACIONES DE FORMATO
        const inputErrors = validateUserInput(req.body, false)
        if(inputErrors){
            return sendValidationError(res, inputErrors)
        } 
          
        //AHORA CONSULTAMOS A BD
        const bussinessErrors = await validateUserBussinessRules(req.body);
        if(bussinessErrors){
            return sendValidationError(res, bussinessErrors)
        }

        // CREAMOS USUARIO
        const { name, email, rut , password, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const userData = {
            name,
            email: email?.toLowerCase(),
            password: hashed,
            role
          };

        if (rut) {
            userData.rut = normalizeRut(rut);
        }  

        const nuevoUsuario = new User(userData);
        await nuevoUsuario.save();

        res.status(201).json({message: "Usuario creado correctamente"});

    }catch(err){
        next(err);
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
//         res.status(201).json({message: "Usuario creado"});

//     }catch(err){
//         res.status(500).json({message: "Error del servidor"});
//     }
// });

router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        // solo admin puede editar usuarios
        if(req.user.role !== "admin"){
            return res.status(403).json({message: "Usuario no autorizado"});
        }

        const inputErrors = await validateUserInput(req.body, true);
        if(inputErrors){
            return sendValidationError(res, inputErrors);
        }

        const bussinessErrors = await validateUserBussinessRules(req.body, id);
        if(bussinessErrors){
            return sendValidationError(res, bussinessErrors);
        }
        
        const updateData = await buildUserUpdateData(req.body);
        console.log(updateData)

        // hacemos los cambios
        const updatedUser = await User.findByIdAndUpdate(id, updateData, {new: true});

        if(!updatedUser){
           return res.status(404).json({message: "Usuario no encontrado."});
        }
        
        res.status(200).json({ message: "Usuario actualizado correctamente" });

    } catch (err) {
        next(err);
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

//         res.json({ message: "Usuario actualizado" });
//     } catch (err) {
//         res.status(500).json({ message: "Error del servidor" });
//     }
// });

router.delete("/:id", async (req, res, next) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "Usuario eliminado correctamente"});
    }catch(err){
        next(err);
    }
});

router.get("/test-error", (req, res) => {
    throw new Error("Error forzado");
  });

export default router;