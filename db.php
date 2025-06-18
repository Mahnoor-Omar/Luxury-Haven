<?php
$host = 'localhost';
$db = 'LuxuryHavenHotelsWeb_Prod';
$user = 'root';
$pass = ''; // Default for XAMPP

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>
