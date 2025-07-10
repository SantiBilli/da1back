# 🛠️ MediGo - Backend (API REST)

Este es el backend de la aplicación **MediGo**, una plataforma de turnos médicos. Desarrollado con **Express.js**, **Prisma**, y una base de datos MySQL. La API expone endpoints para autenticación, gestión de turnos, usuarios, médicos, historial y más.

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/SantiBilli/da1back.git
cd da1back
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```
PORT=3500
API_KEY = '6d20959a-0446-4784-9381-afb5a471ee91'
DATABASE_URL="mysql://santiago:160103@vps-4215636-x.dattaweb.com:3306/da1mysql?schema=public&connection_limit=50"
```

### 4. Ejecutar servidor en desarrollo

```bash
npm run dev
```

> El servidor se ejecutará en `http://localhost:3000` (por defecto)

---

## 📦 Dependencias principales

- **Express** – Framework web
- **Prisma** – ORM para MySQL
- **MySQL2** – Driver de base de datos
- **JWT** – Autenticación con tokens
- **Bcrypt** – Hasheo de contraseñas
- **Multer** – Manejo de archivos (uploads)
- **Nodemailer** – Envío de correos electrónicos

---

## 📂 Estructura del proyecto

```
/da1back
├── controllers/       # Lógica de cada recurso (usuarios, turnos, auth, etc.)
├── middlewares/       # Middlewares de autenticación, errores, etc.
├── prisma/            # Cliente y esquema de base de datos
├── routes/            # Endpoints organizados por recurso
├── services/          # Lógica de negocio reutilizable
├── swagger/           # Configuración Swagger
├── uploads/           # Archivos temporales o de usuario
├── index.js           # Punto de entrada principal
├── .env               # Variables de entorno
└── package.json
```

---

## ⚙️ Scripts útiles

- `npm run dev` – Ejecuta el servidor con **nodemon**
- `npm start` – Arranque estándar
- `npx prisma db pull` – Pull de la DB
- `npx prisma generate` – Genera el cliente Prisma

---

## 👨‍⚕️ Autores

Desarrollado por **Santiago Felipe Billinghurst, Juana Estarli y Nicolas Estepañuk**
