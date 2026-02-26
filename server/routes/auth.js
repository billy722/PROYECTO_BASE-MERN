import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import { normalizeRut, validateRut } from '../utils/rut.js';

const router = express.Router();

//REGISTRAR USUARIO

router.post('/register', async (req, res, next) => {
    try{

        console.log('Body recibido: ', req.body);

        const {name, email, rut, password, role} = req.body;

        if (!email && !rut) {
            return res.status(400).json({
              message: "Debe ingresar email o RUT"
            });
          }

        let normalizedRut = null;

        if (rut) {
            if (!validateRut(rut)) {
              return res.status(400).json({ message: "RUT inválido" });
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
                return res.status(400).json({ message: "Correo ya registrado" });
            }
            if(existeUsuario.rut === normalizedRut){
                return res.status(400).json({ message: "RUT ya existe"});
            }
          }

        const hashed = await bcrypt.hash(password, 10);
        const nuevoUsuario = new User({name, email, rut: normalizedRut,password:hashed, role});
        await nuevoUsuario.save();

        res.json({message: "Usuario creado correctamente"});

    }catch(err){
        next(err);
    }
});

//LOGIN

router.post('/login', async (req,res, next) => {
    try{

        const {identifier, password} = req.body;


        const usuario = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { rut: normalizeRut(identifier) }
            ]
        });

        if(!usuario) return res.status(400).json({message: 'Credenciales incorrectas'});

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(400).json({message: 'Credenciasles incorrectas'});

        const token = jwt.sign(
            {id: usuario._id, role: usuario.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {name: usuario.name, role: usuario.role}
        });

    }catch(err){
        next(err);
    }
});

//OBTENER USUARIO LOGEADO
router.get("/me", authMiddleware, async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        res.json(user);

    }catch(err){
        next(err);
    }
});

export default router;