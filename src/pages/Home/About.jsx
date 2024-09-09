import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import axios from "axios";

const API_BASE_URL = "https://dan-portfolio-backend.onrender.com/api/portfolio";

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

apiService.interceptors.request.use((config) => {
  const cacheBuster = new Date().getTime();
  config.params = { ...config.params, _cb: cacheBuster };
  return config;
});

function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/abouts");
      console.log("res", res.data);
      setData(Array.isArray(res.data) ? res.data : [res.data]);
      setError(null);
    } catch (error) {
      console.error("Error fetching about data:", error);
      setError("Failed to fetch about data. Please try again later.");
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SectionTitle title="About" />
      {data.map((props, index) => (
        <React.Fragment key={index}>
          <div className="flex w-full items-center sm:flex-col">
            <div className="w-1/2 sm:w-full">
              <img 
                className="h-[400px]"
                src={props.lottieURL}
                alt="About illustration"
              />
            </div>
            <div className="flex flex-col leading-relaxed gap-5 w-1/2 sm:w-full">
              <p className="text-white">{props.description1}</p>
              <p className="text-white">{props.description2}</p>
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