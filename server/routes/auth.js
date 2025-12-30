import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//REGISTRAR USUARIO

router.post('/register', async (req, res) => {
    try{

        console.log('Body recibido: ', req.body);

        const {name, email, password, role} = req.body;

        const existe = await User.findOne({email});
        if(existe) return res.status(400).json({msg: 'Usuario existe'});

        const hashed = await bcrypt.hash(password, 10);
        const nuevoUsuario = new User({name, email,password:hashed, role});
        await nuevoUsuario.save();

        res.json({msg: "Usuario creado correctamente"});

    }catch(err){
        res.status(500).json({msg: 'Error en el servidor', error: err.message });
    }
});

//LOGIN

router.post('/login', async (req,res) => {
    try{

        const {email, password} = req.body;

        const usuario = await User.findOne({email});
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