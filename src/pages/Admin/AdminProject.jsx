import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Modal, Upload,Popconfirm } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";

function AdminProject() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [file, setFile] = useState(null);

  const onDelete = async (item) => {
    if (!item.id) {
        console.error("Project ID is undefined");
        message.error("Project ID is undefined, cannot delete project.");
        return;
    }

    try {
        const res = await axios.delete(
            `http://127.0.0.1:5000/api/portfolio/delete-projects/${item.id}`
        );
        if (res.status === 200) {
            message.success("Project deleted successfully");
            getData();
        } else {
            message.error("Failed to delete project");
        }
    } catch (error) {
        console.error("Delete error:", error);
        message.error("Failed to delete project");
    }
};



  const getData = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:5000/api/portfolio/get-project"
      );
      setData(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("Fetch error:", error);
      message.error("Failed to fetch project data");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description1", values.description1);
      formData.append("description2", values.description2);

      if (file) {
        formData.append("img_url", file);
      }

      let res;
      if (selectedItemForEdit) {
        res = await axios.put(
          `http://127.0.0.1:5000/api/portfolio/update-projects/${selectedItemForEdit.id}`,
          formData
        );
        message.success("Project updated successfully");
      } else {
        res = await axios.post(
          "http://127.0.0.1:5000/api/portfolio/add-projects",
          formData
        );
        message.success("Project added successfully");
      }

      setShowAddEditModal(false);
      form.resetFields();
      setFile(null);
      getData();
    } catch (error) {
      console.error("Submit error:", error);
      message.error(
        `Failed to ${selectedItemForEdit ? "update" : "add"} project: ${
          error.response ? error.response.data.error : error.message
        }`
      );
    }
  };

  const handleUpload = ({ file }) => {
    setFile(file);
  };

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5 sm:grid-cols-1">
        {data.map((project, index) => (
          <div key={index} className="border p-4 rounded shadow flex flex-col">
            <img
              src={project.img_url}
              alt=""
              className="h-64 w-full object-cover"
            />
            <h1 className="font-bold text-secondary mt-5">
              Title: {project.title}
            </h1>
            <h3 className="text-md text-primary">{project.description1}</h3>
            <p className="mt-2">{project.description2}</p>
            <div className="flex justify-end gap-5 mt-5">
            <Popconfirm
                placement="top"
                title="Are you sure you want to delete this project?"
                onConfirm={() => onDelete(project)}
                onCancel={() => message.error("Cancelled")}
                okText="Yes"
                cancelText="No"
              >
                <Button className="bg-red-500 text-white px-10 py-2">
                  Delete
                </Button>
              </Popconfirm>

              <Button
                className="bg-primary text-white px-10 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            name="description1"
            label="First Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="First Description"autoSize={{ minRows: 4, maxRows: 6 }} />
          </Form.Item>
          <Form.Item
            name="description2"
            label="Second Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Second Description"autoSize={{ minRows: 4, maxRows: 6 }} />
          </Form.Item>
          <Form.Item label="Project Image">
            <Upload beforeUpload={() => false} onChange={handleUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-end">
            <Button
              className="border-primary text-primary px-10 py-2 mr-2"
              onClick={() => {
                setShowAddEditModal(false);
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="bg-primary text-white px-10 py-2"
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProject;
