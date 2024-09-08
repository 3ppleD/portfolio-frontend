import React,{useState,useEffect} from "react";
import axios from "axios"

function Intro() {
  const [data,setData] = useState([])

  const getData = async()=>{
    
    try {
     const res =  await axios.get("https://dan-portfolio-backend.onrender.com/api/portfolio/intros", { headers: { 'Cache-Control': 'no-cache' } });
        console.log("res",res.data[0])
        setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  console.log("my data",data)


  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      {
        data?.map((intro)=>(
          <>
          <h1 className="text-white">{intro.welcomeText}</h1>
      <h1 className="text-secondary text-7xl font-semibold sm:text-3xl">
        {intro.firstName} {intro.lastName}
      </h1>
      <h1 className="text-white text-6xl font-semibold sm:text-3xl">
      {intro.caption}
      </h1>
      <p className="text-white w-2/3 leading-relaxed sm:w-full">
      
    {intro.description}  
      </p>
      <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">Get Started</button>
          </>
        ))
      }
    </div>
  );
}

export default Intro;
