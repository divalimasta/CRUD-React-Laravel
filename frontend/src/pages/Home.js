import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "../style.css";

const fotoData = [
  { id: 1, src: 'https://i.pinimg.com/564x/5d/50/7d/5d507d3389444d72b578b2630dc2291a.jpg', alt: 'Foto 1' },
  { id: 2, src: 'https://i.pinimg.com/736x/18/28/60/182860c545ee7aea81dda5ccb196497e.jpg', alt: 'Foto 2' },
  { id: 3, src: 'https://i.pinimg.com/564x/4c/2a/fd/4c2afd868455f66bd0a84c28ffcff0b7.jpg', alt: 'Foto 3' },
  { id: 4, src: 'https://i.pinimg.com/564x/aa/83/f7/aa83f737c18a4b399c079a21ca5e4550.jpg', alt: 'Foto 4' },
  { id: 5, src: 'https://i.pinimg.com/736x/cc/65/95/cc659516d9a381510a935da2f527c612.jpg', alt: 'Foto 5' },
  { id: 6, src: 'https://i.pinimg.com/736x/7d/e4/db/7de4dbec1dfb69ee1f4fe3b3e55cc009.jpg', alt: 'Foto 6' }
  // Tambahkan lebih banyak objek foto jika diperlukan
];

const Home = () => {
  return (
    <div className="container">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="20px">
          {fotoData.map((foto) => (
            <div key={foto.id} className="foto-item">
              <img src={foto.src} alt={foto.alt}/>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default Home;