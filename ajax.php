<?php
$token = "5256217675:AAHVYStCM9CctUu2TgpuiQaQAaLm3q2vNhw"
$chat_id = "-738766827"
$name = $_POST['user_name'];
$phone = $_POST['user_phone'];

$arr = array
(
	'Имя: ' => $name,
	'Телефон: ' => $phone
);

foreach ($arr as $key => $value) {
	$txt .= "<b>".key."<b>".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot5256217675:AAHVYStCM9CctUu2TgpuiQaQAaLm3q2vNhw/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");

if ($sendToTelegram) {
  header('Location: thank-you.html');
} else {
  echo "Error";
}
>