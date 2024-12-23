import React, { useState } from "react";
import { useRouter } from "next/router";
export default function index() {
  const router = useRouter();

  // Fixed admin credentials
  const ADMIN_USERNAME = "onething";
  const ADMIN_PASSWORD = "onething@123";

  // State for input fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emptyField, setEmptyField] = useState(false);
  const [credentialsWrong, setCredentialsWrong] = useState(false);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setEmptyField(false);
    setCredentialsWrong(false);

    if (username === "" || password === "") {
      setEmptyField(true);
      return;
    }

    if (username !== ADMIN_USERNAME || password != ADMIN_PASSWORD) {
      setCredentialsWrong(true);
      return;
    }

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem("role", "admin");
      setError(""); // Clear error message
      router.push("/project-list");
    } else {
      setError("Invalid username or password");
    }
  };

  function passwordHandler() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="container-homepage login-page">
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-container">
          <div className="login-heading">Welcome Back!</div>
          <div className="form-username">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="onething@gmail.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-form-username"
            />
          </div>

          <div className="form-username">
            <label htmlFor="password">Password:</label>
            <div className="login-form-pasword">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div onClick={passwordHandler}>
                {showPassword ? (
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 2c-1.5 0-2.8.4-3.9 1.2l.8.7C5.8 3.3 6.8 3 8 3c3.3 0 6 2.7 6 6h1c0-3.9-3.1-7-7-7zM1 3l1.6 1.5C1.6 5.7 1 7.3 1 9h1c0-1.5.5-2.8 1.4-3.8l2.2 2C5.2 7.7 5 8.3 5 9c0 1.7 1.3 3 3 3 .8 0 1.5-.3 2-.8l3 2.8.7-.7-12-11L1 3zm5.3 4.9l2.9 2.7c-.3.2-.7.4-1.2.4-1.1 0-2-.9-2-2 0-.4.1-.8.3-1.1zM11 9.5l-1-.9c-.2-.8-.9-1.5-1.8-1.6l-1-.9c.3-.1.5-.1.8-.1 1.7 0 3 1.3 3 3v.5z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 10c0-3.9 3.1-7 7-7s7 3.1 7 7h-1c0-3.3-2.7-6-6-6s-6 2.7-6 6H1zm4 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm1 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {error && <p>{error}</p>}

          <div className="login-form-submit">
            <button type="submit" className="login-form-button">
              Login
            </button>
            <div className="submit-error-text">
              {emptyField ? (
                <div>Please fill all the fields!</div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="submit-error-text">
              {credentialsWrong ? <div>Wrong Credentials!</div> : <div></div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
