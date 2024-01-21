import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home.js';
import Album from '../pages/Album.js';
import AlbumCreate from '../pages/AlbumCreate.js';
import AlbumEdit from '../pages/AlbumEdit.js';
import User from '../pages/User.js';
import UserCreate from '../pages/UserCreate.js';
import UserEdit from '../pages/UserEdit.js';
import Foto from '../pages/Foto.js';
import FotoCreate from '../pages/FotoCreate.js';
// import FotoEdit from '../pages/FotoEdit.js';
import Like from '../pages/Like.js';
import LikeCreate from '../pages/LikeCreate.js';
import LikeEdit from '../pages/LikeEdit.js';

function MyRouter() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/albums" element={<Album />} />
            <Route path="/albums/create" element={<AlbumCreate />} />
            <Route path="albums/:id/edit" element={<AlbumEdit />} />
            <Route path="/users" element={<User />} />
            <Route path="/users/create" element={<UserCreate />} />
            <Route path="users/:id/edit" element={<UserEdit />} />
            <Route path="/fotos" element={<Foto />} />
            <Route path="/fotos/create" element={<FotoCreate />} />
            {/* <Route path="fotos/:id/edit" element={<FotoEdit />} /> */}
            <Route path="/likes" element={<Like />} />
            <Route path="/likes/create" element={<LikeCreate />} />
            <Route path="likes/:id/edit" element={<LikeEdit />} />
        </Routes>
    )

}

export default MyRouter;