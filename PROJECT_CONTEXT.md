# CONTEXTO DEL PROYECTO - E-COMMERCE

## Stack

- Frontend: Angular moderno + TypeScript strict
- Backend: Node.js + Express
- Base de datos: MongoDB + Mongoose
- Gestor: pnpm
- Git/GitHub

## Estructura Frontend

src/app/
├── components/
│ ├── nav-bar/
│ └── product-card/
├── interfaces/
│ ├── credentials.ts
│ ├── products.ts
│ └── user.ts
├── pages/
│ ├── home/
| ├── products/
│ └── carrito/
└── services/
| |──login/
| |──products/
| |──users/

## Producto Backend

productModel.js:

- nombre: String, required
- descripcion: String
- precio: Number, required
- stock: Number, required, default 0
- imagen: String
- categoria: ObjectId → Categoria
- estado: Boolean, default true
- cantidad: Number, default 0
- disponible: Boolean
- timestamps: true

## Decisiones

- No crear carpeta models porque ya existe interfaces/
- ProductCard solamente presenta información del producto.
- Los cálculos de negocio deben hacerse en backend.
- Usar Angular moderno: input(), output(), @for, etc.
- Usar routerLink/routerLinkActive para navegación.
- No duplicar modelos innecesariamente.

## Flujo de productos

MongoDB
→ Express
→ Controller
→ API
→ ProductoService
→ Products
→ ProductCard

## Objetivo actual

Terminar primero:

1. interfaces/products.ts
2. ProductCard
3. Products
4. ProductoService
5. conexión con backend
6. después carrito
