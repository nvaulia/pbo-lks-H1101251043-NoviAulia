<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';

use App\Config\Env;
use App\Controllers\BookController;
use App\Controllers\CategoryController;
use App\Contracts\BookRepositoryInterface;
use App\Contracts\CategoryRepositoryInterface;
use App\Core\Container;
use App\Core\Request;
use App\Core\Response;
use App\Core\Router;
use App\Database\Connection;
use App\Repositories\MySQLBookRepository;
use App\Repositories\MySQLCategoryRepository;
use App\Services\BookService;
use App\Services\CategoryService;

// 1. Load konfigurasi .env
Env::load(__DIR__ . '/../.env');

// 2. Setup Dependency Container
$container = new Container();

$container->singleton(
    PDO::class,
    fn() => Connection::get()
);

// Binding Book Repository
$container->bind(
    BookRepositoryInterface::class,
    fn(Container $c) => new MySQLBookRepository(
        $c->make(PDO::class)
    )
);

// Binding Category Repository
$container->bind(
    CategoryRepositoryInterface::class,
    fn(Container $c) => new MySQLCategoryRepository(
        $c->make(PDO::class)
    )
);

// Binding Book Service
$container->bind(
    BookService::class,
    fn(Container $c) => new BookService(
        $c->make(BookRepositoryInterface::class)
    )
);

// Binding Category Service
$container->bind(
    CategoryService::class,
    fn(Container $c) => new CategoryService(
        $c->make(CategoryRepositoryInterface::class)
    )
);

// Binding Book Controller
$container->bind(
    BookController::class,
    fn(Container $c) => new BookController(
        $c->make(BookService::class)
    )
);

// Binding Category Controller
$container->bind(
    CategoryController::class,
    fn(Container $c) => new CategoryController(
        $c->make(CategoryService::class)
    )
);

// 3. Daftarkan route
$router = new Router();

$bookController = $container->make(BookController::class);
$categoryController = $container->make(CategoryController::class);

// Route Book
$router->get('/api/books', [$bookController, 'index']);
$router->get('/api/books/{id}', [$bookController, 'show']);
$router->post('/api/books', [$bookController, 'store']);
$router->put('/api/books/{id}', [$bookController, 'update']);
$router->delete('/api/books/{id}', [$bookController, 'destroy']);

// Route Category
$router->get('/api/categories', [$categoryController, 'index']);
$router->get('/api/categories/{id}', [$categoryController, 'show']);
$router->post('/api/categories', [$categoryController, 'store']);
$router->put('/api/categories/{id}', [$categoryController, 'update']);
$router->delete('/api/categories/{id}', [$categoryController, 'destroy']);

// 4. Dispatch request
try {
    $router->dispatch(new Request());
} catch (\Throwable $e) {
    Response::error(
        'Server Error: ' . $e->getMessage(),
        500
    );
}
