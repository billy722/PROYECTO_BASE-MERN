export const normalizeRut = (rut) => {
    return rut 
    .replace(/\./g, "")
    .replace("-", "")
    .toUpperCase();
}

export const validateRut = (rut) => {
    if (!rut) return false;
  
    const clean = normalizeRut(rut);
    if (clean.length < 2) return false;
  
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1);
  
    let sum = 0;
    let multiplier = 2;
  
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
  
    const mod = 11 - (sum % 11);
    const calculatedDv =
      mod === 11 ? "0" : mod === 10 ? "K" : mod.toString();
  
    return calculatedDv === dv;
  };
  