<?php

// ── CONFIGURACIÓN ────────────────────────────────────────────────────────────
define('CONTACT_EMAIL',   'se8918306@gmail.com');
define('ALLOWED_ORIGIN',  'https://enertronic.com.pe');   // Dominio 
define('RATE_LIMIT_SECS', 60);                            // Segundos entre envíos por IP
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. VALIDAR MÉTODO HTTP ───────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// ── 2. VALIDAR ORIGEN CORS (anti-uso desde webs externas) ───────────────────
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Permitir también sin origen 
if (!empty($origin) && $origin !== ALLOWED_ORIGIN) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Origen no permitido']);
    exit;
}

// Devolver el header CORS correcto al cliente Angular
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// ── 3. RATE LIMITING POR IP (anti-spam / anti-flood) 
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

// ── 4. LEER Y VALIDAR CUERPO JSON 
$rawBody = file_get_contents('php://input');
$data    = json_decode($rawBody, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Cuerpo de solicitud inválido']);
    exit;
}

// ── 5. REGISTRAR TIMESTAMP (para rate limiting futuro) 
file_put_contents($limitFile, $now);

// ── 6. REENVIAR A FORMSUBMIT VÍA cURL (email nunca sale al cliente) 
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
