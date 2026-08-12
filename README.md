# 🛒 E-Commerce Backend API

El desarrollo de este sistema surge con el propósito de satisfacer las necesidades asociadas a la operación de un comercio electrónico, proporcionando una solución que permita gestionar de manera eficiente los productos, usuarios, carritos de compra y pedidos, al mismo tiempo que amplía la visibilidad de los productos y facilita el acceso de los clientes a la oferta comercial.

Backend desarrollado con **Node.js**, **Express**, **MongoDB** y **Mongoose** para un sistema de comercio electrónico.

Este proyecto implementa una API REST con autenticación mediante JWT, manejo de usuarios, productos, categorías, roles, carrito de compras y pedidos.

---

# 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv
- Nodemon
- pnpm

---

# 📂 Estructura del proyecto

```
backend/
│
├── src/
│   ├── config/
│   │     database.js
│   │
│   ├── controllers/
│   │     usuario.controller.js
│   │     producto.controller.js
│   │     categoria.controller.js
│   │     rol.controller.js
│   │     carrito.controller.js
│   │     pedido.controller.js
│   │     detallePedido.controller.js
│   │     cliente.controller.js
│   │     proveedor.controller.js
│   │
│   ├── middlewares/
│   │     auth.middleware.js
│   │
│   ├── models/
│   │     users.model.js
│   │     product.model.js
│   │     categoria.model.js
│   │     rol.model.js
│   │     carrito.model.js
│   │     pedido.model.js
│   │     detallePedido.model.js
│   │     cliente.model.js
│   │     proveedor.model.js
│   │
│   ├── routes/
│   │     users.routes.js
│   │     productos.routes.js
│   │     categorias.routes.js
│   │     roles.routes.js
│   │     carrito.routes.js
│   │     pedidos.routes.js
│   │     detallePedido.routes.js
│   │     clientes.routes.js
│   │     proveedores.routes.js
│
├── .env
├── app.js
├── package.json
└── README.md
```

---

# ⚙ Instalación

Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/e-commerce.git
```

Entrar al proyecto

```bash
cd backend
```

Instalar dependencias

```bash
pnpm install
```

Ejecutar el servidor

```bash
pnpm run dev
```

---

# Variables de entorno

Crear un archivo

```
.env
```

Ejemplo

```env
PORT=3000

URI_MONGO=mongodb+srv://usuario:password@cluster.mongodb.net/ecommerce

JWT_SECRET=MiClaveSuperSecreta
```

---

# Arquitectura

La aplicación utiliza una arquitectura basada en capas.

```
Cliente

↓

Routes

↓

Controllers

↓

Models

↓

MongoDB
```

---

# Módulos implementados

## Usuarios

Funciones implementadas

- Registrar usuario
- Mostrar usuarios
- Login
- Encriptación de contraseña
- Generación de Token JWT
- Eliminar usuario

Colección

```
usuarios
```

---

## Roles

Permite administrar los permisos del sistema.

Ejemplos

- Administrador
- Cliente

Funciones

- Crear rol
- Mostrar roles
- Actualizar rol
- Eliminar rol

---

## Categorías

Clasificación de productos.

Ejemplos

- Papelería
- Juguetería
- Tecnología

Funciones

- Crear categoría
- Mostrar categorías
- Actualizar categoría
- Eliminar categoría

---

## Productos

Funciones

- Crear producto
- Mostrar productos
- Buscar producto por ID
- Actualizar producto
- Eliminar producto

Cada producto pertenece a una categoría.

---

## Clientes

CRUD completo.

---

## Proveedores

CRUD completo.

---

## Carrito de compras

Actualmente implementa:

- Agregar producto
- Crear carrito automáticamente
- Validar usuario
- Validar producto
- Incrementar cantidad si el producto ya existe
- Calcular subtotal automáticamente
- Calcular total automáticamente
- Mostrar información completa mediante Populate

Pendiente

- Mostrar carrito
- Actualizar cantidad
- Eliminar producto
- Vaciar carrito

---

## Pedido

Implementado

Modelo y controlador básico.

Pendiente

- Checkout
- Confirmar compra
- Descontar inventario
- Cambiar estado del pedido

---

## Detalle Pedido

Funciones

- Registrar detalle
- Consultar detalles
- Actualizar detalle
- Eliminar detalle

Cada detalle almacena

- Producto
- Cantidad
- Precio Unitario
- Subtotal

---

# Relaciones entre modelos

```
Usuario

│

├───────────────┐

│               │

▼               ▼

Rol          Carrito

                │

                ▼

           Productos

                │

                ▼

            Categoría

                │

                ▼

             Pedido

                │

                ▼

         Detalle Pedido
```

---

# Flujo del carrito

```
Usuario

↓

Selecciona producto

↓

Buscar carrito

↓

¿Existe?

↓

No

↓

Crear carrito

↓

Agregar producto

↓

¿Ya existe?

↓

Sí

↓

Incrementar cantidad

↓

Recalcular subtotal

↓

Recalcular total

↓

Guardar carrito
```

---

# Flujo completo del E-Commerce

```
Registro

↓

Login

↓

Productos

↓

Categorías

↓

Carrito

↓

Pedido

↓

Detalle Pedido

↓

Actualizar Inventario

↓

Compra finalizada
```

---

# Seguridad

Se utiliza

- bcrypt para encriptar contraseñas
- JWT para autenticación
- Variables de entorno con dotenv

---

# Endpoints principales

## Usuarios

| Método | Endpoint                 |
| ------ | ------------------------ |
| POST   | /usuarios/registrar      |
| POST   | /usuarios/iniciar-sesion |
| GET    | /usuarios/mostrar        |
| DELETE | /usuarios/eliminar/:id   |

---

## Productos

| Método | Endpoint                  |
| ------ | ------------------------- |
| POST   | /productos/crear          |
| GET    | /productos/mostrar        |
| PUT    | /productos/actualizar/:id |
| DELETE | /productos/eliminar/:id   |

---

## Categorías

| Método | Endpoint                   |
| ------ | -------------------------- |
| POST   | /categorias/crear          |
| GET    | /categorias/mostrar        |
| PUT    | /categorias/actualizar/:id |
| DELETE | /categorias/eliminar/:id   |

---

## Roles

| Método | Endpoint              |
| ------ | --------------------- |
| POST   | /roles/crear          |
| GET    | /roles/mostrar        |
| PUT    | /roles/actualizar/:id |
| DELETE | /roles/eliminar/:id   |

---

## Carrito

| Método | Endpoint                                     |
| ------ | -------------------------------------------- |
| POST   | /carrito/agregar                             |
| GET    | /carrito/mostrar/:usuario                    |
| PUT    | /carrito/actualizar/:usuario                 |
| DELETE | /carrito/eliminarProducto/:usuario/:producto |
| DELETE | /carrito/vaciar/:usuario                     |

---

# Estado actual del proyecto

## Módulos terminados

- Usuarios
- Roles
- Categorías
- Productos
- Clientes
- Proveedores
- Carrito (en desarrollo avanzado)

---

## Próximas mejoras

- Checkout
- Órdenes de compra
- Pasarela de pagos
- Historial de pedidos
- Gestión de inventario automática
- Recuperación de contraseña
- Middleware de autorización por roles
- Validaciones con express-validator
- Documentación con Swagger
- Pruebas unitarias
- Docker
- Despliegue en Render o Railway

---

# Autor

**Camilo Rueda López**

Proyecto desarrollado como práctica de aprendizaje en **Node.js + Express + MongoDB + Mongoose (MEAN Stack)**, aplicando arquitectura MVC, desarrollo de APIs REST y buenas prácticas de programación.
