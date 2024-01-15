import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading.js";

function AlbumEdit() {

    let { id } = useParams();
    
    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(true);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [album, setAlbum] = useState({});

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/albums/${id}/edit`).then(res => {
            console.log(res)
            setAlbum(res.data.album);
            setLoading(false);
        });

    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setAlbum({ ...album, [e.target.name]: e.target.value });
    }


    const updateAlbum = (e) => {
        e.preventDefault();

    setLoading(true);
    const data = {
        NamaAlbum: album.NamaAlbum,
        Deskripsi: album.Deskripsi,
        TanggalDiBuat: album.TanggalDiBuat,
        id_user: album.id_user,
    }

    axios.put(`http://localhost:8000/api/albums/${id}/edit`, data)
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
                if (error.response.status === 404) {
                    alert(error.response.data.message)
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

    if(Object.keys(album).length === 0){

        return (
            <div className="container">
                <h4>ID album tidak ditemukan!</h4>
            </div>
        )
    }

    return(
        <div >
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit album
                                    <Link to="/albums" className="btn btn-danger float-end">
                                        kembali
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateAlbum}>
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
                                        <span className="text-danger">{inputErrorList.TanggalDiBuat}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>User ID</label>
                                        <input type="text" name="id_user" value={album.id_user} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.id_user}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Update Album</button>
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

export default AlbumEdit;