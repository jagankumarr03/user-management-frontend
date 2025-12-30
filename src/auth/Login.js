import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";


function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    toast.error("Invalid username or password");
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      toast.error("Invalid username or password");
      return;
    }

    const data = await response.json();

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);

    const profileRes = await fetch("http://localhost:8000/api/profile/", {
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
    });

    const profile = await profileRes.json();

    login({
      name: profile.username,
      role: profile.profile.role,
    });

    navigate("/dashboard");
  } catch (err) {
    toast.error("Server error. Try again.");
  }
};


  return (
    <div>
      <h2>Login</h2>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
    
  );
}


export default Login;
