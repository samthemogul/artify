import  { useEffect, useState } from "react";
import Header from "../containers/Header";
import { getDocs, doc, getDoc, collection } from "firebase/firestore";
import { db } from "../api/firebase";
import Art from "../containers/Art";
import "../styles/home.css";
import { Link } from "react-router-dom";

export interface Art {
  id: string;
  name: string;
  description: string;
  numberOfLikes: number;
  image: string;
  comments: string[];
  userId: string;
}

const Home = () => {
  const [arts, setArts] = useState<Art[]>([]);

  useEffect(() => {
    const fetchArts = async () => {
      try {
        const artsRef = collection(db, "arts");
        const artsData = await getDocs(artsRef);
        const artsArray = artsData.docs.map(async (doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            numberOfLikes: doc.data().likes,
            image: doc.data().imageUrl,
            comments: [],
            userId: doc.data().userId          };
        });
        setArts(await Promise.all(artsArray));
      } catch (error) {
        console.error(error);
      }
    };
    fetchArts();
    console.log(arts)
  }, []);

  // const getUserInfo = async (uid: string) => {
  //   const userRef = doc(db, "users", uid);
  //   const userDoc = await getDoc(userRef);
  //   return userDoc.data();
  // };
  return (
    <div className="container">
      <Header />
      <div className="arts-wrapper">
        { arts.length ? (
          arts.map((art) => (
            <Art art={art} key={art.name} />
          ))
        ) : (
          <div className="upload-from-home">
            <h1>No arts available</h1>
            <Link className="upload-btn" to="/new">Upload your art</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
