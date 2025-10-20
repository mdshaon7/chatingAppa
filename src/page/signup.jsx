import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth,sendEmailVerification,updateProfile   } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router';


const    signup = () => {
  const nevigete = useNavigate()
  let auth = getAuth()
  let [info, setinfo] =useState({

    name :"",
    email: "",
    password: ""
  });
let [errors, setErrors]= useState({
  name:"",
  email:"",
  password:""
})



  let handlename=(e)=>{
    setErrors('')
   setinfo((prev)=> ({
    ...prev,  name: e.target.value
    }))
  }

    let hendleEmail=(e)=>{
      setErrors('')
      setinfo((prev)=> ({
    ...prev,  email: e.target.value
    }))
  }
    let hendlePassword=(e)=>{
      setErrors('')
     setinfo((prev)=> ({
    ...prev,  password: e.target.value
    }))
  }
  let hendlesingup=()=>{
    if(!info.name){
      setErrors((prev)=>({
        ...prev , name:"name is required"
      }   
      ))
    }
    if(!info.email){
      setErrors((prev)=>({
        ...prev , email:"emali is required"
      } 
         
      ))
    }
    const auth = getAuth();
createUserWithEmailAndPassword(auth, info.email, info.password)
  . then((userCredential) => {
console.log(userCredential)
sendEmailVerification(auth.currentUser)
  .then(() => {

    const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: info.name, photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
nevigete('/signin')
}).catch((error) => {
  // An error occurred
  // ...
});
   toast.success(' Email send Successfully ')
  });
  

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
      setErrors((prev)=>({
        ...prev , name :errorMessage
      } ))
  });
  if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info.emali))){
     
     }else{
      setErrors((prev)=>({
        ...prev , email:"email is required"
      }    
      ))
     }

       if(!info.password){
      setErrors((prev)=>({
        ...prev , password:"password is required"
      })
    )}
  }

  return (
    <>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Signup Page</title>
  <div className=" bg-cyan-200 shadow-md rounded-lg p-8 w-full max-w-sm m- m-auto mt-[50px]">
    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
      Sign Up
    </h2>
    <form className=''>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2   font-bold" htmlFor="name">
          Name
        </label>
        <input onChange={handlename}
          type="text"
          id="name"
          placeholder="Enter your name"
          className={`w-full px-4 py-2 border ${errors.name ?"border-red-500" : "border-gray-300" } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 `}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2 font-bold" htmlFor="email ">
          Email
        </label>
        <input onChange={hendleEmail}
          type="email"
          id="email"
          placeholder="Enter your email"
          className= {`w-full px-4 py-2 border ${errors.emali ? " border-red-500" :"border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-bold" htmlFor="password">
          Password
        </label>
        <input onChange={hendlePassword}
          type="password"
          id="password"
          placeholder="Enter your password"
          className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      </div>
      <button
      onClick={hendlesingup}
      
        type="button"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>
    </form>
    
  </div>
</>

  
  )
}

export default signup
