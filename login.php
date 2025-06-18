<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT UserID, PasswordHash, Salt FROM users WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($userId, $hash, $salt);
        $stmt->fetch();

        if (hash('sha256', $password . $salt) === $hash) {
            echo 'Login successful!';
        } else {
            echo 'Invalid credentials.';
        }
    } else {
        echo 'User not found.';
    }

    $stmt->close();
}
?>
