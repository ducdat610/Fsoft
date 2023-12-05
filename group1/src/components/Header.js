import React, { useEffect, useState } from 'react'
import styles from '../assets/css/header.module.css'
import logo from '../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/login/loginSlice'

function Header() {
    const loginState = useSelector(state => state.login.value)
    const nav = useNavigate();
    const dispatch = useDispatch()
    const [user, setUser] = useState();
    useEffect(() => {
        const userls = localStorage.getItem('user');
        if (userls) {
            let userObj = JSON.parse(userls);
            setUser(userObj);
            dispatch(login());
        }
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
    console.log(user);
    return (
        <div className='container-fluid'>
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
                    <div className={`${styles.header2} ${styles.logged}`}>
                        <img src={user !== undefined ? user.image : ""} alt='error' />
                        <p>{user !== undefined ? user.username : ""}</p>
                        <div className={styles.linkbox}>
                            <ul>
                                <li>
                                    <Link to={`/my_articles/${user?user.username:""}`} className={styles.primary}>
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
                )
            }

        </header>
        </div>
        
    )
}

export default Header
