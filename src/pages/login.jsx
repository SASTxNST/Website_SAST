/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../index.css";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="login-box animate-login">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h1 className="login-title">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="login-subtitle">
            {isLogin ? "Log in to your account" : "Create a new account"}
          </p>

          <form className="login-form">
            <input type="email" placeholder="Email" required />
            {!isLogin && <input type="text" placeholder="Username" required />}
            <input type="password" placeholder="Password" required />

            {!isLogin && (
              <input type="password" placeholder="Confirm Password" required />
            )}

            <button type="submit" className="auth-button">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {isLogin ? (
            <p className="signup-text">
              Don’t have an account?{" "}
              <span onClick={() => setIsLogin(false)}>Sign up</span>
            </p>
          ) : (
            <p className="signup-text">
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Log in</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
