export function errorHandler(err, req, res, next){
    console.error("🔥 ERROR:", err);

    // ERROR DE MONGOOSE POR ID INVALIDO
    if(err.name === "CastError"){
        return res.status(400).json({
            type: "validation",
            message: "ID inválido"
        });
    }

    //si el error ya tiene status lo mostramos, si no status es 500
    const status = err.status || 500;

    res.status(status).json({
        type: "server",
        message: err.message || "Error interno del servidor"
    });
}