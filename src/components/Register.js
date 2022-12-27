import React,{useState} from 'react';
import './mix.css';
import {NavLink} from 'react-router-dom';
// import axios from 'axios';

const userData={
    uname:"",
    email:"",
    password:"",
    cpassword:""
}

function Register() {

    // toggling use state
    const [Showpass,setShowpass]=useState(false)
    const [CShowpass,setCShowpass]=useState(false)
    
    // userObejct use state
    const [regInput,setReginput]=useState(userData)
    
    // setVal function  
    const setVal=(e)=>{
      const {name,value}=e.target

      setReginput(()=>{
        return{
            ...regInput,
            [name]:value
        }
      })
    }

    // addUserdetails function
    const addUserData=async(e)=>{
    e.preventDefault()

    const {uname,email,password,cpassword}=regInput;

    if(uname===""){
     alert("please enter your username")
    }else if(email===""){
        alert("please enter your email")
    }else if(!email.includes("@")){
        alert("enter valid email")
    }else if(password===""){
        alert("enter your password")
    }else if(password.length<6){
        alert("password must be 6 character")
    }else if(cpassword===""){
        alert("enter your password")
    }
    else if(cpassword.length<6){
        alert("confirm password must be 6 character")
    }else if(password!==cpassword){
        alert("password and confirm passowrd not match")
    }else{
        // console.log("user registration successfully done")
        const data=await fetch("http://localhost:8000/register",{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            uname,email,password,cpassword
        })
        
        })
        const res=await data.json();
        console.log(res.status)
        if(res.status===201){
            alert("user registration done")
            setReginput({...regInput,uname:"",email:"",password:"",cpassword:""})
        }
    }
    

    }

  return (
    <>
       <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1>Sign Up</h1>
                <p style={{textAlign:"center"}}>Hi, welcome to kimshuka technology</p>
            </div>

            <form>
                <div className='form_input'>
                    <label htmlFor='uname'>Username</label>
                    <input type="text" onChange={setVal}
                     value={regInput.uname}
                     name="uname" id="uname" placeholder="Enter you username"  />
                </div>
                <div className='form_input'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" 
                    onChange={setVal} 
                    value={regInput.email}
                    name="email" id="email" placeholder="Enter you email"  />
                </div>
                <div className='form_input'>
                    <label htmlFor='password'>Password</label>

                    <div className='two'>
                        <input type={!Showpass ? "password":"text"} 
                        onChange={setVal}
                        value={regInput.password}
                        name="password" id="password" placeholder="Enter you password"  />
                        <div className='showpass' onClick={()=>setShowpass(!Showpass)}>
                            {!Showpass ? "Show" : "Hide"}
                        </div>
                    </div>
                    
                </div>

                 <div className='form_input'>
                    <label htmlFor='cpassword'>Confirm Password</label>

                    <div className='two'>
                        <input type={!CShowpass ? "password":"text"} 
                        onChange={setVal}
                        value={regInput.cpassword}
                        name="cpassword" id="cpassword" placeholder="Confirm password"  />
                        <div className='showpass' onClick={()=>setCShowpass(!CShowpass)}>
                            {!CShowpass ? "Show" : "Hide"}
                        </div>
                    </div>
                    
                </div>
                <button className='btn' onClick={addUserData} >Sign Up</button>
                <p>Already have an account? <NavLink to="/"> Login up</NavLink> </p>
            </form>
        </div>
    </section>
    </>
  )
}

export default Register