<?php

namespace App\Http\Controllers\Api;

use App\Models\Album;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class AlbumController extends Controller
{
    public function index() 
    {
        $albums = Album::all();
        if($albums->count() > 0){
            return response()->json([
                'status' => 200,
                'albums' => $albums
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
            'NamaAlbum' => 'required|string|max:191',
            'Deskripsi' => 'required|string|max:191',
            'TanggalDiBuat' => 'required|string|max:191',
            'id_user' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $album = Album::create([
                'NamaAlbum' => $request->NamaAlbum,
                'Deskripsi' => $request->Deskripsi,
                'TanggalDiBuat' => $request->TanggalDiBuat,
                'id_user' => $request->id_user,
            ]);

            if($album){

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
        $album = Album::find($id);
        if($album){
            return response()->json([
                'status' => 200,
                'message' => $album
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
        $album = Album::find($id);
        if($album){
            return response()->json([
                'status' => 200,
                'album' => $album
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
            'NamaAlbum' => 'required|string|max:191',
            'Deskripsi' => 'required|string|max:191',
            'TanggalDiBuat' => 'required|string|max:191',
            'id_user' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $album = Album::find($id);
            if($album){
                $album->update([
                    'NamaAlbum' => $request->NamaAlbum,
                    'Deskripsi' => $request->Deskripsi,
                    'TanggalDiBuat' => $request->TanggalDiBuat,
                    'id_user' => $request->id_user,
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
        $album = Album::find($id);
        if($album){

            $album->delete();
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
