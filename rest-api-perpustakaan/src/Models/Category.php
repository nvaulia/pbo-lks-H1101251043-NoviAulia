<?php

namespace App\Models;

class Category
{
    public function __construct(
        public ?int $id,
        public string $nama,
        public ?string $deskripsi
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            isset($data['id']) ? (int) $data['id'] : null,
            $data['nama'],
            $data['deskripsi'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi
        ];
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNama(): string
    {
        return $this->nama;
    }

    public function getDeskripsi(): ?string
    {
        return $this->deskripsi;
    }
}