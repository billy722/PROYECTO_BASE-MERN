import Role from "../models/Role.js";

export const requirePermission = (permission) =>  {

    return async (req, res, next) => {
        try{
            const userRole = await Role.findById(req.user.role);

            if(!userRole){
                return res.status(403).json({ message: "Rol no válido."});
            }

            if(userRole.includes("*")){
                next();
            }

            if(!userRole.permissions.includes(permission)){
                return res.status(403).json({ message: "No autorizado."});
            }

            next();

        }catch(error){
            next(error);
        }
    };
};