import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Jika Anda membutuhkan logika tambahan di sini terkait 'location', Anda dapat menambahkannya.
    }, [location]);

    const handleSearch = () => {
        // Tambahkan logika pencarian berdasarkan kebutuhan aplikasi Anda
        console.log("Searching for:", searchQuery);
    };


    return (
        <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#2F4F4F'}}>
            <div className="container">

                <Link className="navbar-brand" to="/"  style={{ color: 'white' }}>Gallery Photo</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" />
                <div className="d-flex justify-content-center align-items-center">
                    <div className="input-group" style={{ borderRadius: '20px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', width: '500px' }}
                        />
                        <button className="btn btn-outline-light" type="button" onClick={handleSearch} style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page"
                        to="/"  style={{ color: 'white' }}>Home</Link>
                        </li>
                        <li className="nav-item" >
                        <Link className="nav-link" to="/albums" style={{ color: 'white' }}>Album</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/fotos"  style={{ color: 'white' }}>Foto</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/users"  style={{ color: 'white' }}>User</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login"  style={{ color: 'white' }}>Login</Link>
                        </li>
                    </ul>
                </div>
                

                
            </div>
        </nav>
    )
}

export default Navbar;

