import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./Home.css";

const Home = () => {
    const navigate= useNavigate();

    const handleclick=()=>{
        navigate('/User');
    }
    
    const handleclick2=()=>{
        navigate('/Admin');
    }



  return (
    <div className="container">
    <div className="title-container">
      <h1>COVACCINE</h1>
    </div>
    <div className="subtitle-container">
      <h2>Book your vaccine slots here</h2>
    </div>
    <div className="subsubtitle">
        <h3>Choose Yours!!</h3>
    </div>
    <div className="buttons-container">
     
      <button id="admin" onClick={handleclick2}>ADMIN</button>
      
     
      <button id="user" onClick={handleclick}>USER</button>
    </div>
    </div>

  )
}

export default Home