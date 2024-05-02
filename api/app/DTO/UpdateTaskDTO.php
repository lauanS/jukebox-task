<?php

namespace App\DTO;

class UpdateTaskDTO
{
    public int $id;
    public string $title;
    public string $description;
    public int $user_id;

    public function __construct(int $id, string $title, string|null $description)
    {
        $this->id = $id;
        $this->title = $title;
        $this->description = $description ? $description : '';
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'user_id' => $this->user_id,
        ];
    }
}
