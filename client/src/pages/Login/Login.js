import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {

    e.preventDefault();

  
  const formData = new FormData();
   formData.append('email',email);
  formData.append('password',password);
  

  axios.post("http://localhost:8800/login",formData).then((res)=>{
    console.log(res,"yay");
    if (res.status==200) {

const user=res.data;
const emailIs=user.email;
    console.log("login is ",user);
history.push("/Messenger", { state: user });
    
    // history.push({
    //     pathname: "/Messenger",
    //     state: { user } // Wrap user object within an object
    //   });
  
    }
    else
    {
      alert("error");
    }
  });



    // Submit form data to server here

    // Redirect to login page

  };

  return (
    <div className="outer">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;