export function requireRole(role){

    return(req, res, next) => {
        if(!req.user){
            return res.status(401).json({msg: "No autenticado"});
        }

        if (req.user.role !== role){
            return res.status(403).json({msg: "Acceso denegado"});
        }

        next();
    };
}