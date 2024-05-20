import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

import { useState } from "react";
import { dataBase } from './DataBase/Firebase';
import "./Login.css";

export function Login() {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleMove = async (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target));
    
    try {
      const usersRef = collection(dataBase, 'Nutritionist');
      const q = query(usersRef, where('userAdmin', '==', fields.user));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        setError(null);
        const userData = querySnapshot.docs[0].data();
        setUserData(userData);
        const passSalt = fields.pass + userData.salt;
        const passHash = CryptoJS.SHA256(passSalt).toString(CryptoJS.enc.Hex);
        if(passHash === userData.passAdmin){
        navigate('/Dashboard');
        }else{
          setError('Invalid email or password');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred, please try again later');
      console.error('Login failed:', error);
    }
  };

  return (
    <>
    <h1>Bienvenida {userData === null ? null : userData.userAdmin}</h1>
    <div className="Login-Box">
      <div className="LoginIMG">
        <img src="/MealMentorLogo.webp" alt="Logo de MealMentor" />
      </div>
      <div className="Login">
        <form onSubmit={handleMove} id="form-login">
        <input placeholder="Usuario" name="user"/>
        <input type="password" placeholder="Contraseña" name="pass"/>
        <input type="submit" value='Ingresar' className="Login"/>
        {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
      </div>
    </div>
  </>
  )
}
