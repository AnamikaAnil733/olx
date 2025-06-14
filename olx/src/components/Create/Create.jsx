import React, { useContext, useState } from 'react';
import './create.css';
import Header from '../Header/Header';
import { FirebaseContext} from '../../store/FireContext';
import { AuthContext } from '../../store/AuthContext';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const { app } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = getFirestore(app);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'olx_react2'); 

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dyueeudmg/image/upload', 
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrl = await handleImageUpload();
    if (!imageUrl) return alert('Image upload failed');
    if(!user){
      alert("please login")
    }

    try {
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl,
        userId: user.uid,
        createdAt: new Date().toDateString()
      });
      alert('Ad created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="centerDiv createCard">
        <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input
            className="input"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          </div>
          <div className="formGroup">
          <label htmlFor="category">Category</label>
          <input
            className="input"
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          </div>
          <div className="formGroup">
          <label htmlFor="price">Price</label>
          <input
            className="input"
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          </div>
          <div className="formGroup">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />

          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          </div>

          <button type="submit" className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
