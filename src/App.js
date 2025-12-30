import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminDashboard from "./dashboard/AdminDashboard";
import UserDashboard from "./dashboard/UserDashboard";
import ProtectedRoute from "./common/ProtectedRoute";
import Navbar from "./common/Navbar";
import UserProfile from "./profile/UserProfile";


function App() {
  return (
    <BrowserRouter>
      {/* Navbar shows */}
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate to="/login" />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
