import { Button } from "primereact/button";
import React, { useContext, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import LoginContext from "../../store/loginCentext";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

const EditProfileSection = () => {
  const userString = localStorage.getItem("loggedinUser");
  const user = JSON.parse(userString);
  const [visible, setVisible] = useState(false);
  const [changePassDialog, setChangePassDialog] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [newUrl, setNewUrl] = useState("");
  const toast = useRef(null);
  const [header, setHeader] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [currPassword, setCurrPassword] = useState("");
  const ctx = useContext(LoginContext);

  const UrlHandler = (e) => {
    setNewUrl(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const currPasswordHandler = (e) => {
    setCurrPassword(e.target.value);
  };

  let blogsString = localStorage.getItem("blogs");
  let allblogs = blogsString ? JSON.parse(blogsString) : [];

  let blogs = allblogs.filter((blog) => blog.author === user.name);
  let comments = 0;

  if (blogs.length !== 0) {
    blogs.forEach((blog) => {
      comments += blog.comments.length;
    });
  }

  const changeImageHandler = () => {
    if (newUrl.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Empty Url",
        detail: "Url field is empty",
      });
    } else {
      user.imgUrl = newUrl;
      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.imgUrl = newUrl;
        }
      });

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("loggedinUser", JSON.stringify(user));
      setVisible(false);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Profile image updated",
      });
      setNewUrl("");
    }
  };

  const changePasswordHandler = (e) => {
    e.preventDefault();

    if (currPassword !== user.password) {
      toast.current.show({
        severity: "error",
        summary: "Incorrect password",
        detail: "you have entered current password incorrectly",
      });
    } else if (password.length < 7) {
      toast.current.show({
        severity: "error",
        summary: "Low password length",
        detail: "Password should have atleast 7 characters ",
      });
    } else {
      user.password = password;

      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.password = password;
        }
      });

      localStorage.setItem("loggedinUser", JSON.stringify(user));
      localStorage.setItem("users", JSON.stringify(users));

      ctx.logout("changePassword");
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Empty name",
        detail: "Name field is empty",
      });
    } else if (email.trim() === "") {
      toast.current.show({
        severity: "error",
        summary: "Empty email",
        detail: "Email field is empty",
      });
    } else {
      user.name = name;
      user.email = email;

      const usersString = localStorage.getItem("users");
      const users = JSON.parse(usersString);

      users.forEach((u) => {
        if (u.id === user.id) {
          u.name = name;
          u.email = email;
        }
      });

      localStorage.setItem("loggedinUser", JSON.stringify(user));
      localStorage.setItem("users", JSON.stringify(users));

      toast.current.show({
        severity: "success",
        summary: "Saved successfully",
        detail: "Data saved successfully",
      });
    }
  };

  const openImgUrlDialog = () => {
    setVisible(true);
    setHeader("Edit profile image");
  };

  const openPassDialog = () => {
    setChangePassDialog(true);
    setHeader("Change password");
  };

  const hideDialog = () => {
    setVisible(false);
    setChangePassDialog(false);
    setPassword("");
    setNewUrl("");
    setCurrPassword("");
  };

  return (
    <React.Fragment>
      <ConfirmDialog />
      <Dialog
        visible={visible || changePassDialog}
        header={header}
        onHide={hideDialog}
      >
        {visible && (
          <div>
            <div className="flex mb-3">
              <p className="font-bold">Current profile URL:</p>
              <p className="ml-2">{user.imgUrl}</p>
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-bold">New profile URL:</label>
              <InputText
                type="text"
                className="border bg-gray-100 shadow-lg px-2 py-1 flex-grow"
                style={{ borderColor: "black" }}
                value={newUrl}
                onChange={UrlHandler}
              />
            </div>
            <div className="flex justify-end items-end">
              <Button
                rounded
                raised
                className="bg-blue-700 text-white hover:bg-blue-600 mt-4"
                tooltip="Save"
                tooltipOptions={{ position: "left" }}
                icon="pi pi-save"
                onClick={changeImageHandler}
              />
            </div>
          </div>
        )}

        {changePassDialog && (
          <div className="w-full max-w-lg mx-auto">
            <div className="flex mb-3">
              <p className="font-bold w-1/3">Current password</p>
              <div className="relative w-2/3">
                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border p-inputtext-sm pr-10 px-2"
                  value={currPassword}
                  onChange={currPasswordHandler}
                  style={{ borderColor: "black" }}
                />
                <i
                  className={`absolute right-2 top-[28%] transform -translate-y-1/2 cursor-pointer ${
                    !showPassword ? "pi pi-eye" : "pi pi-eye-slash"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>
            <div className="flex mb-3">
              <label className="font-bold w-1/3">New password</label>
              <div className="relative w-2/3">
                <InputText
                  id="confpassword"
                  type={showNewPass ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full border p-inputtext-sm pr-10 px-2"
                  value={password}
                  onChange={passwordHandler}
                  style={{ borderColor: "black" }}
                />
                <i
                  className={`absolute right-1 top-[50%] px-2 transform -translate-y-1/2 cursor-pointer ${
                    !showNewPass ? "pi pi-eye" : "pi pi-eye-slash"
                  }`}
                  onClick={() => setShowNewPass(!showNewPass)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                rounded
                raised
                className="bg-blue-700 text-white hover:bg-blue-600 mt-4"
                tooltip="Change password"
                tooltipOptions={{ position: "left" }}
                icon="pi pi-save"
                onClick={changePasswordHandler}
              />
            </div>
          </div>
        )}
      </Dialog>

      <Toast ref={toast}></Toast>

      <div className="flex rounded-lg shadow-md w-full">
        <div className="w-1/2 mb-5">
          <div className="flex justify-center items-center">
            <img
              src={user.imgUrl}
              className="rounded-full h-96 object-contain"
              alt="User profile"
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              label="Change profile image"
              className="bg-blue-700 px-3 py-1 text-white hover:bg-blue-600"
              onClick={openImgUrlDialog}
              rounded
              raised
            />
          </div>
        </div>

        <div className="w-1/2 mb-5">
          <p className="text-2xl text-center mt-5">
            <i className="pi pi-pencil text-xl mr-1"></i> Edit your profile
          </p>

          <form className="ml-10 mt-10">
            <div>
              <label className="mr-2 text-xl font-bold">Name:</label>
              <InputText
                type="text"
                className="px-2 border bg-gray-100"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                style={{ borderColor: "black" }}
              ></InputText>
            </div>
            <div className="mt-10">
              <label className="mr-2 text-xl font-bold">Email:</label>
              <InputText
                type="email"
                className="px-2 border bg-gray-100"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                style={{ borderColor: "black" }}
              />
            </div>
          </form>

          <div className="flex mt-10 ml-10">
            <p className="text-xl font-bold mr-2">Total blogs created:</p>
            <p className="text-xl">{blogs.length}</p>
          </div>

          <div className="flex mt-10 ml-10">
            <p className="text-xl font-bold mr-2">Total comments:</p>
            <p className="text-xl">{comments}</p>
          </div>

          <div className="flex justify-end items-end mt-10">
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white mr-5"
              icon="pi pi-lock"
              tooltip="Change password"
              tooltipOptions={{ position: "top" }}
              onClick={openPassDialog}
              rounded
              raised
            ></Button>
            <Button
              className="bg-red-700 hover:bg-red-600 text-white mr-5"
              icon="pi pi-trash"
              tooltip="Delete account"
              tooltipOptions={{ position: "top" }}
              onClick={() => {
                confirmDialog({
                  message: "Are you sure you want to delete this account?",
                  header: "Delete account",
                  icon: "pi pi-trash",
                  defaultFocus: "accept",
                  accept: () => {
                    ctx.deleteAccount(user.id);
                  },
                  acceptClassName:
                    "bg-blue-700 hover:bg-blue-600 ml-3 px-2 py-1 text-white",
                  acceptIcon: "pi pi-check",
                  rejectClassName:
                    "hover:bg-gray-100 px-2 py-1 border border-blue-200",
                  rejectIcon: "pi pi-times",
                });
              }}
              rounded
              raised
            ></Button>
            <Button
              className="bg-blue-700 hover:bg-blue-600 text-white mr-5"
              icon="pi pi-save"
              tooltip="Save changes"
              tooltipOptions={{ position: "top" }}
              onClick={(event) => {
                confirmDialog({
                  message: "Are you sure you want to save changes?",
                  header: "Save changes",
                  icon: "pi pi-save",
                  defaultFocus: "accept",
                  accept: () => {
                    saveHandler(event);
                  },
                  acceptClassName:
                    "bg-blue-700 hover:bg-blue-600 ml-3 px-2 py-1 text-white",
                  acceptIcon: "pi pi-check",
                  rejectClassName:
                    "hover:bg-gray-100 px-2 py-1 border border-blue-200",
                  rejectIcon: "pi pi-times",
                });
              }}
              rounded
              raised
            ></Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProfileSection;
