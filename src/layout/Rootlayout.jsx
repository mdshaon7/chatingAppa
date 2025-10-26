import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { auth } from "../firebase.config"
import { useSelector } from 'react-redux'

const rootlayout = () => {
  let nevigete = useNavigate()
   let user = useSelector((state)=>state.userinfo.value.displayName)
  useEffect(() => {
    if(!user){
nevigete('/signin')
    }
    // console.log(auth.currentUser)
  }, [auth.currentUser]);

  return (
    <>

      <Outlet /> 
    </>

 
  )
}

export default rootlayout
