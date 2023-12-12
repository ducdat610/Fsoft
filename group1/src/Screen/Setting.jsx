import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux'
import { isChange } from '../features/login/navSlice'

import styles from '../assets/css/setting.module.css'
const Setting = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const loginState = useSelector(state => state.login.value);
  const navChange = useSelector((state) => state.nav.value)

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("https://api.realworld.io/api/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const userData = response.data.user;
        userData.password = null;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token);
        console.log(response);
        
      } catch (error) {
        console.log(error)
        console.log(error.message);
      }
    };
    fetchData();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put("https://api.realworld.io/api/user", { user }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.user.token)
      dispatch(isChange(!navChange));
      toast.success("Updated successfully!");
      nav(`/my_articles/${user.username}`)
    } catch (err) {
      console.log(err.message);
    }
  };


  const handleSignOut = () => {
    localStorage.clear();
    nav("/");
    window.location.reload();
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className=" mt-5 text-center text-light">Your Setting</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <Form className="form-setting ng-valid ng-valid-email ng-dirty ng-valid-parse">
            <fieldset>
              <input
                className="form-control ng-pristine ng-untouched ng-valid ng-not-empty"
                placeholder="URL of profile picture"
                value={user?.image}
                onChange={(e) => setUser({ ...user, image: e.target.value })}
              ></input>
            </fieldset>
            <fieldset>
              <input
                className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty"
                value={user?.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              ></input>
            </fieldset>
            <fieldset>
              <textarea
                className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-empty"
                placeholder="Short bio about you"
                value={user?.bio}
                onChange={(e) => setUser({ ...user, bio: e.target.value })}
              ></textarea>
            </fieldset>
            <fieldset>
              <input
                className="form-control form-control-lg ng-pristine ng-untouched ng-valid ng-not-empty ng-valid-email"
                placeholder="Email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              ></input>
            </fieldset>
            <fieldset>
              <input
                className="form-control form-control-lg ng-valid ng-not-empty ng-dirty ng-valid-parse ng-touched"
                placeholder="New password"
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              ></input>
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              onClick={handleUpdate}
            >
              Update Settings
            </button>
            <div style={{ marginTop: "60px" }}>
              <hr />
              <button
                className="d-flex justify-content-center btn btn-outline-danger"
                onClick={handleSignOut}
              >
                Or click here to logout.
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Setting;
