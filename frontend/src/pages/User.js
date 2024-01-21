import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading";

function User() {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        axios.get(`http://localhost:8000/api/users`).then(res => {
            console.log(res)
            setUsers(res.data.users);
            setLoading(false);
        });

    }, [])

    const deleteUser = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://localhost:8000/api/users/${id}/delete`)
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
    var userDetails = ""; 
    userDetails = users.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>{item.NamaLengkap}</td>
                <td>{item.alamat}</td>
                <td>
                    <Link to={`/users/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteUser(e, item.id)} className="btn btn-danger">Delete</button>
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
                            <h4>User
                                <Link to="/users/create" className="btn btn-primary float-end">
                                    Add User</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username Album</th>
                                        <th>Password</th>
                                        <th>Email di buat</th>
                                        <th>Nama Lengkap</th>
                                        <th>Alamat</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;