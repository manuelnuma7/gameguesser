<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=gameguesser', "root", "");

    $res = $mbd->query('SELECT nombre FROM biblioteca_juego');

    if ($res->errorCode() == 0) {
        $rows = $res->fetchAll(PDO::FETCH_ASSOC);

        // Crear un array asociativo con números enumerados y nombres de juegos
        $juegos = array();
        foreach ($rows as $index => $row) {
            $juegos[$index + 1] = $row['nombre'];
        }

        // Convertir el array a JSON
        header('Content-type: application/json');
        echo json_encode($juegos);
    }

    $mbd = null;
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