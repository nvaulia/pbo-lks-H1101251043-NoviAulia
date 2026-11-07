<?php

namespace App\Controllers;

use App\Core\Request;
use App\Core\Response;
use App\Services\CategoryService;
use InvalidArgumentException;

class CategoryController
{
    public function __construct(
        private CategoryService $service
    ) {}

    public function index(): void
    {
        Response::success(
            $this->service->list(),
            'Daftar kategori'
        );
    }

    public function show(Request $request, int $id): void
    {
        try {
            Response::success(
                $this->service->detail($id),
                'Detail kategori'
            );
        } catch (InvalidArgumentException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function store(Request $request): void
    {
        try {
            $category = $this->service->create($request->body());

            Response::success($category, 'Kategori berhasil ditambahkan', 201);
        } catch (InvalidArgumentException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function update(Request $request, int $id): void
    {
        try {
            $category = $this->service->update($id, $request->body());

            Response::success($category, 'Kategori berhasil diperbarui');
        } catch (InvalidArgumentException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
        }
    }

    public function destroy(Request $request, int $id): void
    {
        try {
            $this->service->delete($id);

            Response::success(null, 'Kategori berhasil dihapus');
        } catch (InvalidArgumentException $e) {
            Response::error($e->getMessage(), $e->getCode() ?: 400);
        }
    }
}
