<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "http://dwz.cn/create.php");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, array_merge($_GET, $_POST));

$data = curl_exec($ch);
curl_close($ch);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo $data
?>