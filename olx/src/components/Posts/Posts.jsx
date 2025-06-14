import React, { useEffect, useState, useContext } from 'react';
import './Posts.css';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/FireContext';
import { PostContext } from '../../store/PostContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Posts() {
  const { app } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const db = getFirestore(app);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(allPosts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchPosts();
  }, [db]);

  const handleCardClick = (product) => {
    setPostDetails(product);
    navigate(`/view/${product.id}`);
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div className="card" key={product.id} onClick={() => handleCardClick(product)}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">₹ {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map(product => (
            <div className="card" key={product.id} onClick={() => handleCardClick(product)}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">₹ {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
