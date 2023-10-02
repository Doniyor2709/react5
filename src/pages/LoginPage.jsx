import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <form onSubmit={login}>
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
