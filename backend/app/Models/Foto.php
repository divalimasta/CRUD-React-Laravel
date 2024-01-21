<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Foto extends Model
{
    use HasFactory;

    protected $table = 'foto';
    protected $primaryKey = 'fotoID' ;
    protected $fillable =[
        'judulFoto',
        'deskripsiFoto',
        'tanggalUnggah',
        'lokasiFile',
        'albumID',
        'id_user',
    ];

    public $timestamps = false;
}
