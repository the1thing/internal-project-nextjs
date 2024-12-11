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

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setError(""); // Clear error message
      router.push("/project-list");
    } else {
      setError("Invalid username or password");
    }
  };
  return (
    <div className="container-homepage login-page">
      {/* <h2>Admin Login</h2> */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
