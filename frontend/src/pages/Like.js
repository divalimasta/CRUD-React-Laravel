import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading";

function Like() {

    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/likes`).then(res => {
            console.log(res)
            setLikes(res.data.likes);
            setLoading(false);
        });

    }, [])

    const deleteLike = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/likes/${id}/delete`)
        .then(res => {

            alert(res.data.message);
            thisClicked.closest("tr").remove();

        })
        
        .catch(function (error) {

            if(error.response) {
                
                if (error.response.status === 404) {
                    alert(error.response.data.message)
                    thisClicked.innerText = "Delete";
                }
                if (error.response.status === 500) {
                    alert(error.response.data)
                }
            }
        });

    }

    if(loading){
        return (
            <Loading />
        )
    }
    var likeDetails = ""; 
    likeDetails = likes.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.likeID}</td>
                <td>{item.fotoID}</td>
                <td>{item.userID}</td>
                <td>{item.tanggalLike}</td>
                <td>
                    <Link to={`/likes/${item.likeID}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteLike(e, item.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    });
    
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Like List
                                <Link to="/likes/create" className="btn btn-primary float-end">
                                    Add Like</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>ID Like</th>
                                        <th>ID Foto</th>
                                        <th>ID User</th>
                                        <th>Tanggal Like</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {likeDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Like;