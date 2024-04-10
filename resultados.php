<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resultados de Búsqueda</title>
    <style>
        /* Estilos CSS para los resultados de búsqueda */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
        }
        h1 {
            margin-bottom: 20px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Resultados de Búsqueda</h1>

    <?php
    // Verificamos si se ha enviado una consulta de búsqueda
    if (isset($_GET['q'])) {
        // Obtenemos la consulta de búsqueda del parámetro GET y la limpiamos
        $query = trim($_GET['q']);

        // Directorio donde se encuentran los archivos de recetas
        $directory = 'recetas/';

        // Array para almacenar los resultados de la búsqueda
        $results = array();

        // Recorremos los archivos de recetas en el directorio
        $files = glob($directory . '*.md');
        foreach ($files as $file) {
            // Leemos el contenido del archivo de receta
            $content = file_get_contents($file);

            // Verificamos si la consulta de búsqueda
