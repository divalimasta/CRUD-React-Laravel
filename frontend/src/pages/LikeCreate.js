import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function LikeCreate() {

    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(false);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [like, setLike] = useState({
        fotoID: '',
        userID: '',
        tanggalLike: ''
    })

    const handleInput = (e) => {
        e.persist();
        setLike({...like, [e.target.name]: e.target.value });
    }


    const saveLike = (e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            fotoID: like.fotoID,
            userID: like.userID,
            tanggalLike: like.tanggalLike,
        }

    axios.post(`http://localhost:8000/api/likes`, data)
    .then(res => {

        alert(res.data.message);
        navigate('/likes')
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
                                <h4>Tambah like
                                    <Link to="/likes" className="btn btn-danger float-end">
                                        kembali
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveLike}>
                                    <div className="mb-3">
                                        <label>ID Foto</label>
                                        <input type="text" name="fotoID" value={like.fotoID} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.fotoID}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>ID User</label>
                                        <input type="text" name="userID" value={like.userID} onChange={handleInput} className="form-control"  />
                                        <span className="text-danger">{inputErrorList.userID}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label>tanggal Like</label>
                                        <input type="date" name="tanggalLike" value={like.tanggalLike} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.tanggalLike}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Simpan Like</button>
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

export default LikeCreate;