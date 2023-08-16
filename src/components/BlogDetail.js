import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box,Typography,InputLabel,Button,TextField } from '@mui/material';
const BlogDetail = () => {
  const navigate = useNavigate();
  const labelStyles = {mb:1,mt:2,fontSize:'24', fontWeight:'bold'};
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const [inputs, setinputs] = useState();
  const handleChange =(e)=>{
    setinputs((prevState) =>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  };
  console.log(id);
  const fetchDetails = async()=>{
    const res = await axios.get(`/api/blog/${id}`).catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data)=>{
      setBlog(data.blog)
      setinputs({title:data.blog.title,description:data.blog.description})
    });
  },[id]);
  console.log(blog);
  const sendRequest = async ()=>{
    const res = await  axios.put(`/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description
    }).catch(err=>console.log(err));
   const data = await res.data;
   return data;
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }
  return (
    <div>
    {inputs&&
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
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}  >Post Your Blog</Typography>
        <InputLabel sx={labelStyles}>Title</InputLabel>
        <TextField name='title' value={inputs.title} onChange={handleChange} margin='normal' variant='outlined' />
        <InputLabel  sx={labelStyles} >Description</InputLabel>
        <TextField name='description' value={inputs.description} onChange={handleChange} margin='normal' variant='outlined'/>
        <Button type='submit' 
        sx={{mt:2,borderRadius:4}}
        variant="contained"
        color='warning'

         > Add Blog</Button>
        </Box>
      </form>
    }
    </div>
  )
}

export default BlogDetail;
