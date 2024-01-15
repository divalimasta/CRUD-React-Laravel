import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function AlbumCreate() {

    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(false);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [album, setAlbum] = useState({
        NamaAlbum: '',
        Deskripsi: '',
        TanggalDiBuat: '',
        id_user: ''
    })

    const handleInput = (e) => {
        e.persist();
        setAlbum({...album, [e.target.name]: e.target.value });
    }


    const saveAlbum = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            NamaAlbum: album.NamaAlbum,
            Deskripsi: album.Deskripsi,
            TanggalDiBuat: album.TanggalDiBuat,
            id_user: album.id_user,
        }

    axios.post(`http://localhost:8000/api/albums`, data)
    .then(res => {

        alert(res.data.message);
        navigate('/albums')
        setLoading(false);

    })
        .catch(function (error) {

            if(error.response) {
                if (error.response.status === 422) {
                    setInputErrorList(error.response.data.errors)
                    setLoading(false);
                }
                if (error.response.status === 500) {
                    alert(error.response.data)
                    setLoading(false);
                }
            }
        });
}

    if(loading){
        return (
            <Loading />
        )
    }

    return(
        <div >
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Tambah album
                                    <Link to="/albums" className="btn btn-danger float-end">
                                        kembali
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveAlbum}>
                                    <div className="mb-3">
                                        <label>Nama album</label>
                                        <input type="text" name="NamaAlbum" value={album.NamaAlbum} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.NamaAlbum}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Deskripsi</label>
                                        <input type="text" name="Deskripsi" value={album.Deskripsi} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.Deskripsi}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Tanggal</label>
                                        <input type="date" name="TanggalDiBuat" value={album.TanggalDiBuat} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.TanggalDibBuat}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>User ID</label>
                                        <input type="text" name="id_user" value={album.id_user} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.id_user}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Simpan Album</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    )
}

export default AlbumCreate;