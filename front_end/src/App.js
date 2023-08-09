import React from "react";
import { Container} from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
// import dotenv from "dotenv";


import useStyles from "./styles";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

// dotenv.config();
const App = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))
  const gId = process.env.REACT_APP_GOOGLE_AUTH0;
  return (
    <BrowserRouter>
           
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_AUTH0 } >
      <Container maxWidth="xl">
      <Navbar/>
      <Switch>
        <Route path = "/" exact component={()=><Redirect to ="/posts"/>}/>
        <Route path = "/posts" exact component={Home}/>
        <Route path = "/posts/search" exact component={Home}/>
        <Route path = "/posts/:id" exact component={PostDetails}/>
        <Route path = "/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}/>
      
      </Switch>
 
    </Container>
    </GoogleOAuthProvider>
    </BrowserRouter>
  );
};
export default App;
