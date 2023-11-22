import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../assets/css/posts.module.css'
import FeedDetail from './FeedDetail';

function GlobalFeeds() {
    const [feeds, setFeeds] = useState([]);
    const [countfeeds, setCountFeeds] = useState(0);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        getGlobalFeeds();
        getCountGlobalFeeds();
    }, [])

    const getGlobalFeeds = async () => {
        const data = await axios.get('https://api.realworld.io/api/articles?offset=10&limit=10');
        setFeeds(data.data.articles);
    }
    const getCountGlobalFeeds = async () => {
        const data = await axios.get('https://api.realworld.io/api/articles?offset=10&limit=20');
        setCountFeeds(data.data.articles.articlesCount);
    }

    const displayDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
    }
    console.log(feeds);

    const openModal = async (slug) => {
        try {
          const response = await axios.get(`https://api.realworld.io/api/articles/${slug}`);
          setSelectedFeed(response.data.article);
          setShowModal(true);
        } catch (error) {
          console.error('Error fetching article details:', error);
        }
      };

    
    
    return (
        <>
            {
                feeds.length !== 0 && feeds.map((feed, index) => {
                    return(
                        <div className={styles.posts} key={index}>
                            <div className={styles.authors}>
                                <div className={styles.avartarPost}>
                                    <img src={feed.author.image
                                    } alt='error'/>
                                </div>
                                <div className={styles.authorProfile}>
                                    <p className={styles.name}>{feed.author.username}</p>
                                    <p className={styles.createdat}>{displayDate(feed.createdAt)}</p>
                                </div>
                            </div>
                            <div className={styles.contents}>

                                <p className={styles.title}>{feed.title}</p>
                                <p className={styles.description}>{feed.description}</p>
                                <p onClick={() => openModal(feed.slug)} className={styles.readmore}>Readmore...</p>
                               
                            </div>  
                            <div className={styles.followed}>
                                <p><i class="fa fa-heart" aria-hidden="true"></i> {feed.favoritesCount}</p>
                            </div>
                            <div className={styles.postbuttons}>
                                <div><span><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Like</span></div>
                                <div><span><i class="fa fa-comment-o" aria-hidden="true"></i> Comment</span></div>
                            </div>
                        </div>
                    )
                    
                })
                
            }
            <FeedDetail
                    selectedFeed={selectedFeed}
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            </>
          
    )
}



export default GlobalFeeds
