import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Modal, Popconfirm } from "antd";
import axios from "axios";

// ExperienceModal Component
const ExperienceModal = ({ visible, onCancel, onFinish, form, initialValues, title }) => {
  return (
    <Modal
      open={visible}
      title={title}
      footer={null}
      onCancel={onCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <Form.Item
          name="period"
          label="Period"
          rules={[{ required: true, message: "Please input the period!" }]}
        >
          <Input placeholder="Period" />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item
          name="company"
          label="Company"
          rules={[{ required: true, message: "Please input the company!" }]}
        >
          <Input placeholder="Company" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input the description!" },
          ]}
        >
          <Input.TextArea placeholder="Description" autoSize={{ minRows: 4, maxRows: 6 }} />
        </Form.Item>
        <div className="flex justify-end">
          <Button
            className="border-primary text-primary px-10 py-2 mr-2"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="bg-primary text-white px-10 py-2"
          >
            {initialValues ? "Update" : "Add"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// Main ExperienceAdmin Component
function ExperienceAdmin() {
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://dan-portfolio-backend.onrender.com/api/portfolio/get-experience"
      );
      console.log("Response data:", res.data);
      setData(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (error) {
      console.error("Error fetching experience data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      message.error(`Failed to fetch experience data: ${error.message}`);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onDelete = async (item) => {
    try {
      await axios.delete(
        `https://dan-portfolio-backend.onrender.com/api/portfolio/del-experience/${item.id}`
      );
      message.success("Experience deleted successfully");
      getData();
    } catch (error) {
      console.error("Delete error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        message.error(
          `Failed to delete experience: ${error.response.data.error}`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        message.error("Failed to delete experience: No response received");
      } else {
        console.error("Error setting up request:", error.message);
        message.error(`Failed to delete experience: ${error.message}`);
      }
    }
  };

  const addExperience = async (values) => {
    try {
      const res = await axios.post(
        "https://dan-portfolio-backend.onrender.com/api/portfolio/add-experience",
        values
      );
      message.success("Experience added successfully");
      return res;
    } catch (error) {
      throw error;
    }
  };

  const updateExperience = async (id, values) => {
    try {
      const res = await axios.put(
        `https://dan-portfolio-backend.onrender.com/api/portfolio/update-experience/${id}`,
        values
      );
      message.success("Experience updated successfully");
      return res;
    } catch (error) {
      throw error;
    }
  };

  const onFinish = async (values) => {
    try {
      if (selectedItemForEdit) {
        await updateExperience(selectedItemForEdit.id, values);
      } else {
        await addExperience(values);
      }
      setShowAddEditModal(false);
      form.resetFields();
      getData();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      message.error(
        `Failed to ${selectedItemForEdit ? "update" : "add"} experience: ${
          error.response ? error.response.data.error : error.message
        }`
      );
    }
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
          Add Experience
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-5 sm:grid-cols-1">
        {data.map((experience, index) => (
          <div key={index} className="border p-4 rounded shadow flex flex-col">
            <h1 className="font-bold text-secondary">
              Period : {experience.period}
            </h1>
            <h2 className="text-lg text-tertiary">Role : {experience.title}</h2>
            <h3 className="text-md text-primary">
              Company : {experience.company}
            </h3>
            <p className="mt-2">{experience.description}</p>
            <div className="flex justify-end gap-5 mt-5">
              <Popconfirm
                placement="top"
                title="Are you sure you want to delete this experience?"
                onConfirm={() => onDelete(experience)}
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
                  setSelectedItemForEdit(experience);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ExperienceModal
        visible={showAddEditModal}
        onCancel={() => {
          setShowAddEditModal(false);
          form.resetFields();
        }}
        onFinish={onFinish}
        form={form}
        initialValues={selectedItemForEdit}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
      />
    </div>
  );
}

export default ExperienceAdmin;