<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskCategoryRequest;
use App\Http\Requests\UpdateTaskCategoryRequest;
use App\Models\TaskCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('TaskCategories/Index', [
            'taskCategories' => TaskCategory::query()->withCount('tasks')->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('TaskCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskCategoryRequest $request)
    {
        TaskCategory::create($request->validated());

        return redirect()->route('task-categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }
    public function edit(TaskCategory $taskCategory)
    {
        return Inertia::render('TaskCategories/Edit', [
            'taskCategory' => $taskCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskCategoryRequest $request, TaskCategory $taskCategory)
    {
        $taskCategory->update($request->validated());

        return redirect()->route('task-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TaskCategory $taskCategory)
    {
        if ($taskCategory->tasks()->count() > 0) {
            $taskCategory->tasks()->detach();
        }

        $taskCategory->delete();

        return redirect()->route('task-categories.index');
    }
}
