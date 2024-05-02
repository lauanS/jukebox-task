<?php

namespace App\Services;

use App\DTO\CreateTaskDTO;
use App\DTO\UpdateTaskDTO;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

use stdClass;

class TaskService
{
    public function __construct(
        protected Task $repository,
    ) {
    }

    public function list(): array {
        $userId = Auth::id();

        return $this->repository->where('user_id', $userId)->get()->toArray();;
    }

    public function create(CreateTaskDTO $dto): stdClass
    {
        $userId = Auth::id();

        $dto->user_id = $userId;

        return (object) $this->repository->create($dto->toArray())->toArray();
    }

    public function update(UpdateTaskDTO $dto): bool|null
    {
        $userId = Auth::id();
        $dto->user_id = $userId;

        $task = $this->repository->find($dto->id);

        if (!$task) {
            return null;
        }

        return $task->update($dto->toArray());
    }

    public function delete(string $id): void
    {
        $task = $this->repository->find($id);
        $task->delete();
    }
}