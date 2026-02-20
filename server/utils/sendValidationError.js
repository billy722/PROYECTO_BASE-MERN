
export function sendValidationError(res, erros){
    return res.status(400).json({
        type: "validation",
        errors
    });
}