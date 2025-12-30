import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword";

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");

useEffect(() => {
  setLoading(true);

  fetch("http://localhost:8000/api/profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTimeout(() => {
        setProfile(data);
        setFormData({
          username: data.username || "",
          email: data.email || "",
          phone: data.profile?.phone || "",
        });
        setLoading(false); 
      }, 1000);
    });
}, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    const res = await fetch(
      "http://localhost:8000/api/profile/update/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }

    setMessage("Profile updated successfully");
    setProfile(data);
  };

  const handleCancel = () => {
    setFormData({
      username: profile.username,
      email: profile.email,
      phone: profile.profile?.phone || "", // ✅ SAFE
    });
    setError("");
    setMessage("");
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (!profile) return null;

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>User Profile</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleSave} disabled={loading}>
        Save
      </button>
      <button
        onClick={handleCancel}
        style={{ marginLeft: "10px" }}
        disabled={loading}
      >
        Cancel
      </button>

      <hr />

      <ChangePassword />
    </div>
  );
}

export default UserProfile;
