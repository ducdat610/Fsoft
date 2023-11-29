import React, { useEffect, useState } from 'react'
import styles from '../assets/css/header.module.css'
import logo from '../assets/images/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../features/login/loginSlice'

function Header() {
    const loginState = useSelector(state => state.login.value)
    const dispatch = useDispatch();
    const nav = useNavigate();
    // const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState();
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            let userObj = JSON.parse(user);
            setUser(userObj);
            dispatch(login());
        }
    }, [])
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            let userObj = JSON.parse(user);
            console.log(userObj);
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
        <header className={styles.header}>
            <NavLink to={`/`}>
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
                                    <Link to="/my_articles" className="text-primary">
                                        My Profile
                                    </Link>
                                </li>
                                <li onClick={handleLogOut}><Link to={"/#"}> Log out</Link></li>
                            </ul>
                        </div>
                    </div>
                )
            }

        </header>
    )
}

export default Header
