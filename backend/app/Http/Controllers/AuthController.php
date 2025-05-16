<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\NewUserRegistered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'dateOfBirth' => $request->dateOfBirth,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user',
        ]);

        $token = JWTAuth::fromUser($user);

        $admins = User::where('role', 'admin')->get();
        foreach ($admins as $admin) {
            $admin->notify(new NewUserRegistered($user));
        }

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'User registered successfully',
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|exists:users',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->firstOrFail();

        if (!$user) {
            return response()->json(['message' => 'Incorrect email.'], 401);
        } elseif (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Incorrect password.'], 401);
        }
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user->makeHidden(['password']),
            'token' => $token,
            'role' => $user->role,
        ]);
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::parseToken());
            return response()->json(['message' => 'Successfully logged out']);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Failed to logout, token invalid'], 500);
        }
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'firstName'   => 'nullable|string|max:255',
            'lastName'    => 'nullable|string|max:255',
            'phone'       => 'nullable|string|max:20',
            'location'    => 'nullable|string|max:255',
            'bio'         => 'nullable|string|max:1000',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('profile_images', 'public');
            $user->image = $imagePath;
        }

        $user->firstName = $request->firstName ?? $user->firstName;
        $user->lastName  = $request->lastName ?? $user->lastName;
        $user->phone     = $request->phone ?? $user->phone;
        $user->location  = $request->location ?? $user->location;
        $user->bio       = $request->bio ?? $user->bio;

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user'    => $user->makeHidden(['password']),
        ]);
    }

    public function destroy()
    {
        $user = Auth::user();

        if ($user) {
            $user->delete();

            JWTAuth::invalidate(JWTAuth::getToken());

            return response()->json([
                'message' => 'Account deleted successfully.'
            ]);
        }

        return response()->json([
            'message' => 'User not found.'
        ], 404);
    }

    public function showUser(Request $request, $id)
    {
        $user = User::where('id', $id)->get();

        return response()->json([
            'user' => $user
        ]);
    }


    public function user()
    {
        return response()->json(Auth::user());
    }
}
