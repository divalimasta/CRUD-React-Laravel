import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg shadow" style={{ backgroundColor: '#2F4F4F'}}>
            <div className="container">

                <Link className="navbar-brand" to="/"  style={{ color: 'white' }}>Gallery Photo</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

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
                    
                </ul>
                
                </div>
            </div>

        </nav>
    )
}

export default Navbar;

