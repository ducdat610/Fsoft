import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import "../styles/Setting.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Setting = () => {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        // const tokenFromLocalStorage = localStorage.getItem("token");
        if (userFromLocalStorage) {
          setUser(userFromLocalStorage);
        }
        // if (tokenFromLocalStorage) {
        //   setToken(tokenFromLocalStorage);
        // }
        const response = await axios.get("https://api.realworld.io/api/user", {
          // headers: {
          //   Authorization: `Bearer ${tokenFromLocalStorage}`,
          // },
        });
        const userData = response.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        // console.log(tokenFromLocalStorage);
        console.log(userFromLocalStorage);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const empdata = { email, password, username, bio, image };

    fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then(() => {
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Updated successfully!");
        nav("/setting")
      })
      .catch((error) => {
        console.log(error.message);
      });
    console.log(user);
  };


  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await axios.put(
  //       "https://api.realworld.io/api/user",
  //       {
  //         "user": {
  //           email: email,
  //           password: password,
  //           username: username,
  //           bio: bio,
  //           image: image,
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Uncomment this if needed
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     const updatedUser = response.data.user;
  //     setUser((prevUser) => ({ ...prevUser, ...updatedUser }));
  //     localStorage.setItem("user", JSON.stringify(updatedUser));
  //     toast.success("Updated successfully!");
  //     nav("/setting");
  //   } catch (error) {
  //     console.error("Update failed:", error.message);
  //   }
  // };
    
  

  const handleSignOut = () => {
    localStorage.clear();
    nav("/");
    window.location.reload();
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2 className=" mt-5 text-center">Your Setting</h2>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
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
              class="btn btn-lg btn-success pull-xs-right"
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
