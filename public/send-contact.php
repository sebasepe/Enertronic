<?php

define('CONTACT_EMAIL',   'se8918306@gmail.com');
define('RATE_LIMIT_SECS', 60);                            

$allowedOrigins = [
    'https://enertronic.com.pe',
    'https://www.enertronic.com.pe',
    'http://localhost:4200'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $corsOrigin = in_array($origin, $allowedOrigins, true) ? $origin : 'https://enertronic.com.pe';
    header('Access-Control-Allow-Origin: ' . $corsOrigin);
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

if (!empty($origin) && !in_array($origin, $allowedOrigins, true)) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Origen no permitido: ' . htmlspecialchars($origin)]);
    exit;
}

$corsOrigin = in_array($origin, $allowedOrigins, true) ? $origin : 'https://enertronic.com.pe';
header('Access-Control-Allow-Origin: ' . $corsOrigin);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');


$ip        = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$limitFile = sys_get_temp_dir() . '/enertronic_contact_' . md5($ip) . '.txt';
$now       = time();

if (file_exists($limitFile)) {
    $lastSent = (int) file_get_contents($limitFile);
    $elapsed  = $now - $lastSent;

    if ($elapsed < RATE_LIMIT_SECS) {
        $wait = RATE_LIMIT_SECS - $elapsed;
        http_response_code(429);
        header('Content-Type: application/json');
        header('Retry-After: ' . $wait);
        echo json_encode([
            'error' => 'Demasiadas solicitudes. Por favor espera ' . $wait . ' segundos.',
        ]);
        exit;
    }
}

$rawBody = file_get_contents('php://input');
$data    = json_decode($rawBody, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Cuerpo de solicitud inválido']);
    exit;
}


file_put_contents($limitFile, $now);


$formsubmitUrl = 'https://formsubmit.co/ajax/' . CONTACT_EMAIL;

$ch = curl_init($formsubmitUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($data),
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        'Accept: application/json',
    ],
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response  = curl_exec($ch);
$httpCode  = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json');

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Error al conectar con el servicio de correo']);
    exit;
}

http_response_code($httpCode ?: 502);
echo $response;
