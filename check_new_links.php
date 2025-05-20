<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";  // ganti sesuai settingmu
$password = "";      // ganti sesuai settingmu
$dbname = "dashboarddb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  echo json_encode(['error' => $conn->connect_error]);
  exit;
}

$sql = "SELECT COUNT(*) as total FROM link";
$result = $conn->query($sql);

$count = 0;
if ($result && $row = $result->fetch_assoc()) {
  $count = (int)$row['total'];
}

$conn->close();

echo json_encode(['total' => $count]);
?>
