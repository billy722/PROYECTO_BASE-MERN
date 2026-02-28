# Arquitectura del Proyecto

---

# Frontend

## Organización por Features

Cada módulo se organiza así:

features/
  module/
    components/
    pages/
    services/
    hooks/

### Responsabilidades

- pages → vistas principales
- components → UI
- services → llamadas HTTP
- hooks → lógica del módulo

---

# Backend

## Estructura

models/
routes/
services/
validators/
middlewares/
utils/

---

## Flujo de un Endpoint

1. Route recibe request
2. Middleware valida auth
3. Validator valida formato
4. Service valida reglas de negocio
5. Model interactúa con DB
6. Respuesta al cliente

---

## Manejo de Errores

Todos los errores pasan por:

errorHandler.js

Tipos:

- validation
- auth
- server

---

## Regla de Oro

Nunca mezclar:

- Lógica de negocio en routes
- Validaciones de formato en services
- Acceso a DB desde frontend