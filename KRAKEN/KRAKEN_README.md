# Kraken Ghost 🦑👻

Suite de pruebas para Ghost utilizando Kraken-Node.

## Prerequisitos:
- Node v18.20.0
- Windows 10


## Pasos para configurar el proyecto:

1. Desinstala las versiones globales de las herramientas que puedan estar instaladas:
    ```bash
    npm uninstall -g android-platform-tools
    npm uninstall -g @cucumber/cucumber
    npm uninstall -g kraken-node
    npm uninstall -g appium
    ```

2. Instala las dependencias necesarias:
    ```bash
    npm i
    ```

## Para ejecutar:

Ejecuta las pruebas con el siguiente comando:
```bash
npx kraken-node run
```

## Consideraciones adicionales:
En caso de que solo se ejecute la primera prueba, cambiar temporalmente el nombre del archivo de la prueba que se quiere ejecutar a 000. De esta forma se puede escoger qué prueba se ejecuta.