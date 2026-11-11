# Landing Page: Bebidas Nutracéuticas (Protocolo de Restauración Metabólica)

Landing Page profesional desarrollada con alta fidelidad visual y funcional basada en la estructura y contenido del sitio oficial [bebidanutraceutica.com](https://bebidanutraceutica.com/), modernizada con la paleta de colores verdes en degradado de la estética de referencia (*Superfood Spirulina*) y un backend robusto en **PHP 8**.

---

## 🎨 Paleta de Colores Moderna (Verdes en Degradado)

La identidad visual ha sido modernizada inspirándose en el diseño botánico y limpio:
- **Lienzo Principal (Canvas):** Fondo suave verde menta claro (`#EBF4EC` / `#F4FAF5`).
- **Superficies & Tarjetas:** Blanco puro (`#FFFFFF`) con bordes suaves (`rgba(78, 125, 91, 0.22)`) y sombras etéreas.
- **Botones y Acentos:** Degradado verde botánico luminoso `linear-gradient(135deg, #6FA77C 0%, #4A835A 60%, #326040 100%)`.
- **Badges & Pills:** Estilo cápsula redondeada (`#E2EFE4`) con tipografía moderna y microiconos.
- **Tipografía:** Combinación editorial de *Lora* (serif elegante para titulares) y *DM Sans* (sans-serif nítida para lectura y controles).

---

## 🚀 Tecnologías y Características Implementadas

- **HTML5 Semántico**: Estructura accesible, metaetiquetas Open Graph y optimización SEO.
- **CSS3 Autónomo & Tailwind CSS**:
  - Archivo `css/styles.css` 100% autónomo con todas las clases de visibilidad, grids y componentes integrados.
  - **Compatibilidad total con `file:///`**: Abre directamente en cualquier navegador con doble clic desde la carpeta, sin depender de conexión a internet o CDNs externos.
- **JavaScript Moderno (ES6+)**:
  - **Carrito reactivo**: Persistencia local en `localStorage`, modificación de cantidades, cálculo dinámico y checkout directo por WhatsApp o formulario.
  - **Test Diagnóstico de Saturación**: Quiz interactivo de 5 preguntas con barras animadas por dimensión y cálculo del nivel de sobrecarga metabólica.
  - **Acordeón FAQ**: Preguntas frecuentes con transiciones fluidas y atributos ARIA de accesibilidad.
  - **Navegación inteligente**: Menú lateral responsive para móviles, barra sticky y scroll suave.
  - **Soporte dual en formulario**: Envío asíncrono vía AJAX/JSON en servidores PHP y fallback automático a WhatsApp cuando se abre localmente en el navegador.
- **PHP 8 (Backend)**:
  - Verificación estricta de tipos (`declare(strict_types=1)`).
  - Protección Anti-Spam por Honeypot y tokens de seguridad CSRF.
  - Sanitización server-side y almacenamiento seguro en `storage/leads.json`.
  - **Panel de Administración (`admin.php`)**: Acceso protegido por PIN (`1234`) para visualizar leads, filtrar por fecha/búsqueda, eliminar registros, exportar a CSV y contactar al cliente por WhatsApp con un solo clic.

---

## 📂 Estructura del Proyecto

```
bebidasnuraceuticas/
├── css/
│   └── styles.css          # Estilos autónomos completos (paleta verde, pills, botones, utilidades)
├── img/
│   ├── benefits/           # Ilustraciones de beneficios (sueño profundo, energía)
│   ├── hero/               # Fotografía de Yojandry Nava
│   └── products/           # Imágenes de productos (Prunex, Flora Liv, Rexet, Vita Xtra T+)
├── js/
│   ├── cart.js             # Carrito de compras reactivo y persistente
│   ├── faq.js              # Acordeón de preguntas frecuentes
│   ├── main.js             # Menú móvil, scroll y controlador dual del formulario
│   ├── products.js         # Catálogo de productos FuXion y formateo de precios COP
│   └── quiz.js             # Test interactivo de saturación metabólica
├── storage/
│   ├── leads.json          # Base de datos JSON de consultas y pedidos recibidos
│   └── sessions/           # Sesiones locales PHP
├── admin.php               # Panel administrativo de gestión de leads (PIN: 1234)
├── index.html              # Versión estática (abre con doble clic en cualquier explorador)
├── index.php               # Versión dinámica PHP con sesiones y tokens CSRF
├── process-form.php        # Endpoint backend en PHP 8 para procesar el formulario
├── proyecto.md             # Requerimientos e instrucciones del proyecto
└── README.md               # Documentación completa del proyecto
```

---

## 💻 Cómo Ejecutar el Proyecto

### Opción 1: Doble Clic Directo (Modo Local / Estático)
Haz doble clic sobre `index.html` en la carpeta de tu escritorio. Se abrirá en tu navegador predeterminado (Chrome, Edge, Firefox, etc.) con:
- Diseño, tipografía, imágenes y colores 100% cargados.
- Carrito de compras, selector de cantidades y test de 5 preguntas totalmente operativos.
- Envíos y pedidos conectados directamente a WhatsApp oficial (+57 314 309 6984).

### Opción 2: Servidor PHP Local
Inicia el servidor integrado de PHP en la terminal o PowerShell dentro de la carpeta:
```bash
C:\xampp\php\php.exe -S localhost:8000
```
- **Landing Page:** [http://localhost:8000/index.php](http://localhost:8000/index.php)
- **Panel Administrativo:** [http://localhost:8000/admin.php](http://localhost:8000/admin.php) *(PIN por defecto: `1234`)*

### Opción 3: XAMPP / Apache
1. Copia o mueve la carpeta `bebidasnuraceuticas` a `C:\xampp\htdocs\bebidasnuraceuticas`.
2. Inicia el módulo **Apache** en el Panel de Control de XAMPP.
3. Ingresa en tu navegador a:
   - `http://localhost/bebidasnuraceuticas/index.php`
   - `http://localhost/bebidasnuraceuticas/admin.php`
