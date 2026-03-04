import jwt from "jsonwebtoken";
import User from "../models/User";

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    //verificar que exista headers Authorization
    if(!authHeader){
        return res.status(401).json({msg: "No autorizado, token faltante"});
    }

    //extraer el token
    const token = authHeader.split(" ")[1]; //Bearer TOKEN

    try{
        //verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // consulta en db los datos del usuario logeado
        const user = await User.findById(decoded.id);

        if(!user){
            return res.status(401).json({message: "Usuario no existe."});
        }

        //Guardar usuario en la request
        req.user = user; //usuario de la bd a la request

        next(); //seguir a la ruta

    }catch(err){
        return res.status(401).json({ msg: "Token inválido o expirado"})
    }

};

export default authMiddleware;