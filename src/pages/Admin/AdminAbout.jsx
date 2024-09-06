const onFinish = async (values) => {
  try {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'lottieURL') {
        if (values[key] && values[key].file) {
          formData.append('file', values[key].file.originFileObj);
        } else if (imageUrl) {
          // If imageUrl exists but no new file was uploaded, send the existing URL
          formData.append(key, imageUrl);
        }
      } else {
        formData.append(key, values[key]);
      }
    });

    const res = await axios.put("https://dan-portfolio-backend.onrender.com/api/portfolio/abouts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Update response:", res.data);
    message.success("About updated successfully");
    getData(); // Refresh the data after update
  } catch (error) {
    console.error("Update error:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    }
    message.error(`Failed to update about: ${error.message}`);
  }
};