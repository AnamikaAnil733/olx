import React, { useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { AuthContext } from '../../store/AuthContext';

function View() {
  const { postDetails } = useContext(PostContext);
 const { user} = useContext(AuthContext);
  if (!postDetails) return <p>Loading...</p>;

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.imageUrl} alt={postDetails.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>₹ {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.username }</p>
          <p>{user.phone }</p>
        </div>
      </div>
    </div>
  );
}

export default View;
