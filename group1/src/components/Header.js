import React from 'react'
import styles from '../assets/css/header.module.css'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
function Header() {
    return (
        <header className={styles.header}>
        <NavLink to={`/`}>
            <div  className={styles.header1}>
                <img src={logo} alt='error' />
                <h2>Fabook</h2>
            </div>

        </NavLink>
            

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
        </header>
    )
}

export default Header
