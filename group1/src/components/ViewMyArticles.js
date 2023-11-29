import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/css/detail.module.css';
import Feeds from './Feeds';
import { Link } from 'react-router-dom';

function ViewMyArticles() {
  // const [postCount2, setPostCount2] = useState(0);
  const [user, setUser] = useState(null);
  const userData = JSON.parse(localStorage.getItem('user')) || [];
  const api = "https://api.realworld.io/api";

  // console.log('Start')
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const fetchUserArticles = async () => {
      try {
        if (userData) {
          const config = {
            headers: {
              'Authorization': `Bearer ${userData.token}`
            }
          }
          const response = await axios.get(`${api}/articles?author=${userData.username}`, config);
          // console.log(response.data.articles);
          // setPostCount2(response.data.articles.length);
        }
      } catch (error) {
        console.error('Error fetching user articles:', error);
      }
    };

    fetchUserArticles();
  }, [api]);


  return (
    <>
      <div className='row'>
        <div className={`col-3 ${styles.home1}`}>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div className='col-10'>
              <Link to="/my_articles" className="text-primary">
                My Articles
              </Link>
            </div>
          </div>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <div className='col-10'>
              <Link to="/favorited_articles" className="text-primary">
                Favorited Articles
              </Link>
            </div>
          </div>
        </div>
        <div className={`col-6 ${styles.home2}`}>
          {/* <div className={styles.tagIdea2}>
            <p>{postCount2} Bài viết</p>
          </div> */}
          <div className={styles.viewtag}>
            {userData && (
              <div className={styles.userInfo}>
                <img src={userData.image} alt="User Avatar" className={styles.avatar} />
                <h3>{userData.username}</h3>
              </div>

            )}
          </div>
          {user && <Feeds api={`${api}/articles?author=${user.username}`}></Feeds>}
        </div>
        <div className={`col-3 ${styles.home3}`}>
        </div>
      </div>

    </>
  );
}

export default ViewMyArticles;
