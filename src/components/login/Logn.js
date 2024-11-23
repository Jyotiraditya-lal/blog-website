import React, { useContext, useState } from "react";
import loginImg from "../../assets/loginImg.jpg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import LoginContext from "../store/loginCentext";
import NavBar from "../navbar/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [emailFlag, setEmailFlag] = useState(false);
  const [passFlag, setPassFlag] = useState(false);
  const [confirmPassFlag, setConfirmPassFlag] = useState(false);
  const [nameFlag, setNameFlag] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const ctx = useContext(LoginContext);

  const emailHandler = (e) => {
    const emailValue = e.target.value;
    if (emailValue.length === 0) {
      setEmailFlag(false);
    } else if (!emailValue.includes("@") || !emailValue.includes(".com")) {
      setEmailFlag(true);
    } else {
      setEmailFlag(false);
    }
    setEmail(emailValue);
  };

  const passwordHandler = (e) => {
    const passValue = e.target.value;
    if (passValue.length === 0) {
      setPassFlag(false);
    } else if (passValue.length < 7) {
      setPassFlag(true);
    } else {
      setPassFlag(false);
    }
    setPass(passValue);
  };

  const confirmPasswordHandler = (e) => {
    const confirmPassValue = e.target.value;
    if (confirmPassValue !== pass) {
      setConfirmPassFlag(true);
    } else {
      setConfirmPassFlag(false);
    }
    setConfirmPass(confirmPassValue);
  };

  const nameHandler = (e) => {
    const nameValue = e.target.value;
    if (nameValue.trim() === "") {
      setNameFlag(true);
    } else {
      setNameFlag(false);
    }
    setName(nameValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (showLoginForm) {
      ctx.login(email, pass);
    } else {
      const usersString = localStorage.getItem("users");
      const users = usersString ? JSON.parse(usersString) : [];
      ctx.addUser({
        id: users.length + 1,
        name: name,
        email: email,
        password: pass,
        imgUrl: imgUrl,
      });
      setShowLoginForm(true);
      setEmail("");
      setPass("");
      setConfirmPass("");
      setName("");
      setImgUrl("");
    }
  };

  const changeForm = () => {
    setShowLoginForm(!showLoginForm);
    setEmail("");
    setPass("");
    setConfirmPass("");
    setName("");
    setImgUrl("");
  };

  const isButtonDisabled =
    emailFlag ||
    passFlag ||
    email.length === 0 ||
    pass.length === 0 ||
    (showLoginForm === false &&
      (confirmPassFlag ||
        confirmPass.length === 0 ||
        nameFlag ||
        name.length === 0));

  return (
    <React.Fragment>
      <NavBar />

      <div className="flex h-[90%]">
        <img
          src={loginImg}
          alt="loginImage"
          className="w-1/2 h-[90%] object-contain hidden md:block"
        />
        <div className="flex items-center justify-center mt-7 ml-14 md:ml-0 md:mt-0 w-1/2">
          <form className="space-y-4 w-3/4 max-w-sm" onSubmit={submitHandler}>
            {!showLoginForm && (
              <div>
                <div className="flex">
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    Name
                  </label>
                  <p className="text-red-600 ml-1">*</p>
                </div>
                <InputText
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-inputtext-sm"
                  value={name}
                  onChange={nameHandler}
                />
                {nameFlag && (
                  <p className="text-red-500">Name cannot be empty</p>
                )}
              </div>
            )}

            <div>
              <div className="flex">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                >
                  Email
                </label>
                <p className="text-red-600 ml-1">*</p>
              </div>
              <InputText
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-inputtext-sm"
                value={email}
                onChange={emailHandler}
              />
              {emailFlag && (
                <p className="text-red-500">Please enter a valid email</p>
              )}
            </div>
            <div>
              <div className="flex">
                <label
                  htmlFor="password"
                  className="block text-lg font-medium mb-2"
                >
                  Password
                </label>
                <p className="text-red-600 ml-1">*</p>
              </div>
              <div className="relative">
                <InputText
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-inputtext-sm pr-10"
                  value={pass}
                  onChange={passwordHandler}
                />
                <i
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                    !showPassword ? "pi pi-eye" : "pi pi-eye-slash"
                  }`}
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              </div>

              {passFlag && (
                <p className="text-red-500">
                  Password should have at least 7 characters
                </p>
              )}
            </div>

            {!showLoginForm && (
              <React.Fragment>
                <div>
                  <div className="flex">
                    <label
                      htmlFor="confpassword"
                      className="block text-lg font-medium mb-2"
                    >
                      Confirm Password
                    </label>
                    <p className="text-red-600 ml-1">*</p>
                  </div>
                  <div className="relative">
                    <InputText
                      id="confpassword"
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full p-inputtext-sm"
                      value={confirmPass}
                      onChange={confirmPasswordHandler}
                    />
                    <i
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                        !showConfirmPass ? "pi pi-eye" : "pi pi-eye-slash"
                      }`}
                      onClick={() => {
                        setShowConfirmPass(!showConfirmPass);
                      }}
                    />
                  </div>
                  {confirmPassFlag && (
                    <p className="text-red-500">Passwords do not match</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-lg font-medium mb-2"
                  >
                    Image URL
                  </label>

                  <InputText
                    id="imageUrl"
                    type="text"
                    placeholder="Enter your image URL"
                    className="w-full p-inputtext-sm"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                </div>
              </React.Fragment>
            )}

            <div className="flex justify-center items-center">
              <Button
                type="submit"
                label="Submit"
                disabled={isButtonDisabled}
                className="bg-blue-800 text-white px-5 py-1 mt-5"
              />
            </div>
            <p
              onClick={changeForm}
              className="cursor-pointer text-blue-800 flex justify-center items-center"
            >
              {showLoginForm ? "Not a user? sign up" : "Account exists? login"}
            </p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
