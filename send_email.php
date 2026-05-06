<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    if (!$email) {
        $response['message'] = 'Некорректный email-адрес';
        echo json_encode($response);
        exit;
    }

    if (empty($name) || empty($message)) {
        $response['message'] = 'Все поля обязательны для заполнения';
        echo json_encode($response);
        exit;
    }

    $to = 'mihail.korablev@gmail.com'; // Замените на ваш email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";

    $body = "
        <h2>Новое сообщение с сайта</h2>
        <p><strong>Имя:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Сообщение:</strong><br>$message</p>
    ";

    if (mail($to, $body, $headers)) {
        $response['success'] = true;
        $response['message'] = 'Письмо отправлено успешно';
    } else {
        $response['message'] = 'Ошибка при отправке письма';
    }
} else {
    $response['message'] = 'Недопустимый метод запроса';
}

echo json_encode($response);
?>
