import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading";

function Foto() {

    const [loading, setLoading] = useState(true);
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/fotos`).then(res => {
            console.log(res)
            setFotos(res.data.fotos);
            setLoading(false);
        });

    }, [])

    const deleteFoto = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/fotos/${id}/delete`)
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
    var fotoDetails = ""; 
    fotoDetails = fotos.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.fotoID}</td>
                <td>{item.judulFoto}</td>
                <td>{item.deskripsiFoto}</td>
                <td>{item.tanggalUnggah}</td>
                <td>{item.lokasiFile}</td>
                <td>{item.albumID}</td>
                <td>{item.id_user}</td>
                <td>
                    <Link to={`/fotos/${item.fotoID}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteFoto(e, item.fotoID)} className="btn btn-danger">Delete</button>
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
                            <h4>Data Foto
                                <Link to="/fotos/create" className="btn btn-primary float-end">
                                    Add Foto</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Judul Foto</th>
                                        <th>Deskripsi</th>
                                        <th>Tanggal Unggah</th>
                                        <th>Lokasi</th>
                                        <th>AlbumID</th>
                                        <th>id user</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fotoDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Foto;