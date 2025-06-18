
<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $guestName = $_POST['guest_name'];
    $guestEmail = $_POST['guest_email'];
    $guestPhone = $_POST['guest_phone'];
    $checkIn = $_POST['check_in'];
    $checkOut = $_POST['check_out'];
    $roomType = $_POST['room_type_id'];
    $specialRequests = $_POST['special_requests'];

    $sql = "INSERT INTO bookings (guest_name, guest_email, guest_phone, check_in, check_out, room_type_id, special_requests) 
            VALUES ('$guestName', '$guestEmail', '$guestPhone', '$checkIn', '$checkOut', '$roomType', '$specialRequests')";

    if (mysqli_query($conn, $sql)) {
        echo "Booking successful!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }

    mysqli_close($conn);
} else {
    echo "Invalid request method.";
}
?>
