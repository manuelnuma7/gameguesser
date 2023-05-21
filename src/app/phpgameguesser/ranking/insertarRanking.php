<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);
$nombre=$params->nombre;
$puntos=$params->puntos;


	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=gameguesser', "root", "");

	  $sentencia = $mbd->prepare("SELECT id FROM usuario WHERE nombre = :nombre");
	  $sentencia->bindParam(':nombre', $nombre);
	  $sentencia->execute();
	  $resultado = $sentencia->fetch(PDO::FETCH_ASSOC);
	  if ($resultado) {
        $id = $resultado['id'];
    }

	$consultaPuntos = $mbd->prepare("SELECT puntos FROM ranking WHERE id = :id");
    $consultaPuntos->bindParam(':id', $id);
	$consultaPuntos->execute();
	$resultadoPuntos = $consultaPuntos->fetch(PDO::FETCH_ASSOC);
	if ($resultadoPuntos) {
        $puntosActuales = $resultadoPuntos['puntos'];

        // Verificar si los puntos asociados a la ID son mayores que los existentes
        if ($puntos > $puntosActuales) {
            // Preparar la consulta SQL para actualizar los puntos
            $consultaActualizarPuntos = $mbd->prepare("UPDATE ranking SET puntos = :puntos WHERE id = :id");
            $consultaActualizarPuntos->bindParam(':id', $id);
            $consultaActualizarPuntos->bindParam(':puntos', $puntos);

            // Ejecutar la consulta para actualizar los puntos
            $consultaActualizarPuntos->execute();
		}
	}else{

		$sentencia = $mbd->prepare("INSERT INTO ranking (id, puntos ) VALUES (:id, :puntos)");
		$sentencia->bindParam(':id', $id);
		$sentencia->bindParam(':puntos', $puntos);
		
		$sentencia->execute();

	}

		$mbd = null;
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode()
        )
    ));
}


?>