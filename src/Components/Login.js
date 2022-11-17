import React,{useEffect} from 'react';
import { json, Navigate, useNavigate } from 'react-router-dom';

const Login=()=>{
    const [email,setEmail]=React.useState();
    const [password,setPassword]=React.useState();
    const Navigate=useNavigate();
    useEffect(()=>{
    const auth=localStorage.getItem('user');
    if(auth){
        Navigate('/')
    }
},[])
    const handleLogin=async ()=>{
        console.warn("email,password",email,password);
        let result=await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email,password}),
            headers:{
                'content-type':'application/json'
            }
        });
        result=await result.json();
        console.warn(result)
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user))
            localStorage.setItem("token",JSON.stringify(result.auth))
            Navigate("/")
        }
        else{
            alert("Please Enter Correct Details")
        }
    }
    return(
        <div className="login">
           <input type="text" className="inputbox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
           <input type="password" className="inputbox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value) }value={password}/>
           <button onClick={handleLogin} className="signup-button" type="button">Login</button>
        
        </div>
    )
}
export default Login;