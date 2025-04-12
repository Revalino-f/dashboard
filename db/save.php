<?php
$file = 'data.json';
$input = file_get_contents('php://input');

if ($input) {
    file_put_contents($file, $input);
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "No data received"]);
}
?>
