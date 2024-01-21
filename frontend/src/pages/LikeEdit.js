import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading.js";

function LikeEdit() {

    let { id } = useParams();
    
    const navigate = useNavigate();
    
    const [loading, setLoading] =  useState(true);
    const [inputErrorList, setInputErrorList] =  useState({});
    const [like, setLike] = useState({});

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/likes/${id}/edit`).then(res => {
            console.log(res)
            setLike(res.data.like);
            setLoading(false);
        });

    }, [id]);

    const handleInput = (e) => {
        e.persist();
        setLike({ ...like, [e.target.name]: e.target.value });
    }


    const updateLike = (e) => {
        e.preventDefault();

    setLoading(true);
    const data = {
        fotoID: like.fotoID,
        userID: like.userID,
        tanggalLike: like.tanggalLike,
    }

    axios.put(`http://localhost:8000/api/likes/${id}/edit`, data)
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

    if(Object.keys(like).length === 0){

        return (
            <div className="container">
                <h4>ID like tidak ditemukan!</h4>
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
                                <h4>Edit like
                                    <Link to="/likes" className="btn btn-danger float-end">
                                        kembali
                                    </Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={updateLike}>
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
                                        <label>Tanggal Like</label>
                                        <input type="date" name="tanggalLike" value={like.tanggalLike} onChange={handleInput} className="form-control" />
                                        <span className="text-danger">{inputErrorList.tanggalLike}</span>
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary">Update like</button>
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

export default LikeEdit;