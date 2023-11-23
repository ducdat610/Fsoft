import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {  Button,  Col,  Container,  Form,  FormControl,  FormGroup,  Row,} from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Sign_Up = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const IsValaccountate = () => {
    let isproceed = true;
    let err = "Please enter the value in ";
    if (username === null || username === "") {
      isproceed = false;
      err += "username,";
    }
    if (email === null || email === "") {
      isproceed = false;
      err += "email,";
    }
    if (password === null || password === "") {
      isproceed = false;
      err += "password";
    }

    if (!isproceed) {
      toast(err); 
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } else {
          isproceed = false;
          toast.warning("Please enter the valid Email");
      }
  }
  return isproceed;
};

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    }
    if (IsValaccountate()) {
      axios
        .post("https://api.realworld.io/api/users", regobj, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => {
          toast.success("Registered successfully.");
          nav("/sign_in");
        })
        .catch((err) => {
          toast.error("Failed :" + err.message);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div>
            <h2 className="text-center">Sign Up</h2>
            <p className="text-center">
              <Link to="/sign_in" className="text-success">
                Have an account?
              </Link>
            </p>
            <Form onSubmit={handlesubmit}>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="email"
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
                <Button type="submit" className="btn btn-success">
                  Sign Up
                </Button>
              </FormGroup>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Sign_Up;
