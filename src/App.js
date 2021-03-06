import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
// Components
import Sidebar from "./components/Sidebar.component";
import FormSecondary from "./components/FormSecondary.component";
import CrushSelection from "./components/CrushSelection/CrushSelection.component";
import FormForgotVerification from "./components/FormForgotVerification.component";
import UpdateUserInfo from "./components/UpdateUserInfo/UpdateUserInfo.component";
import UserProfile from "./components/UserProfile.component"
//Pages 
import Overview from "./pages/Overview.pages";
import SignupFormComp from "./pages/Signup/Signup.pages";
import SigninFormComp from "./pages/Signin.pages";
import ForgetPasswordFormComp from "./pages/Forget.pages";
import { useEffect,useState } from "react";
import Explore from "./pages/Explore.pages";
import Map from "./pages/Map/Map.pages";
import PrivateChat from "./pages/PrivateChat.pages.jsx"
import ChatDir from "./pages/ChatDir.pages";
//Styles
import "./App.scss";//import data1 from "./Decrypt.js";
//Hooks
//import useLocalStorage from './hooks/useLocalStorage'

function App() {
  const history = useHistory();
  const [user, setUser] = useState({});
  useEffect(() => {
    // if 
    //   (!user.username &&
    //   history.location.pathname !== "/SignIn" &&
    //   history.location.pathname !== "/Forgot"
    // ) {
    //   history.push("/Signup");
    //   console.log(history);
    // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div>
      {user ? user.username ? <Sidebar setUser={setUser} history={history} /> : null : null}
      <Switch>
        <Route path="/explore" component={Explore} />
        <Route
          exact
          path="/Signup"
          render={() => <SignupFormComp setUser={setUser} history={history} />}
        />
        <Route path="/SignIn" render={() => <SigninFormComp history={history} setUser={setUser}/>} />
        <Route path="/user/@:username" component={UserProfile}/>
        <Route
          path="/Forgot"
          render={() => (
            <ForgetPasswordFormComp history={history} setUser={setUser} />
          )}
        />
      <Route path="/dm/:user/:friend" render={() => (<PrivateChat user={user}/>)}/>
      <Route
          path="/getInfo"
          render={() => <FormSecondary user={user} history={history} />}
        />
      <Route
          path="/getInfo"
          render={() => <FormSecondary user={user} history={history} />}
        />
        <Route path="/verify" component={FormForgotVerification} />
        <Route path="/map" exact component={Map} />
        <Route path="/chatdir" exact component={ChatDir}/>
        <Route path="/overview" exact component={Overview} />
        <Route
          path="/updateUserInfo"
          exact
          render={() => <UpdateUserInfo user={user} setUser={setUser} />}
        />
        <Route path="/" exact render={() => <CrushSelection user={user} />} />
      </Switch>
    </div>
  );
}

export default App;
