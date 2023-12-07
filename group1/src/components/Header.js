import React, { useEffect, useRef, useState } from 'react'
import styles from '../assets/css/header.module.css'
import logo from '../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/login/loginSlice'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import { isChange } from '../features/login/navSlice'
function Header() {
    const loginState = useSelector(state => state.login.value);
    const navChange = useSelector((state) => state.nav.value)
    const nav = useNavigate();
    const dispatch = useDispatch()
    const [user, setUser] = useState();
    const [tags, setTags] = useState();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const isTable = useMediaQuery({ query: '(max-width: 1224px )' })
    const linkbox = useRef();
    const boxNav = useRef();
    const boxTag = useRef();
    
    useEffect(() => {
        const userls = localStorage.getItem('user');
        if (userls) {
            let userObj = JSON.parse(userls);
            setUser(userObj);
            dispatch(login());
        }
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.realworld.io/api/tags");
                if (response.status === 200) {
                    setTags(response.data.tags);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [])
    useEffect(() => {
        const userls = localStorage.getItem('user');
        if (userls) {
            let userObj = JSON.parse(userls);
            setUser(userObj);
        }
    }, [loginState])
    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout())
        nav('/');
    }
    const displayLinkBox = (e) => {
        if (linkbox.current.style.display === undefined || linkbox.current.style.display === 'none') {
            linkbox.current.style.display = 'block';
        } else {
            linkbox.current.style.display = 'none';
        }
    }
    const hiddenNav = (e) => {
        linkbox.current.style.display = 'none';
    }

    const displayTags = (e) => {
        e.stopPropagation();
        boxNav.current.style.display = "none";
        boxTag.current.style.display = "block";
    }
    const hiddenTag = (e) => {
        e.stopPropagation();
        boxTag.current.style.display = "none";
        boxNav.current.style.display = "block";
    }
    const hideBoxTag = (e) => {
        e.stopPropagation();
        linkbox.current.style.display = "none"
        boxTag.current.style.display = "none";
        boxNav.current.style.display = "block";
    }
    console.log(linkbox);
    return (
        <div className='container-fluid' style={{ padding: "0" }}>
            <header className={styles.header}>
                <NavLink to={`/`} className={styles.header11}>
                    <div className={styles.header1}>
                        <img src={logo} alt='error' />
                        <h2>Fabook</h2>
                    </div>
                </NavLink>
                {
                    loginState === false ? (
                        <div className={styles.header2}>
                            <NavLink to='/'>
                                Home
                            </NavLink>
                            <NavLink to='/sign_in'>
                                Sign in
                            </NavLink>
                            <NavLink to='/sign_up'>
                                Sign up
                            </NavLink>
                        </div>
                    ) : (
                        <>{
                            isDesktopOrLaptop && <div className={`${styles.header2} ${styles.logged}`}>
                                <img src={user !== undefined ? user.image : ""} alt='error' />
                                <p>{user !== undefined ? user.username : ""}</p>
                                <div className={styles.linkbox}>
                                    <ul>
                                        <li>
                                            <Link to={`/my_articles/${user ? user.username : ""}`} className={styles.primary}>
                                                My Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/setting`} className={styles.primary}>
                                                Edit Profile
                                            </Link>
                                        </li>
                                        <li onClick={handleLogOut}>Log out</li>
                                    </ul>
                                </div>
                            </div>
                        }
                            {
                                isTable && <div className={`${styles.header2} ${styles.logged}`}
                                >
                                    <img src={user !== undefined ? user.image : ""} alt='error' onClick={displayLinkBox} />
                                    <div className={styles.linkboxmobile} ref={linkbox}>
                                        <div className={`${styles.box1}`} ref={boxNav}>
                                            <div className={`${styles['user-info']}`} >
                                                <img src={user !== undefined ? user.image : ""} alt='error' />
                                                <p>{user !== undefined ? user.username : ""}</p>
                                            </div>
                                            <ul onClick={hiddenNav}>
                                                <li>
                                                    <Link to={`/globalfeed`} className={styles.primary} onClick={() => dispatch(isChange(!navChange))}>
                                                        <div className={styles.icons}> <i class="fa fa-globe" aria-hidden="true"></i></div>
                                                        <span>Global Feed</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/yourfeed`} className={styles.primary} onClick={() => dispatch(isChange(!navChange))}>
                                                        <div className={styles.icons}> <i class="fa fa-check-square-o" aria-hidden="true"></i></div>
                                                        <span>Your Feed</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/my_articles/${user ? user.username : ""}`} className={styles.primary}>
                                                        <div className={styles.icons}> <i class="fa fa-pencil" aria-hidden="true"></i></div>
                                                        <span>My Article</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/favorited_articles/${user ? user.username : ""}`} className={styles.primary}>
                                                        <div className={styles.icons}> <i class="fa fa-heart" aria-hidden="true"></i></div>
                                                        <span>Favorited Article</span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className={styles.primary} onClick={displayTags}>
                                                        <div className={styles.icons}><i class="fa fa-hashtag" aria-hidden="true"></i></div>
                                                        <span>Popular Tags <i class="fa fa-angle-right" aria-hidden="true" style={{ marginLeft: "120px", fontSize: "20px" }}></i></span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`/setting`} className={styles.primary}>
                                                        <div className={styles.icons}>  <i className="fa fa-cog" aria-hidden="true"></i></div>
                                                        <span>Edit Profile</span>
                                                    </Link>
                                                </li>
                                                <li onClick={handleLogOut}>
                                                    <div className={styles.icons}><i class="fa fa-sign-out" aria-hidden="true"></i></div>
                                                    <span>Log out</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div ref={boxTag} style={{ display: "none", maxHeight: "400px", overflow: "auto" }}>
                                            <div className={`${styles['user-info']}`} onClick={hiddenTag}>
                                                <i class="fa fa-arrow-left" aria-hidden="true"></i>
                                                <span>Popular Tags</span>
                                            </div>
                                            <ul>
                                                {tags && tags.map((tag, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={`/tag/${tag}`} className={styles.primary} onClick={hideBoxTag}>
                                                                <div className={styles.icons}>  {index + 1}</div>
                                                                <span>{tag}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    )
                }

            </header>
        </div>

    )
}

export default Header
