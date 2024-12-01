import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile(props) {
  const host = "http://localhost:5000";
  const [userData, setUserData] = useState(null); // State for user data
  const [error, setError] = useState(""); // State for error messages

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await fetch(`${host}/api/auth/profile`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"), // Use a dynamic token in production
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data.user); // Update state with the `user` object
      } catch (error) {
        console.error("Failed to show profile data:", error);
        setError("Could not load profile. Please try again.");
      }
    };

    userProfile();
  }, []);

  const { mode } = props;

  return (
    <>
      <div
        className={`container ${mode === "light" ? "card-body-light" : "card-body-dark"
          }`}
      >
        {error && <p className="text-danger">{error}</p>} {/* Error message */}
        {userData ? (
          <div className="text-center">
            {/* Display profile image */}
            <img
              src={
                userData.profileImage && userData.profileImage !== "/profileImage.png"
                  ? `${host}${userData.profileImage}`
                  : "http://localhost:3000/profileImage.png" // Absolute path for the fallback
              }
              alt="Profile"
              className="rounded-circle"
              width="150"
              height="150"
            />


            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>

            <Link className="btn btn-outline-success" to="/updateprofile" role="button">
              Update profile <i className="fa-regular fa-pen-to-square my-2"></i>
            </Link>
          </div>


        ) : (
          !error && <p>Loading profile...</p> // Show a loader until the data is fetched
        )}
      </div>
    </>
  );
}

export default Profile;
