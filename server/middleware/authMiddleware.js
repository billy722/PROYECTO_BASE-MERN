import jwt from "jsonwebtoken";


const authMiddleware = (req, res, next) => {

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

        //Guardar usuario en la request
        req.user = decoded; //{id, role, iat, exp}

        next(); //seguir a la ruta

    }catch(err){
        return res.status(401).json({ msg: "Token inválido o expirado"})
    }

};

export default authMiddleware;