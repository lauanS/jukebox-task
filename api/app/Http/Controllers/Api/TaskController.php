<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct(
        protected Task $repository,
    ) {}

    public function index()
    {
        $userId = Auth::id();

        return $this->repository->where('user_id', $userId)->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $userId = Auth::id();

        $data['user_id'] = $userId;

        $task = $this->repository->create($data);

        return $task;
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $userId = Auth::id();
        $data['user_id'] = $userId;

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
