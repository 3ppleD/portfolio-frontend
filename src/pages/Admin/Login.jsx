import React from 'react';
import { message, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('https://dan-portfolio-backend.onrender.com/api/user/login', values);
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem('token', JSON.stringify(response.data.token)); 
        window.location.href = '/admin';
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className='w-96 p-5 shadow border border-gray-500 bg-white'>
        <h1 className='text-2xl mb-4'>Portfolio - Admin Login</h1>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;