import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { TiInfoLarge } from "react-icons/ti";
import * as Yup from "yup";
import "./login.scss";
import { CLIENT_RENEG_LIMIT } from "tls";

const Login = () => {
  const loginSchema = Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required")
  });
  const submitForm = async (values, { setSubmitting, setErrors }) => {
    setSubmitting(false);
    const { email, password } = values;
    const res = await fetch("https://api-lb.herokuapp.com/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    const loginResult = await res.json();
    console.log(loginResult);
    if (!loginResult.error) {
      console.log("no error");
    } else {
      const { code } = loginResult.error;
      if (code === "INVALID_LOGIN") {
        console.log("Invalid Login");
      } else if (code === "UNVERIFIED_PHONE") {
        console.log("Code Unverified");
      } else {
        console.log("Email is unverified");
      }
    }
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={loginSchema}
      onSubmit={submitForm}
    >
      {({ isSubmitting }) => (
        <Form className="login-container">
          <div className="login-header">
            <h1>Sign In</h1>
          </div>
          <div className="login-body">
            <div>
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email">
                {name => (
                  <div className="error-icon">
                    <TiInfoLarge size="28px" color="white" className="icon" />
                    <div className="error-popup">{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div>
              <Field name="password" type="password" placeholder="Password" />
              <ErrorMessage name="password">
                {name => (
                  <div className="error-icon">
                    <TiInfoLarge size="28px" />
                    <div className="error-popup">{name}</div>
                  </div>
                )}
              </ErrorMessage>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Sign In
              </button>
            </div>
            Don't have an account? &nbsp;&nbsp;
            <br />
            <Link to="/signup">Sign Up</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
