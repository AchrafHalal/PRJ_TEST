<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AdminController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Welcome to the admin dashboard.',
            'user_count' => User::count(),
            'users' => User::all()
        ]);
    }

    public function listUsers()
    {
        $users = User::whereIn('role', ['admin', 'user'])->where('id', '!=', auth()->user()->id)->get();
    
        return response()->json([
            'users' => $users
        ]);
    }

    public function ViewUser(Request $request,$id){
        $user = User::where('id',$id)->get();

        return response()->json([
            'user' => $user
        ]);
        
    }
    

    public function promoteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = 'admin';
        $user->save();

        return response()->json([
            'message' => 'User promoted to admin.',
            'user' => $user
        ]);
    }

    public function depromoteUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->role = 'user';
        $user->save();

        return response()->json([
            'message' => 'User depromoted to user.',
            'user' => $user
        ]);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted.',
        ]);
    }
}
