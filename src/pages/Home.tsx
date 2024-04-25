import React, { useEffect } from 'react'
import API from '../API'

function Home() {

    useEffect(()=>{
        API.get("/movie").then((resp)=>{
            console.log(resp, "resp");
            
        }).catch((error) =>{
            console.log(error);
        })
    }, [])

  return (
    <div>Home</div>
  )
}

export default Home