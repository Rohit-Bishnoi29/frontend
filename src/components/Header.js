import React from 'react'
import { AppBar, Toolbar, Typography,Box,Button,Tabs,Tab} from '@mui/material'
import { useState } from 'react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { authAction } from '../store';


var styles = {
   fontSize:"30px",
   color:"#FFFFFF"
  };





const Header = () => {
  
 //const classes = useStyles();
  const dispath = useDispatch();
    const [value, setValue] = useState()
  const isLoggedIn = useSelector((state)=>state.isLoggedIn); 
 
  return (
   
<div>

   <AppBar
   variant="outlined"
   sx={{
    background:" radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
    ,innerWidth:"100"
   }}
   >
    <Toolbar>
        
        <Tab style={styles} LinkComponent={Link} to="/" label="BlogsApp" />
       { isLoggedIn && <Box display="flex" marginLeft={"auto"} marginRight="auto" >
        <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
        <Tab  LinkComponent={Link} to="/blogs/add" label="Add Blog" />
        </Tabs>

        </Box>
       }
        <Box display="flex" marginLeft="auto">
       { !isLoggedIn && <> <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Login</Button>
        <Button LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Signup</Button> </> }
        { isLoggedIn && <Button 
      onClick={()=>dispath(authAction.logout())}
        LinkComponent={Link} to="/auth" variant="contained" sx={{margin:1, borderRadius:10}} color="warning">Logout</Button>}
       
        </Box>
    </Toolbar>
   </AppBar>
   <div style={{marginTop: 80}}></div>
   
  </div>
  )
}

export default Header;