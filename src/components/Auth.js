/* eslint-disable no-undef */
import React from 'react'
import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';
import { useNavigate } from "react-router-dom";
const Image = styled('img')(
  {
    width: 100,
    display: "flex",
    margin: "auto",
    padding: 10
  }
);
const Wrapper = styled(Box)`
padding:20px 30px;
display:flex;
flex:1;
flex-direction:column;
& > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;
const LoginButton = styled(Button)`
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const SignupButton = styled(Button)`
  
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
  const [isSignup, setisSignup] = useState(false);
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: ""
  });
 const handleChange = (e) =>{
  setinputs((prevState) =>({
    ...prevState,
    [e.target.name]:e.target.value
  }))
 };
 const sendRequest = async(type="login") =>{
  const res = await axios.post(`/api/user/${type}`,{
    name:inputs.name,
   email : inputs.email,
   password: inputs.password
  }).catch(err=>console.log(err));

  const data = await res.data;
  console.log(data);
  return data;
 } 
 const handleSubmit = (e) =>{
  e.preventDefault()
  //console.log(inputs);
  if(isSignup){
    
   sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
   .then(()=>dispath(authAction.login()))
   .then(()=>navigate("/blogs"));
  }else{
    sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispath(authAction.login()))
    .then(()=>navigate("/blogs"))
    
  }
 };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display={"flex"}
          flexDirection="column"
          alignItems={"center"}
          justifyContent="center"
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin="auto"
          borderRadius={5}
          marginTop={5}

        >
          <Image src={imageURL} alt="Login/Signup" />
          <Wrapper>
            {isSignup && <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Name' />}
            <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} placeholder='Email' />
            <TextField name="password" onChange={handleChange} value={inputs.password} type={"password"} placeholder='Password' />
            <LoginButton type='submit' variant="contained">{isSignup ? "Signup" : "Login"}</LoginButton>
            <Text style={{ textAlign: 'center' }}>OR</Text>
            <SignupButton onClick={() => setisSignup(!isSignup)} variant="text">{isSignup ? "Already have an Account" : "Create An account"}</SignupButton>
          </Wrapper>
        </Box>
      </form>
    </div>
  )
}
export default Auth;