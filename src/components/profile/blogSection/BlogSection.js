import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const ProfileBlogSection = () => {
  const [allBlogs, setAllBlogs] = React.useState(() => {
    const blogsString = localStorage.getItem("blogs");
    return blogsString ? JSON.parse(blogsString) : [];
  });

  const navigate = useNavigate();

  const [blogs, setBlogs] = React.useState(() => {
    const userString = localStorage.getItem("loggedinUser");
    const user = userString ? JSON.parse(userString) : {};
    return allBlogs.filter((blog) => blog.author === user.name);
  });

  const [selectedBlog, setSelectedBlog] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  // Toast reference
  const toast = useRef(null);

  const deleteHandler = (id) => {
    const updatedAllBlogs = allBlogs.filter((blog) => blog.id !== id);
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);

    setAllBlogs(updatedAllBlogs);
    setBlogs(updatedBlogs);

    localStorage.setItem("blogs", JSON.stringify(updatedAllBlogs));
    navigate("/profile");
  };

  const editHandler = (blog) => {
    setSelectedBlog(blog);
    setVisible(true);
  };

  const saveHandler = () => {
    if (!selectedBlog.title.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Title cannot be empty",
        life: 3000,
      });
      return;
    }

    if (!selectedBlog.body.trim()) {
      toast.current.show({
        severity: "error",
        summary: "Validation Error",
        detail: "Body cannot be empty",
        life: 3000,
      });
      return;
    }

    const updatedAllBlogs = allBlogs.map((blog) =>
      blog.id === selectedBlog.id ? selectedBlog : blog
    );
    const updatedBlogs = blogs.map((blog) =>
      blog.id === selectedBlog.id ? selectedBlog : blog
    );

    setAllBlogs(updatedAllBlogs);
    setBlogs(updatedBlogs);

    localStorage.setItem("blogs", JSON.stringify(updatedAllBlogs));
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Toast ref={toast} />

      <Dialog
        visible={visible}
        header="Edit Blog"
        footer={
          <div>
            <Button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              onClick={saveHandler}
              icon="pi pi-save"
              raised
              tooltip="Save"
              tooltipOptions={{ position: "top" }}
            ></Button>
          </div>
        }
        onHide={() => setVisible(false)}
      >
        {selectedBlog && (
          <div className="flex flex-col space-y-3">
            <div>
              <label className="font-bold">Title</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedBlog.title}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-bold">Image URL</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={selectedBlog.imgUrl}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, imgUrl: e.target.value })
                }
              />
            </div>
            <div>
              <label className="font-bold">Body</label>
              <InputTextarea
                className="w-full border p-2 rounded"
                value={selectedBlog.body}
                onChange={(e) =>
                  setSelectedBlog({ ...selectedBlog, body: e.target.value })
                }
                cols={100}
                rows={10}
              />
            </div>
          </div>
        )}
      </Dialog>

      <div className="bg-gray-100 text-center p-4 text-2xl font-bold">
        Your blogs
      </div>

      {blogs.map((blog) => (
        <div className="bg-gray-100 flex justify-between" key={blog.id}>
          <img
            src={blog.imgUrl}
            alt=""
            className="w-32 h-32 object-contain px-5"
          ></img>

          <p className="text-xl mt-10">{blog.title}</p>

          <div className="mt-10 px-10">
            <i
              className="pi pi-pencil text-blue-600 cursor-pointer mr-6"
              data-pr-tooltip="Edit"
              data-pr-position="top"
              onClick={() => editHandler(blog)}
            ></i>
            <i
              className="pi pi-trash text-red-600 cursor-pointer"
              data-pr-tooltip="Delete"
              data-pr-position="top"
              onClick={() => {
                confirmDialog({
                  message: "Are you sure you want to delete this blog?",
                  header: "Delete Blog",
                  icon: "pi pi-trash",
                  accept: () => deleteHandler(blog.id),
                  acceptClassName:
                    "bg-blue-700 hover:bg-blue-600 ml-3 px-2 py-1 text-white",
                  acceptIcon: "pi pi-check",
                  rejectClassName:
                    "hover:bg-gray-100 px-2 py-1 border border-blue-200",
                  rejectIcon: "pi pi-times",
                });
              }}
            ></i>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ProfileBlogSection;
