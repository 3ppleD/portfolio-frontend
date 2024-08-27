import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

function AdminContact() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const getData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/api/portfolio/get-contacts");
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
      const res = await axios.put("http://127.0.0.1:5000/api/portfolio/update-contacts", values);
      console.log("Update response:", res.data);
      message.success("Contact updated successfully");
      getData(); // Refresh the data after update
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error.message);
      message.error(`Failed to update intro: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  return (
    <div>
      {data.map((contact, index) => (
        <Form key={index} form={form} onFinish={onFinish} layout='vertical' initialValues={contact}>
          <Form.Item name='name' label='Contact Name'>
            <Input placeholder='Contact Name' />
          </Form.Item>
          <Form.Item name='email' label='Contact Email'>
            <Input placeholder='Contact Email' />
          </Form.Item>
          <Form.Item name='age' label='Contact Age'>
            <Input placeholder='Contact Age' />
          </Form.Item>
          <Form.Item name='gender' label='Gender'>
            <Input placeholder='Gender' />
          </Form.Item>
          <Form.Item name='mobile' label='Phone Number'>
            <Input.TextArea placeholder='Phone Number' />
          </Form.Item>
          <Form.Item name='address' label='Contact Address'>
            <Input.TextArea placeholder='Contact Address' />
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

export default AdminContact;