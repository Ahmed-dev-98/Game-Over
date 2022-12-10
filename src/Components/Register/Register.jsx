import React, { useState } from 'react'
import axios from "axios" 
import {useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Joi from 'joi'


export default function Register() {
  const [userData, setuserData] = useState({
    first_name:"",
    last_name : "",
    email : "",
    password : "",
    age : ""
    })
  const [registerErorr, setRegisterErorr] = useState([])
  const [loading, setloading] = useState(false)
  const [validateErorrs, setvalidateErorrs] = useState([])


let navigate = useNavigate()


  function getUserData(e) {

    let userDataCopy = {...userData}

    userDataCopy[e.target.name] = e.target.value

    setuserData(userDataCopy)
    
  }

async function sendRegisterData()  {

  let {data} = await axios.post(`https://route-movies-api.vercel.app/signup`, userData)

if (data.message === "success") {
  navigate("/login")
  setloading(false)
  
}
else{
  
  setRegisterErorr(data.message)
  setloading(false)
  
}
}


function formValidation() {

  let scheme = Joi.object({
    first_name : Joi.string().min(3).max(10).required(),
    last_name : Joi.string().min(3).max(10).required(),
    age : Joi.number().min(16).max(70).required(),
    email : Joi.string().email( { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password : Joi.string().pattern(/^[A-Z][a-z]{3,6}/)
  })
   return scheme.validate(userData , {abortEarly:false})
}


function submitLogin(e) {
    setloading(true)
    e.preventDefault()
    sendRegisterData()    
    formValidation()
    let formValidationRes = formValidation()

    if (formValidationRes.error.length > 0 ) {
      setloading(false)
      setvalidateErorrs(formValidationRes.error.details)


    }
    else
    {
      sendRegisterData()

    }

    
  }








  return (
    <>
                    <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="../../../public/tab logo.jpg" />
            </Helmet>

    <div className='py-4 w-50 mx-auto'>
    <h4 className='text-center'>Registeration Form</h4>
    <form onSubmit={submitLogin}>
    <div className='form-group'>
    <label className='py-2' htmlFor="first_name"> First Name :</label>
    <input onChange={getUserData}  type="text" className='form-control my-2 ' name='first_name' placeholder='First Name'/>
    
    <label className='py-2' htmlFor="last_name"> Last Name :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 ' name='last_name' placeholder='Last Name'/>

    <label className='py-2' htmlFor="email"> Email :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 ' name='email' placeholder='Email'/>

    <label className='py-2' htmlFor="password"> Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 ' name='password' placeholder='Password'/>

    <label className='py-2' htmlFor="age"> Age :</label>
    <input onChange={getUserData} type="number" className='form-control my-2 ' name='age' placeholder='Age'/>
<div className=' my-3 text-end'>
{loading === true?<button className='d-block btn btn-info ms-auto'>  <i className="fa fa-spinner fa-spin"></i> </button> :<button className='btn btn-info ms-auto'> submit </button>}

{registerErorr.length > 0 ? <div className='alert alert-danger my-2 ' ><p className='mx-auto text-center fw-semibold'>{registerErorr}</p> </div>:""}
{validateErorrs.map((err,index)=>{
          if (err.context.label === "password") {
           return <div key={index} className='alert alert-danger my-2' ><p> password should start with capital letter follwed by 3~6 letters </p></div>
          } 
          else {
            return <div key={index} className='alert alert-danger my-2' >{err.message} </div>
          }
        } )}




</div>

    </div>    
  </form> 

   </div>

    </>
  )
}
