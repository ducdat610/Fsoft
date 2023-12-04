import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/login/loginSlice'
const Sign_In = () => {
  const loginState = useSelector(state => state.login.value)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);
  const ProceedLogin = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(email, password);
      axios
        .post("https://api.realworld.io/api/users/login", {
          user: {
            email: email,
            password: password,
          },
        })
        .then((res) => {
          const user = res.data.user;
          console.log(res);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", user.token);
          toast.success("Success");
          dispatch(login())
          nav("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      toast.warning("Please Enter email");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div>
            <h2 className="text-center">Sign In</h2>
            <p className="text-center">
              <Link to="/sign_up" className="text-primary">
                Need an account?
              </Link>
            </p>
            <Form onSubmit={ProceedLogin}>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" className="btn btn-primary">
                  Sign In
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Sign_In;