<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$json = file_get_contents('php://input');
 
$params = json_decode($json);
$nombre=$params->nombre;
$email=$params->email;
$clave=$params->clave;

	try {	
	  $mbd = new PDO('mysql:host=localhost;dbname=gameguesser', "root", "");
  		$sentencia = $mbd->prepare("INSERT INTO usuario (nombre, email ,clave,admin) VALUES (:nombre, :email, :clave,0)");
		$sentencia->bindParam(':nombre', $nombre);
		$sentencia->bindParam(':email', $email);
		$sentencia->bindParam(':clave', $clave);
		
		$sentencia->execute();
		$error=$sentencia->errorInfo();
		header('Content-Type: application/json');
		echo json_encode(array(
			'error'=> array(
				'sqlstate'=>current($error),
				'code'=>next($error),
				'msg'=>next($error))));
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