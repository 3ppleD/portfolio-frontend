import React, { useState, useEffect } from "react";
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

function Intro() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await apiService.get("/intros");
      console.log("res", res.data[0]);
      setData(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching intro data:", error);
      setError("Failed to fetch intro data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("my data", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-[80vh] bg-primary flex flex-col items-start justify-center gap-8 py-10">
      {data.map((intro, index) => (
        <React.Fragment key={index}>
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
          <button className="border-2 border-tertiary text-tertiary px-10 py-3 rounded">
            Get Started
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Intro;