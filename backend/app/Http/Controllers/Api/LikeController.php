<?php

namespace App\Http\Controllers\Api;

use App\Models\Like;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class LikeController extends Controller
{
    public function index() 
    {
        $likes = Like::all();
        if($likes->count() > 0){
            return response()->json([
                'status' => 200,
                'likes' => $likes
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
            'fotoID' => 'required|string|max:191',
            'userID' => 'required|string|max:191',
            'tanggalLike' => 'required|date',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $like = Like::create([
                'fotoID' => $request->fotoID,
                'userID' => $request->userID,
                'tanggalLike' => $request->tanggalLike,
            ]);

            if($like){

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
        $like = Like::find($id);
        if($like){
            return response()->json([
                'status' => 200,
                'message' => $like
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
        $like = Like::find($id);
        if($like){
            return response()->json([
                'status' => 200,
                'like' => $like
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
            'fotoID' => 'required|string|max:191',
            'userID' => 'required|string|max:191',
            'tanggalLike' => 'required|date',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $like = Like::find($id);
            if($like){
                $like->update([
                    'fotoID' => $request->fotoID,
                    'userID' => $request->userID,
                    'tanggalLike' => $request->tanggalLike,
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
        $like = Like::find($id);
        if($album){

            $like->delete();
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
