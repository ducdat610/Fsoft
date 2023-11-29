import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../assets/css/detail.module.css';
import Feeds from './Feeds';
import { Link } from 'react-router-dom';

function ViewMyFavoritedArticles() {
  // const [savedArticles, setSavedArticles] = useState([]);
  const [user, setUser] = useState(null);

  const api = "https://api.realworld.io/api";

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }
  }, []);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        if (user) {
          const config = {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          }
          const response = await axios.get(`${api}/articles?favorited=${user.username}`, config);
          // setSavedArticles(response.data.articles.length);
        }
      } catch (error) {
        console.error('Error fetching saved articles:', error);
      }
    };

    fetchSavedArticles();
  }, [user]);

  return (
    <>
      <div className='row'>
        <div className={`col-3 ${styles.home1}`}>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div className={`col-10 ${styles.btn}`}>
              <Link to="/my_articles" className="text-primary">
                My Articles
              </Link>
            </div>
          </div>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <div className={`col-10 ${styles.btn}`}>
              <Link to="/favorited_articles" className="text-primary">
                Favorited Articles
              </Link>
            </div>
          </div>
        </div>
        <div className={`col-6 ${styles.home2}`}>
          {/* <div className={styles.tagIdea2}>
            <p>{savedArticles} Bài viết đã thích</p>
          </div> */}
          <div className={styles.viewtag}>
            {userData && (
              <div className={styles.userInfo}>
                <img src={userData.image} alt="User Avatar" className={styles.avatar} />
                <h3>{userData.username}</h3>
              </div>

            )}
          </div>
          {user && <Feeds api={`${api}/articles?favorited=${user.username}`}></Feeds>}
        </div>
        <div className={`col-3 ${styles.home3}`}>
        </div>
      </div>
    </>
  );
}

export default ViewMyFavoritedArticles;
