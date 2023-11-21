import React from 'react'
import styles from '../assets/css/header.module.css'
import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'
function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header1}>
                <img src={logo} alt='error' />
                <h2>Fabook</h2>
            </div>

            <div className={styles.header2}>
                <NavLink to='/'>
                    Home
                </NavLink>
                <NavLink to='/haha'>
                    Sign in
                </NavLink>
                <NavLink to='/kaka'>
                    Sign up
                </NavLink>
            </div>
        </header>
    )
}

export default Header
