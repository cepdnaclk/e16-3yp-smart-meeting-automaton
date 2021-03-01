import React, { useReducer, useEffect } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utilis/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    isadmin: false,
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    loadUser();
    return () => {};
  }, []);

  //Load User
  const loadUser = async () => {
    //@todo - load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    //else
    try {
      const res = await axios.get("/api/auth");
      console.log(res);
      dispatch({
        type: USER_LOADED,
        payload: res.data, // is admin
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  //Register User
  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(formData);
      const res = await axios.post("/api/newuser/register", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.msg,
      });

      // loadUser();
    } catch (err) {
      // alert("dfgdfgdfg");
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Login User
  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(formData);
      const res = await axios.post("/api/auth", formData, config);
      console.log(formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // token come here
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  //Logout
  const logout = () => dispatch({ type: LOGOUT });

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isadmin: state.isadmin,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        clearErrors,
        logout,
        login,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
