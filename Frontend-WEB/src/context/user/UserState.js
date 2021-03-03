import React, { useReducer, useEffect } from "react";
import userContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";
import setAuthToken from "../../utilis/setAuthToken";

import {
  USER_ADD_SUCCESS,
  USER_ADD_FAIL,
  CLEAR_USER_ERRORS,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
  // USER_LOADED,
  // AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // LOGOUT,
  // CLEAR_ERRORS,
} from "../types";

const UserState = (props) => {
  const initialState = {
    error: null,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  // //Load User
  // const loadUser = async () => {
  //   //@todo - load token into global headers
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }
  //   //else
  //   try {
  //     const res = await axios.get("/api/auth");
  //     console.log(res);
  //     dispatch({
  //       type: USER_LOADED,
  //       payload: res.data, // is admin
  //     });
  //   } catch (error) {
  //     dispatch({ type: AUTH_ERROR });
  //   }
  // };

  //ADD User
  const addUser = async (formData) => {
    console.log(formData);
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log(formData);
      const res = await axios.post("/api/newuser/", formData, config);
      dispatch({
        type: USER_ADD_SUCCESS,
        payload: res.data.msg,
      });

      // loadUser();
    } catch (err) {
      // alert("dfgdfgdfg");
      dispatch({
        type: USER_ADD_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // //Login User
  // const login = async (formData) => {
  //   const config = {
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     console.log(formData);
  //     const res = await axios.post("/api/auth", formData, config);
  //     console.log(formData);

  //     dispatch({
  //       type: LOGIN_SUCCESS,
  //       payload: res.data, // token come here
  //     });

  //     loadUser();
  //   } catch (err) {
  //     dispatch({
  //       type: LOGIN_FAIL,
  //       payload: err.response.data.msg,
  //     });
  //   }
  // };

  // //Logout
  // const logout = () => dispatch({ type: LOGOUT });

  //Clear user Errors
  const clearuserErrors = () => dispatch({ type: CLEAR_USER_ERRORS });

  return (
    <userContext.Provider
      value={{
        error: state.error,
        clearuserErrors,
        addUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
