import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import authMiddleware from '../middlewares/authMiddleware.js';
import { normalizeRut, validateRut } from '../utils/rut.js';

const router = express.Router();

//REGISTRAR USUARIO

router.post('/register', async (req, res) => {
    try{

        console.log('Body recibido: ', req.body);

        const {name, email, rut, password, role} = req.body;

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
        const nuevoUsuario = new User({name, email, rut: normalizedRut,password:hashed, role});
        await nuevoUsuario.save();

        res.json({msg: "Usuario creado correctamente"});

    }catch(err){
        res.status(500).json({msg: 'Error en el servidor', error: err.message });
    }
});

//LOGIN

router.post('/login', async (req,res) => {
    try{

        const {identifier, password} = req.body;


        const usuario = await User.findOne({
            $or: [
                { email: identifier.toLowerCase() },
                { rut: normalizeRut(identifier) }
            ]
        });

        if(!usuario) return res.status(400).json({msg: 'Credenciales incorrectas'});

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(400).json({msg: 'Credenciasles incorrectas'});

        const token = jwt.sign(
            {id: usuario._id, role: usuario.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.json({
            msg: 'Login exitoso',
            token,
            user: {name: usuario.name, role: usuario.role}
        });

    }catch(err){
        res.status(500).json({msg: 'Error en el servidor', error: err.message});
    }
});

//OBTENER USUARIO LOGEADO
router.get("/me", authMiddleware, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({msg: "Usuario no encontrado"});
        }

        res.json(user);

    }catch(err){
        res.status(500).json({msg: "Error del servidor"});
    }
});

export default router;