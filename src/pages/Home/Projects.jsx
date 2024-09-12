import React, {useState, useEffect} from "react";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle";





function Projects() {
  const [data, setData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const getData = async () => {
    try {
      const res = await axios.get("https://backend-mongodb-63yq.onrender.com/api/portfolio/get-projects");
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

    // const [selectedItemIndex, setSelectedItemIndex] = React.useState([0]);
    return (
      <div>
        <SectionTitle title="Projects" />
        <div className="flex py-10 gap-20 sm:flex-col">
          <div className="flex flex-wrap gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-wrap sm:overflow-x-scroll sm:w-full">
          {data.map((project, index) => (
            <div key={index} onClick={() => setSelectedItemIndex(index)} className="cursor-pointer">
              <h1 className={`text-xl px-5 ${selectedItemIndex === index ? 'text-tertiary border-tertiary border-l-4 ml-[-3px] bg-[#1a7f5a31] py-3' : 'text-white'}`}>{project.title}</h1>
            </div>
          ))}
          </div>
        {data.length > 0 && (
          <div className="flex gap-10 sm:flex-wrap">
          <img src={data[selectedItemIndex].img_url} alt="project" className="h-60 w-72 sm:w-full" />
          <div className="flex flex-col gap-5">
                  <h1 className="text-secondary text-xl">{data[selectedItemIndex].title}</h1>
                  <p className="text-white leading-relaxed">{data[selectedItemIndex].description1}</p>
                  <p className="text-white leading-relaxed">{data[selectedItemIndex].description2}</p>
                </div>
             </div>
        )}
        </div>
      </div>
    );
  }
  
  export default Projects
