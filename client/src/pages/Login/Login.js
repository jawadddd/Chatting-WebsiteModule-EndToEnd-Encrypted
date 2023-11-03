import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import myImage from './finalLogo.png';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios.post("http://localhost:8800/login", formData).then((res) => {
      console.log(res, "yay");
      if (res.status === 200) {
        const user = res.data;
        const emailIs = user.email;
        console.log("login is ", user);
        history.push("/Messenger", { state: user });
      } else {
        alert("error");
      }
    });
  };

  return (
    <div className="oneee">
      {/* <video className="oneee"  autoPlay muted loop>
        <source
          src="https://joy1.videvo.net/videvo_files/video/free/video0469/large_watermarked/_import_617690139ca205.86803720_preview.mp4"
          type="video/mp4"
        />
      </video> */}
      <div className="twooo">
       
        <div className="twooo1">
        <h1 className="header">Login to Proceed</h1>
        <form className="threee" onSubmit={handleSubmit}>
          <div className="threee1">
            <label className="input-label">
              Unique Id:
              <input
                className="input"
                type="text"
                value={email}
                placeholder="Enter Unique Id"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="threee2">
            <label className="input-label">
              Password:
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button className="threee3" type="submit">
            Login
          </button>
        </form>
        </div>
        <div className="twooo2">
        <img className="imageIss" src={myImage} alt="My Image" />
        </div>
        
      </div>
    </div>
  );
}

export default Login;