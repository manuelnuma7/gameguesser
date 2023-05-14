<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);

	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=gameguesser', "root", "");
  		$sentencia = $mbd->prepare("SELECT * FROM usuario where nombre=:nombre and clave=:clave");
		$sentencia->bindParam(':nombre', $nombre);
		$sentencia->bindParam(':clave', $clave);
		$nombre=$params->nombre;
		$clave=$params->clave;
		$sentencia->execute();
		$error=$sentencia->errorInfo();
		header('Content-Type: application/json');
		if ($sentencia->errorCode()==0) {
			$rows=$sentencia->fetchAll(PDO::FETCH_ASSOC);
			header('Content-type: application/json');
			echo json_encode($rows);
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