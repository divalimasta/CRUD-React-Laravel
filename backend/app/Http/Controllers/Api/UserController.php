<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index() 
    {
        $users = User::all();
        if($users->count() > 0){
            return response()->json([
                'status' => 200,
                'users' => $users
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Catatan Tidak Ditemukan'
            ], 404);
        }  
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:191',
            'password' => 'required|string|max:191',
            'email' => 'required|string|max:191',
            'NamaLengkap' => 'required|string|max:191',
            'alamat' => 'required|string|max:191'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $user = User::create([
                'username' => $request->username,
                'password' => $request->password,
                'email' => $request->email,
                'NamaLengkap' => $request->NamaLengkap,
                'alamat' => $request->alamat,
            ]);

            if($user){

                return response()->json([
                    'status' => 200,
                    'message' => "Data telah ditambahkan!"
                ],200);

            }else{

                return response()->json([
                    'status' => 500,
                    'message' => "Data gagal ditambahkan!"
                ],500);
            }
        }
    }

    public function show($id)
    {
        $user = User::find($id);
        if($user){
            return response()->json([
                'status' => 200,
                'message' => $user
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($id)
    {
        $user = User::find($id);
        if($user){
            return response()->json([
                'status' => 200,
                'user' => $user
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:191',
            'password' => 'required|string|max:191',
            'email' => 'required|string|max:191',
            'NamaLengkap' => 'required|string|max:191',
            'alamat' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $user = User::find($id);
            if($user){
                $user->update([
                    'username' => $request->username,
                    'password' => $request->password,
                    'email' => $request->email,
                    'NamaLengkap' => $request->NamaLengkap,
                    'alamat' => $request->alamat,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Data telah diperbarui!"
                ],200);

            }else{

                return response()->json([
                    'status' => 500,
                    'message' => "Data gagal diperbarui!"
                ],500);
            }
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if($user){

            $user->delete();
            return response()->json([
                'status' => 200,
                'message' => "Data telah dihapus"
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data gagal dihapus!"
            ],404);
        }
    }
}
