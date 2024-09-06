import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function AdminIntro() {
  const [data, setData] = useState(null);
  const [form] = Form.useForm();

  const getData = async () => {
    try {
      const res = await axios.get("https://dan-portfolio-backend.onrender.com/api/portfolio/intros");
      console.log("Response data:", res.data);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setData(res.data[0]);  // Assume we're only dealing with the first intro
        form.setFieldsValue(res.data[0]);  // Set form values
      } else {
        console.warn("Received empty or non-array data:", res.data);
        message.warning("No intro data available");
      }
    } catch (error) {
      console.error("Error fetching intro data:", error);
      message.error(`Failed to fetch intro data: ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    try {
      const res = await axios.put("https://dan-portfolio-backend.onrender.com/api/portfolio/intros/", values);
      console.log("Update response:", res.data);
      message.success("Intro updated successfully");
      getData(); // Refresh the data after update
    } catch (error) {
      console.error("Update error:", error);
      message.error(`Failed to update intro: ${error.message}`);
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout='vertical' initialValues={data}>
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
    </div>
  );
}

export default AdminIntro;