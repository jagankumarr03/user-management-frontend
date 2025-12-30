import { useState } from "react";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("access");

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    const res = await fetch(
      "http://localhost:8000/api/change-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Password change failed");
      return;
    }

    setMessage("Password updated successfully");
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <div>
      <h3>Change Password</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleChangePassword}>Update Password</button>
    </div>
  );
}

export default ChangePassword;
