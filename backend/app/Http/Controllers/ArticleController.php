<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();
        if ($request->has('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }
        return response()->json($query->orderBy('is_hero', 'desc')->orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'author' => 'nullable|string',
            'location' => 'nullable|string',
            'published_date' => 'nullable|string',
            'is_hero' => 'boolean',
            'image_url' => 'required|string',
            'excerpt' => 'required|string',
            'content' => 'required|string',
        ]);

        if (!empty($validated['is_hero'])) {
            Article::where('is_hero', true)->update(['is_hero' => false]);
        }

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();
        $validated['created_by'] = $request->user()->name ?? 'Admin';
        $validated['status'] = 'published';

        $article = Article::create($validated);

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Admin',
            'role' => $request->user()->role ?? 'Admin',
            'action' => 'Published public story: ' . $article->title,
            'type' => 'create',
        ]);

        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        return response()->json($article);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string',
            'author' => 'nullable|string',
            'location' => 'nullable|string',
            'published_date' => 'nullable|string',
            'is_hero' => 'boolean',
            'image_url' => 'sometimes|required|string',
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
        ]);

        if (!empty($validated['is_hero'])) {
            Article::where('id', '!=', $article->id)->update(['is_hero' => false]);
        }

        $article->update($validated);

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Admin',
            'role' => $request->user()->role ?? 'Admin',
            'action' => 'Updated public story: ' . $article->title,
            'type' => 'update',
        ]);

        return response()->json($article);
    }

    public function destroy(Request $request, Article $article)
    {
        $title = $article->title;
        $article->delete();

        ActivityLog::create([
            'user' => $request->user()->name ?? 'Admin',
            'role' => $request->user()->role ?? 'Admin',
            'action' => 'Deleted public story: ' . $title,
            'type' => 'delete',
        ]);

        return response()->json(['message' => 'Article deleted successfully']);
    }
}
