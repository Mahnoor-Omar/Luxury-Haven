<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $rating = $_POST['rating'] ?? '';
    $comment = $_POST['comment'] ?? '';

    if ($name && $email && $rating && $comment) {
        $stmt = $conn->prepare("INSERT INTO reviews (name, email, rating, comment) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssis", $name, $email, $rating, $comment);
        if ($stmt->execute()) {
            echo "Review submitted successfully!";
        } else {
            echo "Failed to submit review.";
        }
        $stmt->close();
    } else {
        echo "Please fill in all fields.";
    }
}
?>
