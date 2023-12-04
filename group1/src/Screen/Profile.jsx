import React, { useEffect, useState } from "react";
import axios from "axios";
import { GearFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
        if (userFromLocalStorage) {
          setUser(userFromLocalStorage);
        }
        const response = await axios.get("https://api.realworld.io/api/user");
        console.log(userFromLocalStorage);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1 container-centered">
              <img src={user?.image} alt="User Profile" className="user-img" />
              <h4 style={{color:"white"}} className="username">{user?.username}</h4>
              <p style={{color:"white"}} className="bio">{user?.bio}</p>

              <Link
                to="/setting"
                className="btn btn-sm btn-outline-secondary action-btn"
              >
                <GearFill />
                Edit Profile Setting
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="#/my-articles">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/favorited-articles">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
