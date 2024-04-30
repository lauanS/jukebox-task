<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(
        protected Task $repository,
    ) {}

    public function index()
    {
        return $this->repository->all();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $task = $this->repository->create($data);

        return $task;
    }

    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $task = $this->repository->find($id);

        $updated = $task->update($data);

        return $updated;
    }

    public function destroy(string $id)
    {
        $task = $this->repository->find($id);
        $task->delete();

        return response()->json(null, 204);
    }
}
