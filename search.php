<?php
// Verificamos si se ha enviado una consulta de búsqueda
if (isset($_GET['q'])) {
    // Obtenemos la consulta de búsqueda del parámetro GET
    $query = $_GET['q'];

    // Directorio donde se encuentran los archivos de recetas
    $directory = 'recetas/';

    // Array para almacenar los resultados de la búsqueda
    $results = array();

    // Recorremos los archivos de recetas en el directorio
    $files = glob($directory . '*.md');
    foreach ($files as $file) {
        // Leemos el contenido del archivo de receta
        $content = file_get_contents($file);

        // Verificamos si la consulta de búsqueda está en el contenido del archivo
        if (stripos($content, $query) !== false) {
            // Si hay una coincidencia, añadimos el nombre del archivo a los resultados
            $results[] = $file;
        }
    }

    // Mostramos los resultados de la búsqueda
    echo "<h2>Resultados de la búsqueda para: $query</h2>";
    echo "<ul>";
    foreach ($results as $result) {
        // Obtenemos el título de la receta del nombre del archivo
        $title = basename($result, '.md');
        echo "<li><a href='$result'>$title</a></li>";
    }
    echo "</ul>";
} else {
    // Si no se ha enviado una consulta de búsqueda, redirigimos al usuario de vuelta a la página principal
    header("Location: index.html");
    exit(); // Terminamos el script para evitar que se siga ejecutando
}
?>
