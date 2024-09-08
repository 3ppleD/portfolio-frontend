import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function AdminIntro() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const getData = async () => {
    try {
      const res = await axios.get("https://dan-portfolio-backend.onrender.com/api/portfolio/intros");
      console.log("res", res.data[0]);
      setData(res.data);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch intro data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("my data", data);

  const onFinish = async (values) => {
    try {
      const res = await axios.put("https://dan-portfolio-backend.onrender.com/api/portfolio/intros/", values);
      console.log("Update response:", res.data);
      message.success("Intro updated successfully");
      getData(); // Refresh the data after update
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error.message);
      message.error(`Failed to update intro: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div>
      {data.map((intro, index) => (
        <Form key={index} form={form} onFinish={onFinish} layout='vertical' initialValues={intro}>
          <Form.Item name='welcomeText' label='Welcome Text'>
            <Input placeholder='Welcome Text' />
          </Form.Item>
          <Form.Item name='firstName' label='First Name'>
            <Input placeholder='FirstName' />
          </Form.Item>
          <Form.Item name='lastName' label='Last Name'>
            <Input placeholder='LastName' />
          </Form.Item>
          <Form.Item name='caption' label='Caption'>
            <Input placeholder='Caption' />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <Input.TextArea placeholder='Description' />
          </Form.Item>
          <Form.Item className='flex justify-end'>
            <Button type="primary" htmlType="submit" className="px-10 py-2 bg-primary text-white">
              Save
            </Button>
          </Form.Item>
        </Form>
      ))}
    </div>
  );
}

export default AdminIntro;