# 💰 Walletfy - Aplicación de Gestión Financiera Personal

## 📋 Descripción

Walletfy es una aplicación web moderna para la gestión de finanzas personales que permite a los usuarios registrar, organizar y visualizar sus ingresos y gastos de manera intuitiva. La aplicación está diseñada con una interfaz limpia y responsiva que funciona tanto en dispositivos móviles como de escritorio.

### ✨ Características Principales

- 📊 **Gestión de Eventos Financieros**: Registro de ingresos y egresos con información detallada
- 📅 **Visualización por Períodos**: Organización automática de eventos por meses y años
- 🔍 **Búsqueda Avanzada**: Sistema de búsqueda por períodos de tiempo
- 🌙 **Modo Oscuro/Claro**: Interfaz adaptable con soporte para temas
- 📎 **Adjuntos de Imágenes**: Posibilidad de adjuntar comprobantes o imágenes a los eventos
- 📈 **Resumen Financiero**: Dashboard con totales de ingresos, egresos y balance general
- 💾 **Persistencia Local**: Almacenamiento de datos en el navegador del usuario

### 🏗️ Arquitectura de la Aplicación

La aplicación está construida con tecnologías modernas siguiendo las mejores prácticas de desarrollo:

#### 🛠️ Stack Tecnológico

- ⚛️ **Frontend Framework**: React 18 con TypeScript
- ⚡ **Build Tool**: Vite para desarrollo y construcción optimizada
- 🗃️ **Gestión de Estado**: Redux Toolkit para manejo centralizado del estado
- 🎨 **Estilos**: Tailwind CSS con sistema de variables CSS para temas
- ✅ **Validación**: Zod para validación de esquemas y formularios
- 🔧 **Utilidades**: Moment.js para manejo de fechas, Lucide React para iconografía

#### 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React organizados por funcionalidad
│   ├── ui/             # Componentes de interfaz reutilizables
│   ├── layout/         # Componentes de layout (Header, Container)
│   ├── events/         # Componentes específicos para eventos financieros
│   └── balance/        # Componentes para visualización de balance
├── store/              # Configuración de Redux
│   └── slices/         # Slices de Redux para diferentes dominios
├── hooks/              # Custom hooks de React
├── types/              # Definiciones de tipos TypeScript
├── utils/              # Funciones utilitarias
├── schemas/            # Esquemas de validación con Zod
└── index.css           # Estilos globales y variables CSS
```

#### 🎯 Patrones de Diseño Implementados

1. 🧩 **Component Composition**: Componentes modulares y reutilizables
2. 🪝 **Custom Hooks**: Lógica reutilizable encapsulada (useDebounce, useAppSelector)
3. 🔄 **Redux Pattern**: Gestión de estado predecible con acciones y reducers
4. 🎭 **Separation of Concerns**: Separación clara entre lógica de negocio, presentación y estado
5. 📝 **TypeScript First**: Tipado estricto para mayor mantenibilidad

#### 🗂️ Gestión de Estado

- 📋 **Events Slice**: Manejo de eventos financieros (CRUD operations)
- 🎨 **Theme Slice**: Gestión del tema de la aplicación
- 💾 **Persistencia**: Sincronización automática con localStorage

#### 🧱 Componentes Principales

- 🏠 **App**: Componente raíz con Provider de Redux
- 🧭 **Header**: Navegación y controles globales
- 📊 **BalanceView**: Vista principal con resumen y listado de eventos
- 📝 **EventForm**: Formulario para crear/editar eventos
- 📅 **MonthlyGroup**: Agrupación de eventos por período
- 🃏 **EventCard**: Tarjeta individual de evento

## 🚀 Ejecución

### 📋 Prerrequisitos

- 📦 Node.js (versión 16 o superior)
- 📥 npm o yarn como gestor de paquetes

### 🔧 Pasos para Ejecución Local

1. **📥 Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd walletfy
   ```

2. **📦 Instalar dependencias**
   ```bash
   npm install
   ```

3. **▶️ Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **🌐 Acceder a la aplicación**
   - 🔗 Abrir el navegador en `http://localhost:5173`
   - 🔄 La aplicación se recargará automáticamente al hacer cambios en el código

### 📜 Scripts Disponibles

- 🔧 `npm run dev`: Inicia el servidor de desarrollo
- 🏗️ `npm run build`: Construye la aplicación para producción
- 👀 `npm run preview`: Previsualiza la build de producción localmente
- 🔍 `npm run lint`: Ejecuta el linter para verificar calidad del código

### ⚙️ Configuración de Desarrollo

La aplicación utiliza Vite como herramienta de desarrollo, que proporciona:
- 🔥 Hot Module Replacement (HMR) para recarga rápida
- ⚡ Optimización automática de imports
- 📝 Soporte nativo para TypeScript
- 🖼️ Optimización de assets

## ☁️ Despliegue

### 🌐 Opción 1: Netlify (Recomendado)

1. **🏗️ Preparar la aplicación**
   ```bash
   npm run build
   ```

2. **📤 Despliegue manual**
   - 👤 Crear cuenta en [Netlify](https://netlify.com)
   - 📁 Arrastrar la carpeta `dist` generada al dashboard de Netlify
   - 🔗 La aplicación estará disponible en la URL proporcionada

3. **🔄 Despliegue automático con Git**
   - 🔗 Conectar el repositorio de GitHub con Netlify
   - ⚙️ Configurar build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - 🚀 Netlify desplegará automáticamente en cada push

### ⚡ Opción 2: Vercel

1. **📦 Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **🚀 Desplegar**
   ```bash
   vercel --prod
   ```

3. **⚙️ Configuración automática**
   - 🔍 Vercel detectará automáticamente que es un proyecto Vite
   - ⚙️ Configurará los build settings apropiados

### 🐙 Opción 3: GitHub Pages

1. **📦 Instalar gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **⚙️ Configurar vite.config.ts**
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/nombre-del-repositorio/',
   });
   ```

3. **📝 Agregar scripts al package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

4. **🚀 Desplegar**
   ```bash
   npm run deploy
   ```

### 🖥️ Opción 4: Servidor Propio

1. **🏗️ Construir la aplicación**
   ```bash
   npm run build
   ```

2. **📁 Servir archivos estáticos**
   - 📋 Copiar el contenido de la carpeta `dist` al servidor web
   - ⚙️ Configurar el servidor para servir `index.html` para todas las rutas (SPA)

### 🔒 Consideraciones de Producción

- 🔧 **Variables de Entorno**: No se requieren variables de entorno específicas
- 🔐 **HTTPS**: Recomendado para producción
- 🗜️ **Compresión**: Habilitar gzip/brotli en el servidor
- 💾 **Cache**: Configurar headers de cache apropiados para assets estáticos
- 📊 **Monitoreo**: Implementar herramientas de monitoreo y analytics si es necesario

### ⚡ Optimizaciones de Rendimiento

La aplicación incluye optimizaciones automáticas:
- 📦 Code splitting automático
- 🌳 Tree shaking para eliminar código no utilizado
- 🗜️ Minificación de CSS y JavaScript
- 🖼️ Optimización de imágenes
- ⏳ Lazy loading de componentes cuando sea apropiado

## 🔧 Mantenimiento

### 💾 Estructura de Datos

Los datos se almacenan localmente en el navegador usando localStorage con las siguientes claves:
- 📋 `walletfy-events`: Array de eventos financieros
- 🎨 `walletfy-theme`: Preferencia de tema del usuario

### 🔄 Actualizaciones de Dependencias

```bash
npm update
npm audit fix
```

### 🐛 Debugging

- ⚛️ Utilizar React Developer Tools para inspeccionar componentes
- 🗃️ Redux DevTools para monitorear el estado de la aplicación
- 🖥️ Console del navegador para logs y errores
