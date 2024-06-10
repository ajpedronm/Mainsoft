# Middleware-IOPS

Este proyecto es una aplicación Node.js construida con Express. La aplicación utiliza variables de entorno para la configuración, incluyendo el puerto en el que se ejecuta, la URL de una API externa y las credenciales de autenticación.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/): JavaScript runtime que nos permite ejecutar código JavaScript fuera del navegador.
- [npm](https://www.npmjs.com/): Gestor de paquetes de Node.js, utilizado para instalar las dependencias del proyecto.
- [Docker](https://www.docker.com/): Plataforma de contenedores que permite empaquetar, distribuir y ejecutar aplicaciones en contenedores.

## Configuración

Antes de ejecutar la aplicación, asegúrate de configurar las variables de entorno en un archivo `.env`. Aquí tienes un ejemplo de cómo debería ser el archivo `.env`:
```
PORT=3000
INVGATE_URL=https://mainsoft-consultoria.sd.cloud.invgate.net/api/v1/incident
AUTH=Basic bWlkZGxld2FyZS11c2VyOmRJVzJZVTJHWUlQcTFBWnFDYUh0TEdsTQ==
```


## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:
```
npm install
```


## Ejecución

Para ejecutar la aplicación en un entorno de desarrollo, puedes utilizar el siguiente comando:
```
node index.js
```


La aplicación estará disponible en `http://localhost:3000`.

## Ejecución en Docker

### Generar la imagen Docker

Para generar una imagen Docker para la aplicación, puedes utilizar el siguiente comando en la raíz del proyecto (asegúrate de tener Docker instalado y en ejecución):
```
docker build -t nombre_imagen .
```


### Ejecutar el contenedor Docker

Una vez que tengas la imagen Docker generada, puedes ejecutar un contenedor utilizando el siguiente comando:
```
docker run -p 3000:3000 --env-file .env nombre_imagen
```


La aplicación estará disponible en `http://localhost:3000`.

