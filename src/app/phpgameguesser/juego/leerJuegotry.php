<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

try {
    $pdo = new PDO('mysql:host=localhost;dbname=gameguesser', 'root', '');

    // Consulta para obtener los datos de la tabla biblioteca_juego y sus relaciones
    $query = 'SELECT bj.id_biblioteca_juego, bj.nombre, bj.fecha, bj.nota, bj.companion, bj.nivel, g.genero, p.nombre AS plataforma, m.nombre AS musica, i.nombre AS imagen
              FROM biblioteca_juego bj
              LEFT JOIN genero_juego gj ON bj.id_biblioteca_juego = gj.id_biblioteca_juego
              LEFT JOIN genero g ON gj.id_genero = g.id_genero
              LEFT JOIN plataforma_juego pj ON bj.id_biblioteca_juego = pj.id_biblioteca_juego
              LEFT JOIN plataforma p ON pj.id_plataforma = p.id_plataforma
              LEFT JOIN musica m ON bj.id_biblioteca_juego = m.id_biblioteca_juego
              LEFT JOIN imagen i ON bj.id_biblioteca_juego = i.id_biblioteca_juego';

    $stmt = $pdo->query($query);

    if ($stmt !== false) {
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Array asociativo para almacenar los juegos y sus detalles
        $juegos = array();

        foreach ($rows as $row) {
            $idJuego = $row['id_biblioteca_juego'];

            // Si el juego no existe en el array, se crea una nueva entrada
            if (!isset($juegos[$idJuego])) {
                $juegos[$idJuego] = array(
                    'id' => $idJuego,
                    'nombre' => $row['nombre'],
                    'fecha' => $row['fecha'],
                    'nota' => $row['nota'],
                    'companion' => $row['companion'],
                    'nivel' => $row['nivel'],
                    'generos' => array(),
                    'plataformas' => array(),
                    'musica' => array(),
                    'imagenes' => array()
                );
            }

            // Agregar genero al juego si no se ha agregado previamente
            if (!in_array($row['genero'], $juegos[$idJuego]['generos'])) {
                $juegos[$idJuego]['generos'][] = $row['genero'];
            }

            // Agregar plataforma al juego si no se ha agregado previamente
            if (!in_array($row['plataforma'], $juegos[$idJuego]['plataformas'])) {
                $juegos[$idJuego]['plataformas'][] = $row['plataforma'];
            }

            // Agregar musica al juego si no se ha agregado previamente
            if (!in_array($row['musica'], $juegos[$idJuego]['musica'])) {
                $juegos[$idJuego]['musica'][] = $row['musica'];
            }

            // Agregar imagen al juego si no se ha agregado previamente
            if (!in_array($row['imagen'], $juegos[$idJuego]['imagenes'])) {
                $juegos[$idJuego]['imagenes'][] = $row['imagen'];
            }
        }

        header('Content-type: application/json');
        echo json_encode($juegos);
    }
} catch (PDOException $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
    die();
}
?>