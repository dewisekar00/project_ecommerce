import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/redux/Slice/authSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Masukan username dan password");
      return;
    }
    setErrorMessage("");
    
    let userCredential = {
      username,
      password,
    };

    dispatch(loginUser(userCredential))
      .then((result) => {
        if (result.payload && result.payload.token) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("login failed", error);
        alert("Terjadi kesalahan saat login. Silakan coba lagi nanti.");
      });
  };

  return (
    <>
      <div className="  items-center mt-32">
        <h1 className=" text-center text-green-400 font-bold mb-4 text-xl">
          Hi, Welcome Back!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 mt-16 items-center "
        >
          <input
            type="text"
            placeholder="username"
            className="input input-bordered w-full max-w-xs"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="input input-bordered w-full max-w-xs"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errorMessage && ( 
            <p className="text-center text-sm text-red-400">{errorMessage}</p>
          )}
          {message && !loading && ( 
            <p className="text-center text-sm text-red-400">
              Login gagal. Periksa kembali username dan password.
            </p>
          )}
          <button
            type="submit"
            className="btn border font-bold text-lg bg-white text-green-400 border-green-400 px-32 rounded-xl mt-8 hover:bg-green-400 hover:text-white"
          >
            Login
          </button>
        </form>
        {loading && (
          <div className="flex justify-center items-center mt-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
