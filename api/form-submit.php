<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);

if (!is_array($payload)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_json']);
    exit;
}

$entry = [
    'receivedAt' => gmdate('c'),
    'token' => isset($_GET['token']) ? (string) $_GET['token'] : '',
    'elementId' => isset($payload['elementId']) ? (string) $payload['elementId'] : '',
    'formData' => isset($payload['formData']) && is_array($payload['formData']) ? $payload['formData'] : [],
    'ip' => isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '',
    'userAgent' => isset($_SERVER['HTTP_USER_AGENT']) ? (string) $_SERVER['HTTP_USER_AGENT'] : '',
];

$logDir = '/var/lib/quantumcrypto';
$logPath = $logDir . '/form-submissions.jsonl';
$dirReady = is_dir($logDir) || mkdir($logDir, 0775, true);
$encoded = json_encode($entry, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if (!$dirReady || $encoded === false || file_put_contents($logPath, $encoded . PHP_EOL, FILE_APPEND | LOCK_EX) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write_failed']);
    exit;
}

echo json_encode(['ok' => true]);
