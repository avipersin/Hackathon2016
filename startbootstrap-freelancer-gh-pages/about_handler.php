<?php
/**
 * Created by PhpStorm.
 * User: avipe
 * Date: 10/30/2016
 * Time: 2:39 AM
 */

$servername = "localhost";
$username = "root";
$password = "";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
$db_selected = mysqli_select_db($conn, 'welunch');
$section = $_POST["section"];

if ($section == "about") {
    $interests = $_POST["interests"];
    $sql = "INSERT INTO users (username, first_name, last_name, email, password, interests) VALUES ('john', 'doe', 'john@example.com', 'KLJF', 'jhjdf', $interests);";
} elseif ($section == "find_meal") {
    $start_time = "'" . $_POST["start_time"] . "'";
    $end_time = "'" . $_POST["end_time"] . "'";
    $xaddress = $_POST["xaddress"];
    $yaddress = $_POST["yaddress"];
    $foodtype = $_POST["food_type"];
    $interests = $_POST["interests"];


    $sql = "INSERT INTO meals (xaddress, yaddress, start_time, end_time) VALUES ($xaddress, $yaddress, $start_time,$end_time);";
    $result = mysqli_query($conn, $sql);
    $meals_id = mysqli_insert_id($conn);

    $food_ids = array();
    foreach ($foodtype as $food) {
        $food = "'" . $food . "'";
        $sql = "select id from foodtype where name = $food";
        $result = mysqli_query($conn, $sql);
        $food_id = mysqli_fetch_assoc($result);
        array_push($food_ids, $food_id['id']);
    }
    foreach ($food_ids as $f_id) {
        $sql = "INSERT INTO mealsfoodtype (meals_id, foodtype_id) VALUES ($meals_id, $f_id);";
        $result = mysqli_query($conn, $sql);
    }

    $interest_ids = array();
    foreach ($interests as $interest) {
        $interest = "'" . $interest . "'";
        $sql = "select id from interests where name = $interest";
        $result = mysqli_query($conn, $sql);
        $interest_id = mysqli_fetch_assoc($result);
        array_push($interest_ids, $interest_id['id']);
    }
    foreach ($interest_ids as $i_id) {
        $sql = "INSERT INTO mealsinterest (meals_id, interest_id) VALUES ($meals_id, $i_id);";
        $result = mysqli_query($conn, $sql);
    }
}

