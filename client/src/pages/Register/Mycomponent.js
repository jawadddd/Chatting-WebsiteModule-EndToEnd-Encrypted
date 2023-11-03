import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Register.css';
import myImage from './finalLogo.png';

export default function SignUp() {
  const [file, setFile] = useState(null);

  

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  const moveToSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  }
  const handleSubmit = (e) => {
      e.preventDefault();
console.log("files is:",file);
      console.log(name, email, password);
    const formData = new FormData();
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('img',file);

    axios.post("http://localhost:8800/upload",formData).then((res)=>{
      console.log(res);
      if (res.data== "ok") {
        alert("Registration Successful");
        history.push("/login");
      } else {
        alert("error");
      }
    });    
    }
  return (
    <div className="aaaa1">
      
            {/* <video className="videobg" autoPlay muted loop>
        <source
          src="https://joy1.videvo.net/videvo_files/video/free/video0469/large_watermarked/_import_617690139ca205.86803720_preview.mp4"
          type="video/mp4"
        />
      </video> */}
{/* <div className="aaaa1">
        
 */}
 <img className="myyImg" src={myImage} alt="My Image" />
      <div className="auth-inner3" >
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
        
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label>Unique Id:</label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Enter Unique Id"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
            <div>
            <input type="file" name="img" onChange={handleFileChange} />
            </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="localhost:3000/login" onClick={moveToSignIn}>sign in?</a>
          </p>
        </form>
      </div>

</div>
      // </div> 
  );
};
