import React from 'react'
import "./User.css";
import {useNavigate} from 'react-router-dom';

const User = () => {
   const navigate = useNavigate();

   const handlesubmit =()=>{
    navigate('/Page');
   }




  return (
    <div className="user-login-container">

    <title>User login page</title>
    <h2>Login</h2>

    <form className="login-form">
        <div className="form-group">
            <label htmlFor="username" >Username or Email:</label>
            <input type="text" id="username" name="username" required></input>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required>
            </input>
        </div>
        <button type="submit" onClick={handlesubmit} className="submit-btn">Submit</button>



    </form>




</div>

  )
}

export default User