const fs = require('fs');
const path = require('path');

// Función para leer los archivos Markdown de la carpeta de recetas
function leerRecetas() {
    const directorioRecetas = './recetas'; // Directorio donde se encuentran tus archivos de recetas

    // Obtener la lista de archivos en el directorio de recetas
    const archivos = fs.readdirSync(directorioRecetas);

    const recetas = [];

    archivos.forEach(archivo => {
        // Comprobar si el archivo es un archivo Markdown
        if (archivo.endsWith('.md')) {
            // Leer el contenido del archivo
            const rutaArchivo = path.join(directorioRecetas, archivo);
            const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
            // Agregar el contenido a la lista de recetas
            recetas.push({ nombre: archivo, contenido: contenido });
        }
    });

    return recetas;
}

module.exports = {
    leerRecetas
};
