import React, { useState } from "react";
import { FormGroup, Input, Button, Row,Col} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../helpers";
const initialUser={password:"",identifier:""}; 


const Login = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState(initialUser);
    const handleChange=({target})=>{
        const {name,value}=target
      setUser((currentUser)=>({
        ...currentUser,[name]:value,
      }));
    }
    const handleLogin=async()=>{
        const url='http://localhost:1337/api/auth/local'
 try{
  if(user.identifier&&user.password){
    const {data}= await axios.post(url,user);
    if(data.jwt){
        storeUser(data);
        toast.success('Logged in successfully')
        setUser(initialUser)
        navigate('/employeetable')
        
    }
    
  }
 }catch(error){
    console.log(error);
  toast.error(error.message,{
    hideProgressBar:true
})
 }
    }
    return <Row className="login">
        <Col sm='12' md={({size:3, offset:4})}>
        <h1>login</h1>
        <FormGroup>
           <Input type="email"
           name="identifier"
           value={user.identifier}
           onChange={handleChange}
           placeholder="Enter Your email"
           />
        </FormGroup>
        <FormGroup>
           <Input type="password"
           name="password"
           value={user.password}
           onChange={handleChange}
           placeholder="Enter Your password"
           />
        </FormGroup>
        <Button color='primary' onClick={handleLogin}>Login</Button>
        <h6>
            Don't you have an account? <Link to="/registration">Sign up </Link>  
        </h6>
        </Col>
    </Row>
}
export default Login;