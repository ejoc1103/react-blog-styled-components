import React, { useState, useEffect } from "react";
import PageLayout from "../common/PageLayout";
import styled from "styled-components";
import Input from "../common/Input";
import PasswordInput from "../common/PasswordInput";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  box-sizing: border-box;
  color: black;
  border-radius: 4px;

  .alt-text {
    text-align: center;
    margin: 10px 0;
  }

  > ${Button} {
    margin-top: 40px;
  }
  > ${Input} {
    margin-top: 20px;
  }
`;

let timeout;

const Login = () => {
  const [formFields, setFormFields] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    let { name, value } = e.target;

    setFormFields(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);
  return (
    <PageLayout>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <span>Login if you have an account</span>
            <Input
              value={formFields.username}
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Username"
            />
            <PasswordInput
              value={formFields.password}
              onChange={handleChange}
              name="password"
            />
          </>
        )}
        <Button large type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        {!loading ? (
          <>
            <div className="alt-text">or</div>
            <Button secondary type="button">
              Register
            </Button>
          </>
        ) : null}
      </Form>
    </PageLayout>
  );
};

export default Login;
