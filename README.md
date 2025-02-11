# webmefy

# 🛒 Proyecto de Carrito de Compras - UX/UI y Flujo Completo

Este proyecto implementa una aplicación de compras en línea con una experiencia fluida y centrada en el usuario. Incluye funcionalidades clave como listado de productos, detalles de cada producto, gestión del carrito y un flujo de checkout interactivo.

## 📚 Descripción General

El proyecto está diseñado para ofrecer una navegación sencilla y rápida, garantizando que los usuarios puedan:

- Explorar productos disponibles.
- Ver los detalles de cada producto.
- Agregar productos al carrito.
- Completar el proceso de compra mediante un flujo de pasos.

## 🧩 Funcionalidades Clave

1. **Listado de productos:**  
   Los productos se muestran en una grilla adaptable, ajustándose según el tamaño de la pantalla (responsive design).

2. **Detalle de producto:**  
   Al seleccionar un producto, se muestran sus detalles principales: nombre, precio, proveedor y SKU. El usuario puede agregarlo al carrito desde esta vista.

3. **Carrito de compras interactivo:**  
   El carrito permite agregar, eliminar productos y navegar fácilmente al checkout. El estado del carrito se mantiene utilizando `localStorage` para persistencia.

4. **Flujo de checkout:**  
   Implementado mediante pasos secuenciales. El formulario guarda datos en `localStorage` y permite validar cada paso antes de avanzar.

5. **Manejo de errores UX-friendly:**  
   Si ocurre un error, se muestra una modal con opción para refrescar la página y reintentar.

## 🌐 Estructura del Proyecto

- **`index.html`**: Página principal con el listado de productos.
- **`product-detail.html`**: Página de detalle de producto.
- **`checkout.html`**: Flujo del proceso de compra.

### 📂 Estructura de Archivos

/src ├── app.js # Control principal de la aplicación. ├── products.js # Lógica para mostrar y manejar productos. ├── productDetail.js # Renderizado de detalles del producto. ├── cart.js # Gestión del carrito y persistencia. ├── checkout.js # Flujo del proceso de compra. ├── fetchData.js # Obtención de datos simulada mediante fetch. ├── utils.js # Funciones para gestionar localStorage. └── styles.css # Estilos generales y adaptativos.


## 🚀 Flujo del Usuario

1. **Inicio:** El usuario navega a la lista de productos y puede agregar elementos al carrito o ver sus detalles.
2. **Detalle del producto:** Si se selecciona "View Details", se guarda el producto en `localStorage` y se muestra la página detallada.
3. **Carrito:** Permite administrar los productos y pasar al checkout.
4. **Checkout:** Proceso dividido en pasos, validando datos antes de la orden final.

## 🔧 Tecnologías Utilizadas

- **HTML/CSS:** Diseño responsive y adaptable.
- **JavaScript (ES6):** Lógica y gestión dinámica del contenido.
- **`localStorage`:** Persistencia de datos del carrito y formularios.
- **Fetch API:** Simulación de la carga de datos.

## 🛡️ Manejo de Errores

- Se gestionan errores de red mediante una modal interactiva que permite al usuario refrescar la página.
- Validación de entradas en cada paso del checkout.

## 👨‍💻 Cómo Ejecutarlo Localmente

1. Clona este repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto-carrito.git
   cd proyecto-carrito
