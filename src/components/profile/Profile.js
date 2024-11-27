import React from "react";
import NavBar from "../navbar/Navbar";
import EditProfileSection from "./editProfileSection/EditProfileSection";
import ProfileBlogSection from "./blogSection/BlogSection";

const Profile = () => {

  return (
    <React.Fragment>
      <NavBar />

      <EditProfileSection />
      <ProfileBlogSection />
    </React.Fragment>
  );
};

export default Profile;
