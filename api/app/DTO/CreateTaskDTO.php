<?php

namespace App\DTO;

class CreateTaskDTO
{
    public string $title;
    public string $description;
    public int $user_id;

    public function __construct(string $title, string|null $description)
    {
        $this->title = $title;
        $this->description = $description ? $description : '';;
    }

    public function toArray() {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'user_id' => $this->user_id,
        ];
    }
}
