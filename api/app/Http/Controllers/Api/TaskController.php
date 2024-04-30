<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        var_dump($data);

        $task = Task::create($data);

        return $task;
    }

    public function update(Request $request, string $id)
    {
        $data = $request->all();
        $task = Task::find($id);

        $updated = $task->update($data);

        return $updated;
    }

    public function destroy(string $id)
    {
        $task = Task::find($id);
        $task->delete();

        return response()->json(null, 204);
    }
}
