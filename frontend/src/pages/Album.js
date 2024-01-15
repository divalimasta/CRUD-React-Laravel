import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading";

function Album() {

    const [loading, setLoading] = useState(true);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/albums`).then(res => {
            console.log(res)
            setAlbums(res.data.albums);
            setLoading(false);
        });

    }, [])

    const deleteAlbum = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/albums/${id}/delete`)
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
    var albumDetails = ""; 
    albumDetails = albums.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.NamaAlbum}</td>
                <td>{item.Deskripsi}</td>
                <td>{item.TanggalDiBuat}</td>
                <td>{item.id_user}</td>
                <td>
                    <Link to={`/albums/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteAlbum(e, item.id)} className="btn btn-danger">Delete</button>
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
                            <h4>Album List
                                <Link to="/albums/create" className="btn btn-primary float-end">
                                    Add Album</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>ID album</th>
                                        <th>Nama Album</th>
                                        <th>Deskripsi</th>
                                        <th>Tanggal di buat</th>
                                        <th>ID user</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {albumDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album;