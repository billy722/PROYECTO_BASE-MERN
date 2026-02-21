
export function sendValidationError(res, errors){
    return res.status(400).json({
        type: "validation",
        errors
    });
}