# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["node", "index.js"]

# Eliminar archivos de instalación de npm y dependencias de desarrollo
RUN npm cache clean --force && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    npm prune --production
