# MISW4103-Ghost-Issue-Tracking
En este repositorio se especifican los issues relacionados a ghost, así como se almacenan suites de pruebas desarrolladas con Kraken y Cypress.

Para ejecutar la suite de pruebas de Kraken, seguir el siguiente [tutorial](/KRAKEN/KRAKEN_README.md)

Para ejecutar la suite de pruebas de Cypress, seguir el siguiente [tutorial](/CYPRESS/CYPRESS_README.md)

### BackstopJS:
tutorial para correr en el proyecto backstop y cypress : https://github.com/necalero/MISW4103-Ghost-Issue-Tracking/blob/main/CYPRESS/CYPRESS_README.md

Pros:

Facilidad de uso: BackstopJS proporciona una interfaz de línea de comandos simple y fácil de entender, lo que facilita la configuración y ejecución de pruebas de regresión visual.
Configuración flexible: Permite a los usuarios configurar una variedad de opciones, como la configuración de escenarios de prueba, la configuración de reglas de tolerancia y la generación de informes personalizables.

Integración con herramientas de automatización: Puede ser fácilmente integrado en flujos de trabajo de CI/CD (Continuous Integration/Continuous Deployment) y sistemas de automatización de pruebas.
Capturas de pantalla automáticas: Genera automáticamente capturas de pantalla de las diferencias entre las versiones anteriores y actuales de una aplicación web.

Compatibilidad multiplataforma: Es compatible con múltiples sistemas operativos, lo que lo hace ideal para equipos con diferentes configuraciones de desarrollo.

Contras:

Dependencia de motor de renderizado: Las pruebas de regresión visual dependen del motor de renderizado utilizado, lo que puede resultar en diferencias sutiles entre las imágenes capturadas y las representaciones reales de la página web.

Configuración inicial: Configurar las pruebas puede llevar tiempo, especialmente para proyectos grandes o complejos.

Limitaciones de cobertura: Aunque es útil para detectar cambios visuales, BackstopJS no puede detectar todos los problemas funcionales o de usabilidad en una aplicación web.

### ResembleJS:

Pros:

Comparación de imágenes precisa: ResembleJS utiliza algoritmos avanzados para comparar imágenes, lo que proporciona resultados precisos incluso en casos de diferencias sutiles.
Bajo nivel de ruido: Tiende a producir menos "falsos positivos" en comparación con otras herramientas de comparación de imágenes, lo que significa que es menos probable que informe diferencias irrelevantes.

Ligero: Es una biblioteca JavaScript ligera que puede ser fácilmente integrada en proyectos existentes sin añadir una carga significativa al rendimiento.

Personalizable: Permite a los usuarios ajustar parámetros como el umbral de diferencia y el tamaño del área de interés para adaptarse a las necesidades específicas del proyecto.

Licencia de código abierto: ResembleJS está disponible bajo una licencia de código abierto, lo que permite su uso gratuito y su contribución por parte de la comunidad.

Contras:

Requiere conocimientos de programación: A diferencia de las herramientas de prueba con interfaz gráfica de usuario, ResembleJS requiere conocimientos básicos de programación para su integración y uso.

Dependencia de JavaScript: Al ejecutarse en el navegador, está sujeto a las limitaciones de seguridad del navegador y puede ser menos adecuado para pruebas automatizadas en entornos de servidor.

No es una solución completa: Aunque es excelente para la comparación de imágenes, ResembleJS no proporciona características adicionales como la gestión de pruebas, la generación de informes o la integración con flujos de trabajo de CI/CD.

### Integrantes del equipo
- Nicolás Calero - ne.calero@uniandes.edu.co
- Ana María Solano - a.solanop@uniandes.edu.co
- Miguel Parra - ma.parrat@uniandes.edu.co
- Juan Romero - jg.romero2@uniandes.edu.co
