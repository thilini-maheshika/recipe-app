import React, { useState } from "react";
import axios from 'axios';
import { getToken, setToken, setUserid } from '../../session';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loginError, setLoginError] = useState("");
  const [emptyError, setEmptyError] = useState("");

  const navigate = useNavigate();

  const submitLogin = async(e) => {
    e.preventDefault();

    if (!email) {
      setEmptyError("Please enter an email address.");
      return;
    }

    if (!password) {
      setEmptyError("Please enter a password.");
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_API_ENDPOINT + '/user/login', {
          email: email,
          password: password
      }
      );

      if (response) {
          setToken(response.data.token);
          setUserid(response.data.userId);
          setLoginError("");

          if (getToken()) {
              navigate('/');
          }
      }else{
          setLoginError(response.data.error);
      }
      
  } catch (error) {
      console.error('Error fetching data:', error);
      setLoginError(error.response.data.error);
  }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto w-6/12" src="./logo.png" alt="COOK" />
          <h1 className="text-left text-2xl font-semibold leading-9 text-gray-900">
            Login
          </h1>
        </div>
        <form className="mt-6 space-y-4">
        <div className="relative z-0 w-full group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value.trim());
                if (!e.target.value.trim()) {
                  setEmptyError("Please enter an email address.");
                } else {
                  setEmptyError(""); 
                }
              }}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              autoComplete="email"
              placeholder=" "
              required
            />
            {emptyError && (<p className="mt-2 text-left text-xs text-pink-700">{emptyError}</p>) }
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => { 
                setPassword(e.target.value.trim());
                if (!e.target.value.trim()) {
                  setEmptyError("Please enter a password.");
                } else {
                  setEmptyError("");
                }
              }}
              autoComplete="current-password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-pink-600 peer"
              placeholder=" "
              required
            />
            {emptyError && (<p className="mt-2 text-left text-xs text-pink-700">{emptyError}</p>) }
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-pink-600 peer-focus:dark:text-pink-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <button
            type="button"
            onClick={(e) => { submitLogin(e) }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    submitLogin(e); 
                }
            }}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            SIGN IN
          </button>

          {loginError && (<p className="mt-2 text-center text-sm text-pink-700">{loginError}</p>) }

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-pink-500 hover:underline">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
