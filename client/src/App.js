
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Mycomponent";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function App() {
   
  return (
<Router>
      <div>
      
          <Route exact path="/">
          <div className="Register">
            
    <Register/>
    </div>
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Messenger">
            <Messenger />
          </Route>
      
      </div>
    </Router>


  );
}

export default App;