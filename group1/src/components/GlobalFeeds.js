import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../assets/css/posts.module.css'
import FeedDetail from './FeedDetail';
import {Link} from 'react-router-dom'
function GlobalFeeds() {
    const [feeds, setFeeds] = useState([]);
    const [countfeeds, setCountFeeds] = useState(0);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [offset, setOffSet] = useState(0);
    const [pageBtn, setPageBtn] = useState([])
    useEffect(() => {
        getGlobalFeeds(0);
    }, [])

    useEffect(() => {
        getGlobalFeeds(1);
        document.documentElement.scrollTop = 0;
        let countPage = Math.floor(countfeeds / 10);
        countfeeds % 10 !== 0 ? countPage++ : countPage = countPage + 0;
        if (offset === 0) {
            countfeeds % 10 !== 0 ? countPage++ : countPage = countPage + 0;
            if (countPage >= 4) {
                setPageBtn([1, 2, 3, 4]);
            } else {
                const newArr = [];
                for (let i = 1; i <= countPage; i++) {
                    newArr.push(i);
                }
            }
        }
        else if ((offset / 10) + 1 === countPage) {
            const newArr = [];
            if (countPage >= 4) {
                for (let i = countPage - 4; i <= countPage; i++) {
                    newArr.push(i);
                }
                setPageBtn(newArr);
            }
            else {
                setPageBtn([1, 2, 3, 4]);
            }
        } else {
            const newArr = [];
            for (let j = (offset / 10); j <= (offset / 10 + 2); j++) {
                newArr.push(j);
            }
            setPageBtn(newArr);
        }
    }, [offset])
    const getGlobalFeeds = async (status) => {
        const data = await axios.get(`https://api.realworld.io/api/articles?offset=${offset}&limit=10`);
        setFeeds(data.data.articles);
        if (status === 0) {
            let count = data.data.articlesCount;
            setCountFeeds(count);
            let countPage = Math.floor(count / 10);
            count % 10 !== 0 ? countPage++ : countPage = countPage + 0;
            console.log(countPage);
            if (countPage >= 4) {
                setPageBtn([1, 2, 3, 4]);
            } else {
                const newArr = [];
                for (let i = 1; i <= countPage; i++) {
                    newArr.push(i);
                }
                if (count % 10 !== 0) {
                    newArr.push(newArr.length + 1);
                }
            }
        }
    }
    // const getCountGlobalFeeds = async () => {
    //     const data = await axios.get(`https://api.realworld.io/api/articles?offset=10&limit=20`);
    //     setCountFeeds(data.data.articles.articlesCount);
    // }

    const displayDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
    }
    console.log(pageBtn);

    const openModal = async (slug) => {
        try {
            const response = await axios.get(`https://api.realworld.io/api/articles/${slug}`);
            setSelectedFeed(response.data.article);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching article details:', error);
        }
    };

    const handleSetPagging = (index) => {
        if (offset / 10 !== Number(index - 1)) {
            setOffSet((index - 1) * 10);
        }
    }

    return (
        <>
            {
                feeds.length !== 0 && feeds.map((feed, index) => {
                    return (
                        <div className={styles.posts} key={index}>
                            <div className={styles.authors}>
                                <div className={styles.avartarPost}>
                                    <img src={feed.author.image
                                    } alt='error' />
                                </div>
                                <div className={styles.authorProfile}>
                                    <p className={styles.name}>{feed.author.username}</p>
                                    <p className={styles.createdat}>{displayDate(feed.createdAt)}</p>
                                </div>
                            </div>
                            {
                                feed.tagList.length !== 0 && (
                                    <p>
                                        {
                                            feed.tagList.map((tag) => {
                                                return (
                                                    <span style={{marginRight:"7px"}}><Link>#{tag}</Link></span>
                                                )
                                            })
                                        }
                                    </p>
                                )
                            }
                            <div className={styles.contents}>

                                <p className={styles.title}>{feed.title}</p>
                                <p className={styles.description}>{feed.description}</p>
                                <p onClick={() => openModal(feed.slug)} className={styles.readmore}>Readmore...</p>

                            </div>
                            <div className={styles.followed}>
                                <p><i className="fa fa-heart" aria-hidden="true"></i> {feed.favoritesCount}</p>
                            </div>
                            <div className={styles.postbuttons}>
                                <div><span><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> Like</span></div>
                                <div onClick={() => openModal(feed.slug)}><span><i class="fa fa-comment-o" aria-hidden="true"></i> Comment</span></div>

                            </div>
                        </div>
                    )

                })

            }
            <div className={styles.pagging}>
                {offset !== 0 && (
                    <div className={styles.pagebtn} onClick={() => handleSetPagging(offset / 10)}>
                        <span><i className="fa fa-angle-left" aria-hidden="true"></i></span>
                    </div>
                )}
                {
                    pageBtn.length !== 0 && pageBtn.map((btn) => {
                        return (
                            <div className={`${offset / 10 + 1 === btn ? styles.pageChoosed : styles.pagebtn}`} key={btn} onClick={() => handleSetPagging(btn)}>
                                <span>{btn}</span>
                            </div>
                        )
                    })
                }
                {
                    countfeeds - offset > 10 && (
                        <div className={styles.pagebtn} onClick={() => handleSetPagging(offset / 10 + 2)}>
                            <span><i className="fa fa-angle-right" aria-hidden="true"></i></span>
                        </div>
                    )
                }
            </div>
            <FeedDetail
                selectedFeed={selectedFeed}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </>

    )
}



export default GlobalFeeds
