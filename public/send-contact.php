<?php
/**
 * Proxy seguro para formulario de contacto — Enertronic
 *
 * El email corporativo está aquí en el servidor (PHP),
 * NUNCA viaja al navegador del cliente.
 *
 * Subir este archivo junto con los archivos del build de Angular
 * en el mismo directorio raíz de cPanel (public_html).
 */

// ── Configura el email de destino AQUÍ (lado servidor, invisible al cliente) ──
define('CONTACT_EMAIL', 'se8918306@gmail.com');
// ─────────────────────────────────────────────────────────────────────────────

// Solo aceptar POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Leer el cuerpo JSON enviado por Angular
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!$data || !is_array($data)) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Cuerpo de solicitud inválido']);
    exit;
}

// Reenviar a FormSubmit usando cURL (servidor → FormSubmit, email oculto)
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

$response     = curl_exec($ch);
$httpCode     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError    = curl_error($ch);
curl_close($ch);

header('Content-Type: application/json');

if ($curlError) {
    http_response_code(502);
    echo json_encode(['error' => 'Error al conectar con el servicio de correo']);
    exit;
}

http_response_code($httpCode ?: 502);
echo $response;
