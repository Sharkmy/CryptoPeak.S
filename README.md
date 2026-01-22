1. Descripción General
CryptoPeak | Sharkmy es una plataforma de monitoreo de criptomonedas en tiempo real. El objetivo principal es que tenga una interfaz limpia y sencilla (intuitiva) para consultar precios, tendencias gráficas y realizar cálculos.

2. Fase de Estructura y Estética (HTML5 & Tailwind CSS)
Recurso: CSS Grid Layout.

Justificación: Se utilizó un sistema de rejilla bidimensional para el catálogo de monedas. A diferencia de Flexbox, el Grid permite mantener la alineación tanto en columnas como en filas, garantizando que las tarjetas no se desacomoden al filtrar o buscar.

Recurso: Tailwind CSS.

Justificación: Permitió un desarrollo acelerado mediante clases utilitarias, eliminando la necesidad de archivos CSS externos (lo cual optmiza el arcivo en cuanto a peso) y asegurando que el diseño sea Mobile-First (adaptable a celulares y PC).

Recurso: Custom Scrollbar (Morado #7c3aed el mejor color).

Justificación: Se personalizó la barra de desplazamiento para mejorar la identidad visual de la marca y asegurar que el usuario siempre identifique el área con contenido desplazable (me dio problema y tuve que forzar en el html y css para que se viera).

3. Fase de Interactividad y Datos (JavaScript & APIs)
Recurso: Fetch API (Asincronía).

Justificación: Se implementó fetch con async/await para obtener datos de CoinGecko. Esto permite que la aplicación cargue la información en segundo plano sin congelar la pantalla..

Recurso: Chart.js.

Justificación: Se integró para transformar los datos numéricos de los últimos 7 días en gráficos lineales (sparklines). Esto facilita al usuario la comprensión visual de la tendencia del mercado de un vistazo.

4. Fase de Seguridad y Lógica
Recurso: Autenticación Frontend.

Justificación: Se creó un sistema de login basado en validación de constantes para controlar el flujo de navegación y simular un entorno de acceso restringido profesional (las credenciales de acceso se encuentran en el archivo main.js)

Recurso: Local Search Algorithm.

Justificación: El buscador filtra los datos ya descargados en memoria, lo que permite una respuesta instantánea al usuario sin necesidad de hacer nuevas peticiones a la API por cada letra escrita.

* Instalación y Uso
Clonar el proyecto: Descarga los archivos en tu computadora.

Instalar dependencias: Ejecuta el comando en la terminal:

Bash
npm install
Ejecutar en desarrollo:

Bash
npm run dev
Credenciales de acceso:

Usuario: admin

Password: 1234

4. Estructura de Archivos
index.html: Estructura semántica del sitio.

style.css: Configuraciones de Tailwind y estilos de la barra de scroll.

main.js: Lógica de la API, Gráficos y Calculadora.

tailwind.config.js: Personalización de colores Azul Real (#1e3a8a) y Azul Brillante (#3b82f6).

5. Autor
Desarrollado por: Sharkmy Proyecto: CryptoPeak v1.0
