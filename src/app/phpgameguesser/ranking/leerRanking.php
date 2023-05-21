<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
try {
    $mbd = new PDO('mysql:host=localhost;dbname=gameguesser', "root", "");

    $query = 'SELECT usuario.nombre, ranking.puntos FROM ranking
              INNER JOIN usuario ON ranking.id = usuario.id
              ORDER BY ranking.puntos DESC';
    $stmt = $mbd->query($query);

    if ($stmt->errorCode() == PDO::ERR_NONE) {
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-type: application/json');
        echo json_encode($rows);
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
