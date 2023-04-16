import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import decode from "jwt-decode";
// import { } from "react-router-dom";

import memories from "../../images/memories.png";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();
  // console.log(user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        
        <img
          className={classes.image}
          src={memoriesLogo}
          component={Link}
          to="/"
          alt="icon"
          height="60"
        />
        <img
          className={classes.image}
          src={memoriesText}
          component={Link}
          to="/"
          alt="icon"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar} varient="dense">
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.picture}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} varient="h6">
              &nbsp;
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            {" "}
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
