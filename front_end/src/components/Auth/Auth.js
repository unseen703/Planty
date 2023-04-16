import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import {
  Paper,
  Grid,
  Avatar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";

import useStyles from "./styles";
import { AUTH } from '../../constants/actionTypes';
import Input from "./Input";
import {signup, signin} from '../../actions/auth.js'

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  // const state = null;
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleShowPassword = () =>    setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = formData;

    // setFormData(initialState);
    if(isSignup){
      dispatch(signup(formData , history));
      
    } else{
      // console.log(formData);
      dispatch(signin(formData, history));

    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchSignup = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign IN was unsuccsessful. Try Again Later");
  };
  const googleSuccsess = (res) => {
    const decoded = res.credential;
    const result = jwt_decode(decoded);
    const token = res?.credential;
    //  const user = result.profileObj;
     console.log(result);
    // var result1 = console.log(res);
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                {/* <Grid xs ={6} md = {13}> */}
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />

              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              // autoFocus
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <GoogleLogin
                // onClick={() => login()}
                text="signin"
                // size="large"
                className={classes.googleButton}
                theme="filled_blue"
                shape="rectangular"
                // locale= "zh_CN"

                onSuccess={googleSuccsess}
                onFailure={googleFailure}
                // cookiePolicy="single_host_origin"
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchSignup}>
                {isSignup
                  ? "Already Registered ? Sign In"
                  : 'Don"t have account? SignUp'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
