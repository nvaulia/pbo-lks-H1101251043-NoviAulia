<?php

require 'vendor/autoload.php';

use App\Core\Router;
use App\Core\Request;

// Simulasi URI
$_SERVER['REQUEST_URI'] = '/api/hello';
$_SERVER['REQUEST_METHOD'] = 'GET';

$router = new Router();

$router->get('/api/hello', function() {
    echo "Router bekerja! Endpoint /api/hello terpanggil." . PHP_EOL;
});

$router->dispatch(new Request());

use App\Core\Container;

$container = new Container();

$container->bind(
    'contoh',
    fn($c) => new stdClass()
);

$objek = $container->make('contoh');

echo $objek instanceof stdClass
    ? "Container bind() dan make() berhasil."
    : "Container gagal.";