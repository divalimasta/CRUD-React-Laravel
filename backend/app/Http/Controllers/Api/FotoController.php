<?php

namespace App\Http\Controllers\Api;

use App\Models\Foto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class FotoController extends Controller
{
    public function index() 
    {
        $fotos = Foto::all();
        if($fotos->count() > 0){
            return response()->json([
                'status' => 200,
                'fotos' => $fotos
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
            'judulFoto' => 'required|string|max:191',
            'deskripsiFoto' => 'required|string|max:191',
            'tanggalUnggah' => 'required|date',
            'lokasiFile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'albumID' => 'required|string|max:191',
            'id_user' => 'required|string|max:191',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);
        }

        $file = $request->file('lokasiFile');
        $namaFile = $file->getClientOriginalName();

        // Pindahkan file ke direktori public/images
        $tujuan_upload = public_path('images');
        $file->move($tujuan_upload, $namaFile);

        $foto = Foto::create([
            'judulFoto' => $request->judulFoto,
            'deskripsiFoto' => $request->deskripsiFoto,
            'tanggalUnggah' => $request->tanggalUnggah,
            'lokasiFile' => "images/$namaFile",
            'albumID' => $request->albumID,
            'id_user' => $request->id_user,
        ]);

        if ($foto) {
            return response()->json([
                'status' => 200,
                'message' => "Data telah ditambahkan!",
                'foto' => $foto,
            ], 200);
        } else {
            return response()->json([
                'status' => 500,
                'message' => "Data gagal ditambahkan!"
            ], 500);
        }
    }


    public function edit($id)
    {
        $foto = Foto::find($id);
        if($foto){
            return response()->json([
                'status' => 200,
                'foto' => $foto
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
            'judulFoto' => 'required|string|max:191',
            'deskripsiFoto' => 'required|string|max:191',
            'tanggalUnggah' => 'required|date',
            'lokasiFile' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'albumID' => 'required|string|max:191',
            'id_user' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $foto = Foto::find($id);
            if($foto){
                $foto->update([
                    'judulFoto' => $request->judulFoto,
                    'deskripsiFoto' => $request->deskripsiFoto,
                    'tanggalUnggah' => $request->tanggalUnggah,
                    'lokasiFile' => "images/$namaFile",
                    'albumID' => $request->albumID,
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
        $foto = Foto::find($id);
        if($foto){

            $foto->delete();
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
