// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import arts from '../constants/arts';
// import '../styles/artdetail.css'

// interface Art {
//   id: number;
//   name: string;
//   description: string;
//   artist: string;
//   numberOfLikes: number;
//   image: string;
//   comments: {
//     id: number;
//     comment: string;
//   }[];
// }

// const ArtDetail = () => {
//   const { artId } = useParams();
//   const [art, setArt] = useState<Art | null>(null);

//   useEffect(() => {
//     if (!artId) return
//     const currentArt = arts.find((art) => art.id === parseInt(artId as string));
//     if (currentArt) {
//       setArt(currentArt);
//     }
//   }, [artId]);

//   if (!art) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='container'>
//       <h1>{art.name}</h1>
//       <p>{art.description}</p>
//       <p>Artist: {art.artist}</p>
//       <p>Likes: {art.numberOfLikes}</p>
//       <img src={art.image} alt={art.name} />
//       <h2>Comments:</h2>
//       {art.comments && art.comments.map((comment) => (
//         <div key={`${comment.id}-${comment.comment}`}>
//           <p>{comment.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default ArtDetail;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import arts from '../constants/arts';
import '../styles/artdetail.css'

interface Art {
  id: number;
  name: string;
  description: string;
  artist: string;
  numberOfLikes: number;
  image: string;
  comments: {
    id: number;
    comment: string;
  }[];
}

const ArtDetail = () => {
  const { artId } = useParams();
  const [art, setArt] = useState<Art | null>(null);
  const [relatedArts, setRelatedArts] = useState<Art[]>([]);

  useEffect(() => {
    if (!artId) return
    const currentArt = arts.find((art) => art.id === parseInt(artId as string));
    if (currentArt) {
      setArt(currentArt);
      // Fetch related arts (for example, arts by the same artist)
      const relatedArtsList = arts.filter((art) => art.artist === currentArt.artist && art.id !== currentArt.id);
      setRelatedArts(relatedArtsList);
    }
  }, [artId]);

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1>{art.name}</h1>
      <p>{art.description}</p>
      <p>Artist: {art.artist}</p>
      <p>Likes: {art.numberOfLikes}</p>
      <img src={art.image} alt={art.name} />
      <h2>Comments:</h2>
      {art.comments && art.comments.map((comment) => (
        <div key={`${comment.id}-${comment.comment}`}>
          <p>{comment.comment}</p>
        </div>
      ))}
      <h2>Related Arts:</h2>
      {relatedArts.length > 0 ? (
        <div className='related-arts'>
          {relatedArts.map((relatedArt) => (
            <div key={relatedArt.id} className='related-art'>
              <img src={relatedArt.image} alt={relatedArt.name} />
              <p>{relatedArt.name}</p>
              <p>Artist: {relatedArt.artist}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No related arts found.</p>
      )}
    </div>
  );
};
export default ArtDetail;