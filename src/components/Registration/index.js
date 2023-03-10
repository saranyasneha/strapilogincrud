import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormGroup, Input, Button, Row,Col} from "reactstrap";
import { useNavigate,Link } from "react-router-dom";

const initialUser={email:'',password:'',username:''}

const Registration=()=>{
    const [user,setUser]=useState(initialUser)
    const navigate=useNavigate()
    
    const signUp=async()=>{

    const url='http://localhost:1337/api/auth/local/register'
    try{
    if(user.username&&user.email&&user.password){
    const res=await axios.post(url,user)
    if(res){
        setUser(initialUser)
        navigate('/')
    }
    console.log(res);
}
    }catch(error){
        toast.error(error.message,{
            hideProgressBar:true
        })
    }
}
const handleUserChange=({target})=>{
    const {name,value}=target;
    setUser((currentUser)=>({
     ...currentUser,[name]:value,
    }))
}
    return <Row className="signup">
        <Col sm='12' md={({size:3, offset:4})}>
        <h1>Sign up</h1>
        <div>
        <FormGroup>
           <Input type="text"
           name="username"
           value={user.identifier}
           onChange={handleUserChange}
           placeholder="Enter Your Full Name"
           />
        </FormGroup>
        <FormGroup>
           <Input type="email"
           name="email"
           value={user.email}
           onChange={handleUserChange}
           placeholder="Enter Your Email"
           />
        </FormGroup>
        <FormGroup>
           <Input type="password"
           name="password"
           value={user.password}
           onChange={handleUserChange}
           placeholder="Enter Your password"
           />
        </FormGroup>
        <Button color="primary" onClick={signUp}>Sign Up</Button>
        <h6>
           Already have an account? <Link to="/">Login </Link>  
        </h6>
        </div></Col>
        
    </Row>
}

export default Registration;