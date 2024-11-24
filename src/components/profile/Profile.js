import React from "react";
import NavBar from "../navbar/Navbar";
import EditProfileSection from "./editProfileSection/EditProfileSection";

const Profile = () => {

  return (
    <React.Fragment>
      <NavBar />

      <EditProfileSection />
    </React.Fragment>
  );
};

export default Profile;
