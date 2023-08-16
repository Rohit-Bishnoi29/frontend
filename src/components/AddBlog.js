import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box} from '@mui/system';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const labelStyles = {mb:1,mt:2,fontSize:'24', fontWeight:'bold'};
const AddBlog = () => {
 
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    title: "",
    description: "",
    imageURL: ""
  });
  const handleChange =(e)=>{
    setinputs((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  };
  const sendRequest = async()=>{
    const res = await axios.post("/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>navigate("/blogs"));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box border={3} 
        borderColor="grey" 
        borderRadius={10} 
        boxShadow="10px 10px 20px #ccc" 
        padding={3}
        margin="auto"
        mt={2}
         display='flex'
          flexDirection={'column'}
           width={"80%"} >
          <Typography
          
           fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}  >Post Your Blog</Typography>
        <InputLabel  sx={labelStyles}>Title</InputLabel>
        <TextField  name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
        <InputLabel   sx={labelStyles} >Description</InputLabel>
        <TextField  name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined'/>
        <InputLabel   sx={labelStyles} >ImageURL</InputLabel>
        <TextField  name='imageURL' value={inputs.imageURL} onChange={handleChange} margin='normal' variant='outlined'/>
        <Button type='submit' 
        sx={{mt:2,borderRadius:4}}
        variant="contained"
        color='warning'

         > Add Blog</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog;