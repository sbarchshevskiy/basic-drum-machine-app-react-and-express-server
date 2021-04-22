import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "./services/auth.service";

const required = (value) => {
  if (!value) {
    return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
    );
  }
};

const Login = (props) => {
  const { hasAccount, setHasAccount} = props;

  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(email, password).then(
          (res) => {
            if(!res.success) {
              window.alert(res.message);
            } else {
              window.location.reload();
            }

            setLoading(false);
          },
          (error) => {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setLoading(false);
            setMessage(resMessage);
          }
      );
    } else {
      setLoading(false);
    }
  };

  return (
      <section className="login">
        <div className="loginContainer">
          <Form onSubmit={handleLogin} ref={form}>
            <div>
              <label htmlFor="username">Email</label>
              <Input
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required]}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required]}
              />
            </div>

            <div className="btnContainer">
              <p>Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
              <button disabled={loading}>
                {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
                <div>
                  <div role="alert">
                    {message}
                  </div>
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
      </section>
  );
};

export default Login;