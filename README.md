# MERN Starter – React + Node + JWT

Este repositorio es un **starter MERN profesional** pensado para servir como base reutilizable para aplicaciones reales.

## 🎯 Objetivos del proyecto

* Tener una base sólida para futuras apps (CRUDs, dashboards, apps MERN)
* Mantener una arquitectura clara y escalable
* Separar infraestructura de lógica de negocio
* Facilitar reutilización y mantenimiento

---

## 🧱 Arquitectura general

### Frontend (React)

* React + Vite
* Context API + Custom Hooks
* Axios con interceptores
* Manejo global de UI
* CSS puro, organizado por capas

### Backend (Node / Express)

* Autenticación JWT
* Middleware de protección de rutas
* Conexión a base de datos
* Endpoints REST

---

## 🔐 Autenticación (CORE)

La autenticación es parte **central** del starter.

Incluye:

* Login real contra backend
* JWT almacenado en localStorage
* Validación del token en cada request
* Middleware de protección en backend
* Contexto de autenticación en frontend
* Interceptores Axios para manejo de sesión

> La app **no puede funcionar sin auth**. Por eso es parte del core.

---

## 🌐 Axios + UI global

Axios está configurado con interceptores para:

* Mostrar / ocultar loader global
* Adjuntar token automáticamente
* Manejar errores HTTP
* Detectar sesión expirada (401)

### UI global disponible desde cualquier capa

* Loader global
* Alertas informativas
* Modales de confirmación / advertencia

Esto se logra mediante un sistema de `uiEvents` que desacopla Axios de React.

---

## 🎨 Sistema de UI

### Theme

* Light / Dark
* Manejo por CSS Variables
* Persistencia en localStorage
* Toggle en Navbar

### Alertas

* Informativas
* Temporales
* Pensadas para feedback rápido

### Modales

* Informativos
* Confirmación (warning / danger)
* Pensados para decisiones del usuario

---

## 📦 Organización de estilos

```txt
styles/
  globals.css
  base/
  utilities/
  components/
```

* CSS puro (sin frameworks)
* Variables CSS
* Separación clara de responsabilidades

---

## 👥 CRUD de Usuarios (EJEMPLO)

El proyecto incluye un **CRUD simple de usuarios** como **feature de referencia**.

### ¿Por qué existe?

* Mostrar cómo implementar un CRUD real usando esta arquitectura
* Servir como guía para futuras features
* Validar que el starter escala correctamente

### Qué incluye

* Listar usuarios
* Crear usuario
* Editar usuario
* Eliminar usuario

### Qué NO pretende ser

* Un sistema completo de administración
* Un modelo definitivo de usuarios
* Lógica de negocio compleja

> Este CRUD es un **ejemplo**, no una obligación. Puede eliminarse sin afectar el core.

---

## 📁 Estructura de features (frontend)

```txt
features/
  auth/        // core
  users/       // ejemplo de CRUD
```

Regla principal:

> Auth es infraestructura. Users es una feature.

---

## 🧠 Principios arquitectónicos

* Separación de responsabilidades
* Infraestructura primero
* Features desacopladas
* UI reactiva y controlada
* Servicios aislados

---

## 🚀 Cómo usar este starter

1. Clona el repositorio
2. Configura variables de entorno
3. Levanta backend y frontend
4. Usa el CRUD de usuarios como referencia
5. Crea nuevas features siguiendo el mismo patrón

---

## 📝 Nota final

Este proyecto está pensado para **aprender haciendo**, con una base que no se cae cuando la app crece.

Si algo parece "más largo" de lo necesario, probablemente está así para:

* ser claro
* ser escalable
* ser entendible en el futuro

---
