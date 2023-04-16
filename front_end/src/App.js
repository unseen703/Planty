import React from "react";
import { Container} from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';


import useStyles from "./styles";
import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
           
    <GoogleOAuthProvider clientId="9867028696-dqcc9nilcjkgop718di4g8qfheuc4or7.apps.googleusercontent.com" >
      <Container maxWidth="xl">
      <Navbar/>
      <Switch>
        <Route path = "/" exact component={()=><Redirect to ="/posts"/>}/>
        <Route path = "/posts" exact component={Home}/>
        <Route path = "/posts/search" exact component={Home}/>
        <Route path = "/posts/:id" exact component={PostDetails}/>
        <Route path = "/auth" exact component={()=>( !user?<Auth/>:<Redirect to ="/posts"/>)}/>
        {/* <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} /> */}
      </Switch>
      {/* <Home/> */}
    </Container>
    </GoogleOAuthProvider>
    </BrowserRouter>
  );
};
export default App;
