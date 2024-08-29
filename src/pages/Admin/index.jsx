import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Tabs } from "antd";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import ExperienceAdmin from "./ExperienceAdmin";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
const { TabPane } = Tabs;

function Admin() {
  const handleTabChange = (key) => {
    console.log(key);
    // Handle tab change logic here
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="flex gap-10 items-center py-2 px-5 justify-between">
        <div className="flex gap-10 items-center">
          <h1 className="text-3xl  text-primary sm:text-2xl">
            Portfolio Admin
          </h1>
          <div className="w-60 h-[1px] bg-gray-500"></div>
        </div>
        <h1 className="text-red-700  text-2xl cursor-pointer" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/admin-login";
        }}>Logout</h1>
      </div>
      <div className="mt-5 p-5">
        <Tabs defaultActiveKey="1" onChange={handleTabChange}>
          <TabPane tab="Intro" key="1">
            <AdminIntro />
          </TabPane>
          <TabPane tab="About" key="2">
            <AdminAbout />
          </TabPane>
          <TabPane tab="Experirnce" key="3">
            <ExperienceAdmin />
          </TabPane>
          <TabPane tab="Projects" key="4">
            <AdminProject />
          </TabPane>
          <TabPane tab="Contact" key="5">
            <AdminContact />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Admin;
