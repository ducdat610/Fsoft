import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../assets/css/detail.module.css'
import Feeds from './Feeds';
function TagDetail() {
  const { tag } = useParams();
  const [postCount, setPostCount] = useState(0);

  const api = "https://api.realworld.io/api";

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token ){
      axios.get(`${api}/articles?tag=${tag}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((response) => {
          setPostCount(response.data.articlesCount);
  
        }).catch((error) => {
          console.log(error)
        })
    }else{
      axios.get(`${api}/articles?tag=${tag}`)
        .then((response) => {
          setPostCount(response.data.articlesCount);
  
        }).catch((error) => {
          console.log(error)
        })
    }
    

  }, [tag])
  console.log(postCount)
  return (
    <>
      <div className={styles.tagIdea}>
        <h2>#{tag}</h2>
        <p>{postCount} Bài viết</p>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-xl-8 col-lg-12'>
            <Feeds api={`${api}/articles?tag=${tag}`}></Feeds>
          </div>
          <div className='col-2'></div>
        </div>
      </div>

    </>

  )
}

export default TagDetail;