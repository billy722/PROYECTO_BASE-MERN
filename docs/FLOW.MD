# Flujo Completo del Sistema

---

# Crear Usuario

Frontend:

Formulario
→ handleSubmit
→ useUsers hook
→ usersService
→ axiosInstance
→ Backend

Backend:

Route
→ authMiddleware
→ requireRole
→ validateUserInput
→ validateUserBusinessRules
→ User Model
→ MongoDB

Respuesta:

MongoDB
→ Route
→ axios
→ Hook
→ UI

---

# Manejo de Errores

Si error de validación:

{
  type: "validation",
  errors: { campo: "mensaje" }
}

Se muestran en formulario.

Si error de servidor:

Interceptor muestra alerta global.

---

# Update (PATCH)

Solo se actualizan campos enviados.
No se sobreescriben campos no enviados.

---

# Sistema Escalable

Para nuevo módulo:

Backend:
- Model
- Validator
- Service
- Route

Frontend:
- Feature
- Hook
- Service
- Page
- Components

Seguir patrón existente.