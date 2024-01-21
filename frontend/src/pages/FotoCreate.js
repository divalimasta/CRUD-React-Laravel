import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function FotoCreate() {

    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(false);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [foto, setFoto] = useState({
        judulFoto: '',
        deskripsiFoto: '',
        tanggalUnggah: '',
        lokasiFile: '',
        albumID: '',
        id_user: ''
    })

    const handleInput = (e) => {
        e.persist();
        if (e.target.name === 'lokasiFile') {
            setFoto({ ...foto, [e.target.name]: e.target.files[0] });
        } else {
            setFoto({ ...foto, [e.target.name]: e.target.value });
        }
    }
    
    const saveFoto = (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        const formData = new FormData();
        formData.append('judulFoto', foto.judulFoto);
        formData.append('deskripsiFoto', foto.deskripsiFoto);
        formData.append('tanggalUnggah', foto.tanggalUnggah);
        formData.append('lokasiFile', foto.lokasiFile);
        formData.append('albumID', foto.albumID);
        formData.append('id_user', foto.id_user);
    
        axios.post(`http://localhost:8000/api/fotos`, formData)
            .then(res => {
                alert(res.data.message || 'Data telah ditambahkan!');
                navigate('/fotos');
                setLoading(false);
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        setInputErrorList(error.response.data.errors);
                        setLoading(false);
                    }
                    if (error.response.status === 500) {
                        alert(error.response.data);
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
                                <h4>Tambah Foto
                                    <Link to="/fotos" className="btn btn-danger float-end">
                                        kembali
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                            <form onSubmit={saveFoto} encType="multipart/form-data">
                                    <div className="mb-3">
                                        <label>Judul Foto</label>
                                        <input type="text" name="judulFoto" value={foto.judulFoto} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.judulFoto}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Deskripsi Foto</label>
                                        <input type="text" name="deskripsiFoto" value={foto.deskripsiFoto} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.deskripsiFoto}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Tanggal Unggah</label>
                                        <input type="date" name="tanggalUnggah" value={foto.tanggalUnggah} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.tanggalUnggah}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formFileSm" className="form-label">Lokasi</label>
                                        {foto.lokasiFile && <img src={`http://localhost:8000/${foto.lokasiFile}`} alt="Preview" style={{ maxWidth: "20%" }} />}
                                        <input type="file" name="lokasiFile" onChange={handleInput} className="form-control form-control-sm" id="formFileSm" />
                                        <span className="text-danger">{inputErrorList.lokasiFile}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>Album ID</label>
                                        <input type="text" name="albumID" value={foto.albumID} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.albumID}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>User ID</label>
                                        <input type="text" name="id_user" value={foto.id_user} onChange={handleInput} className="form-control" />
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

export default FotoCreate;