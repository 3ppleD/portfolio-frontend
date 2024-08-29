import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";

function About() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("https://dan-portfolio-backend.onrender.com/api/portfolio/abouts");
      console.log("res", res.data);
      setData(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("my data", data);

  const getSkillsArray = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') return skills.split(',').map(skill => skill.trim());
    return [];
  };

  return (
    <div>
      <SectionTitle title="About" />

      {data.map((props, index) => (
        <React.Fragment key={index}>
          <div className="flex w-full items-center sm:flex-col">
            <div className=" w-1/2 sm:w-full">
              <img className="h-[400px]"
                src={props.lottieURL}
                background="transparent"
                speed="1"
                autoplay
              ></img>
            </div>
            <div className="flex flex-col leading-relaxed gap-5 w-1/2 sm:w-full">
              <p className="text-white">{props.description1}</p>
              <p className="text-white">{props.description2} </p>
            </div>
          </div>
          <div className="py-5">
            <h1 className="text-tertiary text-xl">
              Here are few technologies I've been working with recently:
            </h1>
            <div className="flex flex-wrap gap-10 mt-5">
              {getSkillsArray(props.skills).map((skill, skillIndex) => (
                <div key={skillIndex} className="border border-tertiary py-3 px-10">
                  <h1 className="text-tertiary border-x-tertiary">{skill}</h1>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default About;