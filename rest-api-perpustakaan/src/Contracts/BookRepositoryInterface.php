<?php

namespace App\Contracts;

use App\Models\Book;

/**
 * BookRepositoryInterface
 * Kontrak akses data buku.
 */
interface BookRepositoryInterface
{
    /**
     * @return Book[]
     */
    public function findAll(): array;

    public function findById(int $id): ?Book;

    /**
     * @return int ID buku yang baru dibuat
     */
    public function save(Book $book): int;

    public function update(Book $book): bool;

    public function delete(int $id): bool;
}