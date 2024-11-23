import React, { useContext, useEffect, useRef, useState } from "react";
import NavBar from "../navbar/Navbar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import LoginContext from "../store/loginCentext";
import { Badge } from "primereact/badge";

const YourBlogs = () => {
    let blogsString = localStorage.getItem("blogs");
    let allblogs = blogsString ? JSON.parse(blogsString) : [];

    const userString = localStorage.getItem("loggedinUser");
    const user = userString ? JSON.parse(userString) : [];

    let blogs= allblogs.filter((blog)=>blog.author===user.name)

    const [comments, setComments] = useState(
      blogs.length > 0 ? blogs[blogs.length - 1].comments || [] : []
    );
    const [currentBlogIndex, setCurrentBlogIndex] = useState(
      blogs.length > 0 ? blogs.length - 1 : null
    );
    const ctx = useContext(LoginContext);
    const [newComment, setNewComment] = useState("");
    const toast = useRef(null);

  
    const AddComments = (e) => {
      e.preventDefault();
  
      if (newComment === "") {
        toast.current.show({
          severity: "error",
          summary: "Empty comment",
          detail: "Comment cannot be empty",
        });
      } else {
        const newCommentObj = {
          author: user.name,
          profileUrl: user.imgUrl,
          body: newComment,
        };
  
        const updatedBlogs = [...blogs];
        updatedBlogs[currentBlogIndex].comments.push(newCommentObj);
  
        setComments((prevComments) => [...prevComments, newCommentObj]);
        setNewComment("");
        localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      }
    };
  
    const showBlog = (index) => {
      setCurrentBlogIndex(index);
      setComments(blogs[index].comments || []);
    };
  
    return (
      <React.Fragment>
        <NavBar />
        <Toast ref={toast}></Toast>
        <div className="flex w-full">
          <div className="w-2/3 flex flex-col items-center">
            {blogs.length === 0 && (
              <div className="flex items-center justify-center h-full">
              <p>No blogs posted yet</p>
            </div>
            
            )}
            {currentBlogIndex !== null && blogs[currentBlogIndex] && (
              <>
                <div className="bg-gray-200 rounded-lg shadow-md w-[57%] flex mt-5">
                  <img
                    src={blogs[currentBlogIndex].profileUrl}
                    alt=""
                    className="w-9 h-9 ml-1 mt-1 object-cover rounded-full"
                  ></img>
                  <p className="text-xl mt-1 ml-3">
                    {blogs[currentBlogIndex].author}
                  </p>
                </div>
                <img
                  src={blogs[currentBlogIndex].imgUrl}
                  alt=""
                  className="w-2/3 h-96 object-contain"
                ></img>
                <div className="w-[57%] mt-5">
                  <p className="text-xl font-bold">
                    {blogs[currentBlogIndex].title}
                  </p>
                  <p className="text-lg mt-3">{blogs[currentBlogIndex].body}</p>
                </div>
                <div className="bg-gray-200 rounded-lg shadow-md w-[57%] flex justify-center items-center mt-5">
                  <i className="pi pi-comment text-xl mr-2 mt-1"></i>
                  <p className="text-xl mt-1">Comments</p>
                  <Badge
                    value={comments.length}
                    severity="contrast"
                    className="mt-1 ml-2"
                  ></Badge>
                </div>
                {comments.length === 0 && (
                  <p className="mt-5 mb-14">No comments yet</p>
                )}
              </>
            )}
  
            {comments.length !== 0 &&
              comments.map((comment, index) => (
                <div
                  className={`bg-gray-200 w-[57%] rounded-lg p-3 mt-5 ${
                    index === comments.length - 1 ? "mb-14" : "mb-3"
                  }`}
                  key={index}
                >
                  <div className="flex">
                    <img
                      src={comment.profileUrl}
                      alt=""
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <p className="text-md ml-3 font-bold">{comment.author}</p>
                  </div>
                  <p className="text-sm mt-2">{comment.body}</p>
                </div>
              ))}
  
            {(ctx.isLoggedin && blogs.length>0) && (
              <div className="fixed bottom-0 left-0 w-2/3 flex items-center justify-center shadow-lg">
                <InputText
                  type="text"
                  placeholder="Write a comment..."
                  className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={AddComments}
                >
                  Post
                </Button>
              </div>
            )}
          </div>
  
          <div className="w-1/3 flex flex-col items-center bg-gray-100 p-4">
            <p className="text-xl text-center px-5 mt-20 mb-7">
              Hey {user.name} you have create a total of {blogs.length} blog(s).
            </p>
  
            {(blogs.length === 0 || blogs.length === 1) && (
              <p className="text-xl text-center mt-10">You have not posted another blog</p>
            )}
  
            {blogs.length > 1 &&
              blogs.map((blog, index) => {
                if (index !== currentBlogIndex) {
                  return (
                    <div
                      className="flex mb-5 cursor-pointer w-full hover:bg-gray-200"
                      key={index}
                      onClick={() => showBlog(index)}
                    >
                      <img
                        className="w-44 h-full object-cover"
                        src={blog.imgUrl}
                        alt=""
                      />
                      <div className="ml-4 w-full">
                        <p className="text-xl font-bold">{blog.title}</p>
                        <p className="text-md text-center mt-2">A blog created by</p>
                        <p className="text-md text-center">{blog.author}</p>
  
                        <span className="flex justify-center items-center mt-5">
                          <i
                            className="pi pi-comment mr-1 mt-0.5"
                            title={`${blog.comments.length} comments`}
                          ></i>
                          <p
                            title={`${blog.comments.length} comments`}
                            style={{ margin: 0 }}
                          >
                            {blog.comments.length}
                          </p>
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
      </React.Fragment>
    );
  };
  
  export default YourBlogs;
  