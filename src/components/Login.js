import React,{useState} from 'react'
import './mix.css';
import { NavLink,useNavigate } from 'react-router-dom';

// initial user object 
const userData={
    email:"",
    password:"",
}

function Login() {
    // for toggling this use state is used 
  const [Showpass,setShowpass]=useState(false)

  // userData object created using use state
  const [regInput,setReginput]=useState(userData)

  const navigate=useNavigate();


  // setVal function  to set value to userData useState 
    const setVal=(e)=>{
      const {name,value}=e.target

      setReginput(()=>{
        return{
            ...regInput,
            [name]:value
        }
      })
    }

    // loginUser function
    const loginUser=async(e)=>{
        e.preventDefault();
        const {email,password}=regInput
        
    if(email===""){
        alert("please enter your email")
    }else if(!email.includes("@")){
        alert("enter valid email")
    }else if(password===""){
        alert("enter your password")
    }else if(password.length<6){
        alert("password must be 6 character")
    }else{
        // console.log("user login successfully")

        // api calling using fetch
        const data=await fetch("http://localhost:8000/login",{
            method:"POST",
            headers:{
            "Content-Type":"application/json"
        },
        // body of login info
        body:JSON.stringify({
           email,password
        })
        
        })
        const res=await data.json();
        if(res.status===201){
            localStorage.setItem("usersdatatoken",res.result.token)
            navigate("/profile")
            setReginput({...regInput,email:"",password:""})
        }
    }
    }

  return (
    <>
    <section>
        <div className='form_data'>
            <div className='form_heading'>
                <h1>Welcome back, Log In</h1>
                <p>Hi, we are glad you are back. Please login</p>
            </div>

            <form>
                
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
                        <input type={!Showpass ? "password":"text"} name="password" 
                        onChange={setVal}
                        value={regInput.password}
                        id="password" placeholder="Enter you password"  />
                        <div className='showpass' onClick={()=>setShowpass(!Showpass)}>
                            {!Showpass ? "Show" : "Hide"}
                        </div>
                    </div>
                    
                </div>
                <button className='btn' onClick={loginUser} >Login</button>
                <p>Don't have an account? <NavLink to="/register">Sign up</NavLink>  </p>
            </form>
        </div>
    </section>
    </>
  )
}

export default Login