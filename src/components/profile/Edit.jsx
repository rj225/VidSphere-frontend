import React, { useState } from "react";
import axios from "axios";

function Edit() {
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("coverImage", coverImage);

      // Make a PATCH request to the backend endpoint
      const response = await axios.patch("/api/v1/user/cover-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any additional headers if needed, such as authorization token
        },
      });

      console.log("Response:", response.data);
      // Handle success, display a success message, etc.
    } catch (error) {
      console.error("Error updating cover image:", error.response.data);
      // Handle error, display an error message, etc.
    }
  };

  return (
    <div>
      <h2>Update Cover Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="coverImage">Choose Cover Image:</label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload Cover Image</button>
      </form>
    </div>
  );
}

export default Edit;
