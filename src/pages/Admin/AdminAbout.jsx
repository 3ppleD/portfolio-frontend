import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";


const { TextArea } = Input;

function AdminAbout() {
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  const getData = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await axios.get(`https://backend-mongodb-63yq.onrender.com/api/portfolio/get-abouts?t=${timestamp}`);
      console.log("res", res.data[0]);
      setData(res.data[0]);
      if (res.data[0] && res.data[0].lottieURL) {
        setImageUrl(`${res.data[0].lottieURL}?t=${timestamp}`);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch about data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'lottieURL' && values[key] && values[key].file) {
          formData.append('file', values[key].file.originFileObj);
        } else {
          formData.append(key, values[key]);
        }
      });

      const timestamp = new Date().getTime();
      const res = await axios.put(`https://backend-mongodb-63yq.onrender.com/api/portfolio/update-intros?t=${timestamp}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Update response:", res.data);
      message.success("About updated successfully");
      getData(); // Refresh the data after update
    } catch (error) {
      console.error("Update error:", error);
      message.error(`Failed to update about: ${error.message}`);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
      });
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  if (!data) return <div>Loading...</div>;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item name="lottieURL" label="About Image">
        <Upload 
          beforeUpload={() => false}
          onChange={handleImageChange}
          showUploadList={false}
        >
          {imageUrl ? (
            <div>
              <Image src={imageUrl} alt="about" style={{ width: '300px', height: '10%' }}/>
              <Button icon={<UploadOutlined />}>Change Image</Button>
            </div>
          ) : (
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          )}
        </Upload>
      </Form.Item>
      <Form.Item name="description1" label="First Description">
        <TextArea placeholder="First Description" autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>
      <Form.Item name="description2" label="Second Description">
        <TextArea placeholder="Second Description" autoSize={{ minRows: 4, maxRows: 6 }}/>
      </Form.Item>
      <Form.Item name="skills" label="Skills Set">
        <TextArea placeholder="Skills Set (comma-separated)" autoSize={{ minRows: 4, maxRows: 6 }} />
      </Form.Item>
      <Form.Item className="flex justify-end">
        <Button
          type="primary"
          htmlType="submit"
          className="px-10 py-2 bg-primary text-white"
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminAbout;