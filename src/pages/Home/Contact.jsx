import React, { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";

function Contact() {
 const [data, setData] = useState ([])

 const getData = async()=>{
   
   try {
    const res =  await axios.get("https://dan-portfolio-backend.onrender.com/api/portfolio/get-contacts", { headers: { 'Cache-Control': 'no-cache' } });
       console.log("res",res.data[0])
       setData(res.data)
 } catch (error){
  console.error(error)
  }
 }

 useEffect(()=>{
 getData() 
 }, [])

 console.log("my data", data)
 const fieldOrder = ['name', 'email', 'age', 'gender', 'mobile', 'address'];
  return (
    <div>
      <SectionTitle title="Say Hello!" />
{
  data?.map((contact)=>(

    <div className="flex sm:flex-col items-center justify-between">
    <div className="flex flex-col gap-1 sm:flex-wrap  sm:w-full">
    <p className="text-tertiary">{"{"}</p>
          {fieldOrder.map((field) => (
          contact[field] && <p className="ml-5">
              <span className="text-tertiary">{field} : </span>
              <span className="text-tertiary">{contact[field]}</span>
            </p>
          ))}
          <p className="text-tertiary">{"}"}</p>
    </div>
    <div className="h-[400px] sm:w-full">
      <dotlottie-player 
        src="https://lottie.host/db7bc74c-e536-4c2c-93ae-1b7019411e33/I69CXjYxG2.json"
        background="transparent"
        speed="1"
        autoplay
      ></dotlottie-player>
    </div>
  </div> 
  
  ))
}
    </div>
  );
}

export default Contact;
