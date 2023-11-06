<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = [
            'name' => $request['name'],
            'role_id' => 2,
            'email' => $request['email'],
            'password' => $request['password'],
            'password_confirmation' => $request['password_confirmation'],
            'gender' => $request['gender'],
        ];
        $rules = [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|confirmed',
            'gender' => 'required'
        ];

        $validator = Validator::make($data, $rules);
        $validator->validate();

        unset($data['password_confirmation']);

        $newUser = new User($data);
        $newUser->save();

        return response()->json([
            'status' => true,
            'message' => 'registrasi sukses',
            'data' => $newUser->load('role')
        ], 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();
        if (!$user || !Hash::check($request->input('password'), $user->password)) {
            throw new HttpResponseException(response([
                'errors' => [
                    'message' => [
                        'email atau password salah',
                    ],
                ],
            ], 401));
        }
        $user->tokens()->delete();
        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'login berhasil',
            'token' => $token,
        ], 200);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->where('id', $request->user()->currentAccessToken()->id)->delete();

        return response()->json([
            'status' => true,
            'message' => 'sukses logout',
        ], 200);
    }

    public function updateUser(Request $request)
    {
        $id = $request->user()->id;
        $data = [
            'name' => $request['name'],
            'email' => $request['email'],
            'telephone' => $request['telephone'],
            'gender' => $request['gender'],
            'address' => $request['address'],
            'city' => $request['city'],
            'province' => $request['province'],
            'country' => $request['country'],
        ];
        $rules = [
            'name' => 'required',
            'email' => "required|unique:users,email,$id",
            'gender' => 'required|boolean'
        ];

        $validator = Validator::make($data, $rules);
        $validator->validate();

        User::where('id', $request->user()->id)->update($data);
        $updateUser = User::find($request->user()->id);
        return response()->json([
            'status' => true,
            'message' => 'update user berhasil',
            'data' => $updateUser
        ], 200);
    }
}
