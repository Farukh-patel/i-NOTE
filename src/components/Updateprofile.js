import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
function UpdateProfile(props) {
  const navigate = useNavigate(); // Initialize navigate hook
  
  const { mode } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Updated Profile:", formData);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/updateprofile", {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("token"), // Add auth token if required
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      navigate("/profile"); // Redirect to profile page
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };


return (
  <div className="update-profile-page">
    <h1 className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>Update Profile</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="profileImage" className={`form-label ${mode === "light" ? "light-mode" : "dark-mode"}`}>Profile Image</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          className={`form-control ${mode === "light" ? "form-control-input-light" : "form-control-input-dark"} `}
          onChange={handleChange}
        />
      </div>

      <button type="submit"  className="btn btn-success">Save Changes</button>
    </form>
  </div>
);
};
export default UpdateProfile;
