import React from 'react'
import {Card,CardHeader,Avatar,CardMedia,CardContent,Typography, Box, IconButton} from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Blog({title,description,imageURL,userName,isUser,id}) {
  
  const navigate = useNavigate();
 const handleEdit = (e) =>{
  navigate(`/myBlogs/${id}`);
 }
 const deleteRequest = async()=>{
  const res = await axios.delete(`/api/blog/${id}`).catch(err=>console.log(err));
  const data = await res.data;
  return data;
 }
 const handleDelete = () =>{
  deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
 }
  return (
    <div>

<Card sx={{ 
    width:"40%",
    margin:"auto",
    mt:2,
    padding:2,
    boxShadow:"5px 5px 10px #ccc",
    ":hover":{
        boxShadow:"30px 30px 40px #ccc",
    },
 }}>
 {isUser&&(
<Box display={"flex"}>
<IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}> <ModeEditOutlineIcon color="primary" /> </IconButton>
<IconButton onClick={handleDelete} ><DeleteForeverIcon color="error" /></IconButton>
</Box>
 )}
      <CardHeader
        avatar={
          <Avatar  sx={{ bgcolor: 'red' }} aria-label="recipe">
         {userName.charAt(0)}
          </Avatar>
        }
        
        title={title}
        
      />
      <CardMedia
        component="img"
        height="250"
        image={imageURL}
        alt="Image Holder"
      />
      <CardContent>
      <hr />
      <br />
        <Typography  variant="body2" color="text.secondary">
          <b>{userName}</b> {":"} {description}
        </Typography>
      </CardContent>
    </Card>

    </div>
  )
}

export default Blog