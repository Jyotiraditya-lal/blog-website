import { InputText } from "primereact/inputtext";
import React, { useState, useRef } from "react";
import NavBar from "../navbar/Navbar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import createAblog from "../../assets/createAblog.jpg";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  let blogsString = localStorage.getItem("blogs");
  let blogs = blogsString ? JSON.parse(blogsString) : [];

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [body, setBody] = useState("");
  const toast = useRef(null);

  const navigate = useNavigate();

  const titleHandler = (e) => {
    e.preventDefault();
    const titleValue = e.target.value;
    setTitle(titleValue);
  };

  const bodyHandler = (e) => {
    e.preventDefault();
    const bodyvalue = e.target.value;
    setBody(bodyvalue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Enter a title",
        detail: "Title cannot be empty",
      });
    } else if (body.trim().length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Enter body",
        detail: "Body cannot be empty",
      });
    } else {
      const userString = localStorage.getItem("loggedinUser");
      const user = JSON.parse(userString);

      blogs.push({
        id: blogs.length + 1,
        title: title,
        imgUrl: imgUrl,
        body: body,
        author: user.name,
        profileUrl: user.imgUrl,
        comments: [],
      });

      localStorage.setItem("blogs", JSON.stringify(blogs));
      toast.current.show({
        severity: "success",
        summary: "Congratulations!",
        detail: "Blog created successfully",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <React.Fragment>
      <Toast ref={toast}></Toast>
      <NavBar />

      <div className="flex">
        <div
          className="max-w-lg mx-auto shadow-md mt-16"
          style={{
            backgroundColor: "#d8f3dc",
            borderRadius: "3rem",
          }}
        >
          <div
            className="w-full"
            style={{
              backgroundColor: "#d8f3dc",
              borderTopLeftRadius: "3rem",
              borderTopRightRadius: "3rem",
            }}
          >
            <p className="text-center text-2xl text-gray-800 font-bold p-6">
              Create a blog
            </p>
          </div>
          <form onSubmit={submitHandler}>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center mb-2 px-4">
                  <label
                    htmlFor="title"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Title
                  </label>
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <InputText
                  type="text"
                  id="title"
                  placeholder="Enter your title"
                  value={title}
                  onChange={titleHandler}
                  className="w-[95%] ml-3 border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="text-gray-700 px-4 text-sm font-medium mb-2 block"
                >
                  Image URL
                </label>
                <InputText
                  type="text"
                  id="url"
                  placeholder="Enter image URL"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  className="w-[95%] ml-3 border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2 px-4">
                  <label
                    htmlFor="body"
                    className="text-gray-700 text-sm font-medium"
                  >
                    Body
                  </label>
                  <span className="text-red-600 ml-1">*</span>
                </div>
                <InputTextarea
                  type="text"
                  id="body"
                  placeholder="Enter blog body"
                  value={body}
                  onChange={bodyHandler}
                  className="w-[95%] ml-3 border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
                  cols={100}
                  rows={4}
                />
              </div>

              <div className="mt-6 flex justify-end items-end mr-4">
                <Button
                  type="submit"
                  label="Create"
                  icon="pi pi-plus"
                  className="px-4 py-2 mt-5 bg-gray-100"
                  style={{ color: "#8cc69b" }}
                  rounded
                  raised
                />
              </div>
            </div>
          </form>
        </div>

        <img
          src={createAblog}
          alt="create a blog"
          className="w-1/2 h-full object-cover hidden md:block"
        />
      </div>
    </React.Fragment>
  );
};

export default Create;
