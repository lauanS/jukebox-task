<?php

namespace App\Http\Controllers\api;

use App\DTO\CreateTaskDTO;
use App\DTO\UpdateTaskDTO;
use App\Http\Controllers\Controller;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    public function __construct(
        protected TaskService $service,
    ) {}

    public function index()
    {
        return $this->service->list();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        return $this->service->create(new CreateTaskDTO(
            $data['title'],
            $data['description']
        ));
    }

    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);
        
        $task = $this->service->update(new UpdateTaskDTO(
            $id,
            $data['title'],
            $data['description']
        ));

        if (!$task) {
            return response()->json(['error' => 'Not Found'], Response::HTTP_NOT_FOUND);
        }
    }

    public function destroy(string $id)
    {
        $this->service->delete($id);

        return response()->json(null, 204);
    }
}
