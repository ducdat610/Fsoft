import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/css/detail.module.css';
import Feeds from './Feeds';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
function ViewMyArticles() {
  const [author, setAuthor] = useState(null);

  const userData = JSON.parse(localStorage.getItem('user')) || [];
  const { username } = useParams();
  const [follow, setFollow] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`https://api.realworld.io/api/profiles/${username}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        setAuthor(response.data);
        setFollow(response.data.profile.following);
      }).catch((error) => {
        console.log(error)
      })
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`https://api.realworld.io/api/profiles/${username}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        setAuthor(response.data);
        setFollow(response.data.profile.following);

      }).catch((error) => {
        console.log(error)
      })

  }, [username])

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      setFollow(!follow)
    } catch (error) {
      console.log(error);
    }

  }
  const handleUnfollow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      setFollow(!follow)
    } catch (error) {
      console.log(error);
    }
  }
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  return (
    <>
      <div className='row'>
        {isDesktopOrLaptop && (<div className={`col-xl-3 ${styles.home1}`}>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div className='col-10'>
              {author && (<Link to={`/my_articles/${author.profile.username}`} className={styles.primary}>
                My Articles
              </Link>)}
            </div>
          </div>
          <div className={`${styles.feeds} row`}>
            <div className='col-2'>
              <i className="fa fa-user-circle" aria-hidden="true"></i>
            </div>
            <div className='col-10'>
              {author && (<Link to={`/favorited_articles/${author.profile.username}`}>
                Favorited Articles
              </Link>)}
            </div>
          </div>
        </div>)}
        <div className={`col-xl-6 col-lg-12 ${styles.home2}`}>
          <div className={styles.viewtag}>
            {author && (
              <div className={styles.userInfo}>
                <img src={author.profile.image} alt="User Avatar" className={styles.avatar} />
                <h3>{author.profile.username}</h3>
                {!isDesktopOrLaptop && (<Link to={`/my_articles/${author.profile.username}`}>
                  {author.profile.username} Articles
                </Link>)}
                {
                  author.profile.username !== userData.username && (<div className={styles.flo}>
                    {follow === false && (<button onClick={handleFollow} >+ Follow</button>)}
                    {follow === true && (<button onClick={handleUnfollow} >- Unfollow</button>)}
                  </div>)
                }
              </div>
            )}
          </div>
          {author && <Feeds api={`https://api.realworld.io/api/articles?favorited=${author.profile.username}&?limit=10`}></Feeds>}
        </div>
        {isDesktopOrLaptop && (<div className={`col-xl-3 ${styles.home3}`}>
        </div>)}
      </div>

    </>
  );
}

export default ViewMyArticles;