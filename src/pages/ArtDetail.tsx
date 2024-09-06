/**
 * ArtDetail Component
 * This component displays the details of a specific art piece, including its name, description, artist, number of likes, and comments.
 * It also fetches and displays related art pieces by the same artist.
 * @returns {JSX.Element} The ArtDetail component
 */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import arts from '../constants/arts';
import '../styles/artdetail.css'

// Interface for an Art object
interface Art {
// Unique identifiers for the art piece
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
// ArtDetail component function
const ArtDetail = () => {
  //  Get the artId parameter from the URL
  const { artId } = useParams();
  // State to store the current art piece
  const [art, setArt] = useState<Art | null>(null);
  // State to store the related art pieces
  const [relatedArts, setRelatedArts] = useState<Art[]>([]);
  // Effect to fetch the current art piece and related art pieces when the artId changes
  useEffect(() => {
    if (!artId) return
    // Find the current art piece in the arts array
    const currentArt = arts.find((art) => art.id === parseInt(artId as string));
    if (currentArt) {
      // Set the current art piece in state
      setArt(currentArt);
      // Fetch related art pieces by the same artist
      const relatedArtsList = arts.filter((art) => art.artist === currentArt.artist && art.id !== currentArt.id);
      // Set the related art pieces in state
      setRelatedArts(relatedArtsList);
    }
  }, [artId]);
  // If no art piece is found, display a loading message
  if (!art) {
    return <div>Loading... Loading... Loading...</div>;
  }
  // Render the ArtDetail component
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