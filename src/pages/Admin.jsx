import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Placeholder logic for fetching user role
    const userRole = "admin"; // This should be fetched from an API or context
    setRole(userRole);

    if (userRole !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  if (role !== "admin") {
    return null;
  }

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">Admin Dashboard</h1>
      <p>Welcome, Admin! You have full access to this page.</p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default Admin;