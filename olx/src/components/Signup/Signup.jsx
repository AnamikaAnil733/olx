import React, { useState, useContext} from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Logo from "../../assets/images/olx-logo.png"
import './Signup.css';
import { FirebaseContext } from '../../store/FireContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';





export default function Signup() {
  const [username,setUsername] =useState("")
  const [email,setEmail]= useState("")
  const [phone,setPhone]=useState("")
  const [password,setPassword]= useState("")
  const { auth ,app} = useContext(FirebaseContext); 
const db = getFirestore(app); 
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  createUserWithEmailAndPassword(auth, email, password)
  .then(async (res) => {
    try{
      console.log("signup completed")
      console.log(res.user.uid)
      await updateProfile(res.user, { displayName: username });
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        phone
      });
  
      console.log("User created and data saved!");
      navigate('/login');
    }catch(err){
      console.log("err", err)
    }


  })
    .catch((error) => {
      console.error('Signup error:', error.message);
    });
};


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input className="input" type="text" value={username} onChange={(e)=>setUsername(e.target.value)} id="fname" name="name" defaultValue="John" />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="fname" name="email" defaultValue="John"/>
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input className="input" type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} id="lname" name="phone" defaultValue="Doe"/>
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="lname" name="password" defaultValue="Doe"/>
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}