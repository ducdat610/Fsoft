import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../assets/css/posts.module.css'
import FeedDetail from './FeedDetail';
import { Link } from 'react-router-dom'
import EditPost from './EditPost'
import { useSelector } from 'react-redux'

function Feeds(props) {
    const loginState = useSelector(state => state.login.value);

    const [feeds, setFeeds] = useState([]);
    const [countfeeds, setCountFeeds] = useState(0);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [offset, setOffSet] = useState(0);
    const [pageBtn, setPageBtn] = useState([]);
    const [change, setChange] = useState(true);
    const [loading, setLoading] = useState(1);
    const [author, setAuthor] = useState({ username: "", image: "" });

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setLoading(1);
    }
    const handleShow = () => {
        setShow(true);
    }
    const [editArticle, setEditArticle] = useState(null);
    useEffect(() => {
        getGlobalFeeds();
        setLoading(2);
        const user = localStorage.getItem('user');
        if (user) {
            setAuthor(JSON.parse(user));
        }
    }, [])

    useEffect(() => {
        if (editArticle) {
            handleShow();
        }
    }, [editArticle])
    useEffect(() => {
        if (offset !== 0) {
            setOffSet(0);
        }
        else {
            setLoading(1);
        }
    }, [props.changes, props.api])

    useEffect(() => {
        setLoading(1);
    }, [offset])

    useEffect(() => {
        if (loading === 1) {
            getGlobalFeeds();
            document.documentElement.scrollTop = 0;
        }
    }, [loading])
    const getGlobalFeeds = async () => {
        const token = localStorage.getItem('token');
        let link = props.api + `&offset=${offset}`
        let data;
        if (token) {
            data = await axios.get(link, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        }
        else {
            data = await axios.get(link);
        }
        setFeeds(data.data.articles);
        setLoading(2);
        let count = data.data.articlesCount;
        setCountFeeds(count);
        let countPage = Math.floor(count / 10);
        count % 10 !== 0 ? countPage++ : countPage = countPage + 0;
        if (offset === 0) {
            if (countPage >= 4) {
                setPageBtn([1, 2, 3, 4]);
            } else {
                const newArr = [];
                for (let i = 1; i <= countPage; i++) {
                    newArr.push(i);
                }
                setPageBtn(newArr)
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
                const newArr = [];
                for (let i = 1; i <= countPage; i++) {
                    newArr.push(i);
                }
                setPageBtn(newArr)
            }
        } else {
            const newArr = [];
            for (let j = (offset / 10); j <= (offset / 10 + 2); j++) {
                newArr.push(j);
            }
            setPageBtn(newArr);
        }
    }

    const displayDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
    }

    const openModal = async (slug, index) => {
        try {
            const token = localStorage.getItem('token');
            var response;
            if(loginState){
            response = await axios.get(`https://api.realworld.io/api/articles/${slug}`,{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            }else{
                response = await axios.get(`https://api.realworld.io/api/articles/${slug}`)
            }
            

            
            setSelectedFeed({...response.data.article,index:index});

            console.log(setSelectedFeed)
            setShowModal(true);

        } catch (error) {
            console.error('Error fetching article details:', error);
        }
        console.log(index)
    };

    const handleSetPagging = (index) => {
        if (offset / 10 !== Number(index - 1)) {
            setOffSet((index - 1) * 10);
        }
    }
    const handleLike = async (slug, index, favorite, type=0) => {
        console.log(123)
        try {
            const token = localStorage.getItem('token');
            if (favorite) {
                const response = await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
                );
                feeds[index].favorited = response.data.article.favorited;
                feeds[index].favoritesCount = response.data.article.favoritesCount;
                console.log(response.data.article)
                if(type!=0){
                    setSelectedFeed({...response.data.article,index:index})
                }
                setChange(!change);
            }
            else {
                const response = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`, {}, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                feeds[index].favorited = response.data.article.favorited;
                feeds[index].favoritesCount = response.data.article.favoritesCount;
                console.log(response.data.article)

                if(type!=0){
                    setSelectedFeed({...response.data.article,index:index})

                }
                setChange(!change);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteFeed = async (slug) => {
        const token = localStorage.getItem('token');
        console.log(slug);
        try {
            await axios.delete(`https://api.realworld.io/api/articles/${slug}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setLoading(1);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            {loading === 1 && <div id={styles.loader}></div>}

            {loading === 2 && (
                <div>
                    {
                        feeds.length !== 0 && feeds.map((feed, index) => {
                            return (
                                <div className={styles.posts} key={index}>
                                    <div className={styles.authors}>
                                        <div className={styles.infor}>
                                            <div className={styles.avartarPost} >
                                                <img src={feed.author.image
                                                }  alt='error' />
                                            </div>
                                            <div className={styles.authorProfile}>
                                                <Link  to={loginState? `/my_articles/${feed.author.username}`:'/'} className={styles.link1}> <p className={styles.name}>{feed.author.username}</p>
                                                </Link>
                                                <p className={styles.createdat}>{displayDate(feed.createdAt)}</p>
                                            </div>
                                        </div>
                                        {author !== "" && feed.author.username === author.username && (
                                            <div className={styles.actions}>
                                                <button
                                                    onClick={() => setEditArticle(feed)}
                                                ><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                                                <button
                                                    onClick={() => handleDeleteFeed(feed.slug)}
                                                ><i className="fa fa-trash" aria-hidden="true"></i></button>
                                            </div>
                                        )}

                                    </div>
                                    {
                                        feed.tagList.length !== 0 && (
                                            <p>
                                                {
                                                    feed.tagList.map((tag, index) => {
                                                        return (
                                                            <span style={{ marginRight: "7px" }} key={index}><Link to={`/tag/${tag}`}>#{tag}</Link></span>
                                                        )
                                                    })
                                                }
                                            </p>
                                        )
                                    }
                                    <div className={styles.contents}>

                                        <p className={styles.title}>{feed.title}</p>
                                        <p className={styles.description}>{feed.description}</p>
                                        <p onClick={() => openModal(feed.slug,index)} className={styles.readmore}>Read more...</p>

                                    </div>
                                    <div className={styles.followed}>
                                        <p><i className="fa fa-heart" aria-hidden="true"></i> {feed.favoritesCount}</p>
                                    </div>
                                    <div className={styles.postbuttons}>
                                        <div className={`${feed.favorited === true ? styles.liked : ""}`}
                                            onClick={() => handleLike(feed.slug, index, feed.favorited)}>
                                            <span><i className="fa fa-thumbs-up" aria-hidden="true"></i> Like</span>
                                        </div>
                                        <div onClick={() => openModal(feed.slug, index)}><span><i className="fa fa-comment-o" aria-hidden="true"></i> Comment</span></div>

                                    </div>
                                </div>
                            )

                        })

                    }
                </div>
            )}
            <div className={styles.pagging}>
                {offset !== 0 && (
                    <div className={styles.pagebtn} onClick={() => handleSetPagging(offset / 10)}>
                        <span><i className="fa fa-angle-left" aria-hidden="true"></i></span>
                    </div>
                )}
                {
                    pageBtn.length !== 0 && pageBtn.map((btn) => {
                        return (
                            <div className={`${offset / 10 + 1 === btn ? styles.pageChoosed : styles.pagebtn}`}
                                key={btn} onClick={() => handleSetPagging(btn)}>
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
            {loading !== 1 && feeds.length===0 && <p style={{color:"white"}}>No articles are here... yet.</p>}
            <EditPost show={show} handleClose={handleClose} Article={editArticle}></EditPost>
            <FeedDetail
                selectedFeed={selectedFeed}
                showModal={showModal}
                setShowModal={setShowModal}
                handleLike={handleLike}
                
            />
        </>

    )
}



export default Feeds



