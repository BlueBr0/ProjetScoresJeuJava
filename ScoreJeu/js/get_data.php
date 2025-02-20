<?php
header("Access-Control-Allow-Origin: *");  // Permet les requêtes depuis n'importe quel domaine
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");  // Permet certains types de méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type");  // Permet certains types de headers
header("Content-Type: application/json; charset=UTF-8");

$host = "sql305.infinityfree.com"; // Remplace par ton hôte MySQL
$dbname = "if0_38355049_scores";
$username = "if0_38355049"; // Remplace par ton utilisateur MySQL
$password = "6U9miuecmb"; // Remplace par ton mot de passe MySQL

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connexion échouée: " . $conn->connect_error]));
}

$carte = isset($_GET['nomCarte']) ? $conn->real_escape_string($_GET['nomCarte']) : '';

$sql = "SELECT nomJoueur, points, s.coderang, libelleniveau, TIME_FORMAT(temps, '%i:%s') as temps 
        FROM score s 
        JOIN niveau n ON n.idniveau = s.idniveau 
        JOIN rang r ON r.coderang = s.coderang 
        WHERE s.idniveau LIKE '%$carte%' 
        ORDER BY points DESC, temps ASC";

$result = $conn->query($sql);
$data = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
