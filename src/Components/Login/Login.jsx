import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'



export default function Login({saveUserToken}) {
  const [userData, setuserData] = useState({
    email:"",
    password:""
  })
  const [loading, setloading] = useState(false)
  const [loginErorr, setloginErorr] = useState("")

let navigate = useNavigate()


  function getUserData(e) {

    let userDataCopy = {...userData}

    userDataCopy[e.target.name] = e.target.value

    setuserData(userDataCopy)
    
  }

async function sendLoginToApi()  {

  let {data} = await axios.post(`https://route-movies-api.vercel.app/signin` , userData)

if (data.message === "success") {
  localStorage.setItem("userToken",data.token )
  saveUserToken()
  setloading(false)

  navigate("/")
  
}
else{

setloginErorr(data.message)
setloading(false)

}
  }

  function submitLogin(e) {
    setloading(true)
    e.preventDefault()
    sendLoginToApi()    
    
  }




  return (
    <>
                    <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="../../../public/tab logo.jpg" />
            </Helmet>


    <div className='login- py-4 w-50 mx-auto'>
    <div>    <h4 className='text-center'>Login</h4>
</div>
    <form onSubmit={submitLogin}>
    <div className='form-group'>
    <label className='py-2' htmlFor="email"> Email :</label>
    <input onChange={getUserData} type="text" className='form-control my-2 ' name='email' placeholder='Email'/>

    <label className='py-2' htmlFor="password"> Password :</label>
    <input onChange={getUserData} type="password" className='form-control my-2 ' name='password' placeholder='Password'/>

<div className=' my-3 text-end'>
{loading === true?<button className='d-block btn btn-info ms-auto'>  <i className="fa fa-spinner fa-spin"></i> </button> :<button className='btn btn-info ms-auto'> login </button>
 }

{loginErorr.length > 0 ? <div className='alert alert-danger my-2' ><p className='mx-auto text-center fw-semibold'>{loginErorr}</p> </div>:""}


</div>

    </div>    
  </form> 

   </div>
    
    </>
  )
}
