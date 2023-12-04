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
    const fetchArticlesByTag = async () => {
      try {
        const response = await axios.get(`${api}/articles?tag=${tag}`);
        if (response.status === 200) {
         
          setPostCount(response.data.articlesCount);
        } else {
          throw new Error('Failed to fetch articles');
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticlesByTag();
    }, [tag]);
    return (
        <> 
            <div className={styles.tagIdea}>
                <h2>#{tag}</h2>
                <p>{postCount} Bài viết</p>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                    <Feeds api={`${api}/articles?tag=${tag}`}></Feeds>
                    </div>
                    <div className='col-2'></div>
                </div>
            </div>
            
        </>

    )
}

export default TagDetail;



