import { useEffect, useState } from 'react'
import styles from '../assets/css/home.module.css'
import logo from '../assets/images/logo.png'
import Feeds from './Feeds'
import Tags from './Tags'
import { useSelector } from 'react-redux'
import NewPost from './NewPost'
import { useNavigate, useParams } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

// import Tags from '.Tags'
function Home() {
    const loginState = useSelector(state => state.login.value);
    const navChange = useSelector((state) => state.nav.value)
    const [api, setApi] = useState('https://api.realworld.io/api/articles?limit=10');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const nav = useNavigate();
    const { page } = useParams();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })
    const handleShow = () => {
        if (loginState === false) {
            nav('/sign_in')
        } else
            setShow(true);
    };
    const [change, setChange] = useState(true);
    useEffect(() => {
        if (page === 'globalfeed') {
            setApi('https://api.realworld.io/api/articles?limit=10');
        } else if (page === 'yourfeed') {
            setApi('https://api.realworld.io/api/articles/feed?limit=10')
        }
    }, [navChange])
    useEffect(() => {
        if (page === 'globalfeed') {
            setApi('https://api.realworld.io/api/articles?limit=10');
        } else if (page === 'yourfeed') {
            setApi('https://api.realworld.io/api/articles/feed?limit=10')
        }
    }, [])
    useEffect(() => {
        setApi('https://api.realworld.io/api/articles?limit=10');
        setChange(!change);
    }, [loginState])
    return (
        <div className='container'>
            <div className='row'>
                {
                    isDesktopOrLaptop && (
                        <div className={`col-xl-3 ${styles.home1}`}>
                            <div className={`${styles.feeds} row`}
                                onClick={() => setApi('https://api.realworld.io/api/articles?limit=10')}>
                                <div className='col-2'>
                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                </div>
                                <div className='col-10'>
                                    <p>Global Feed</p>
                                </div>
                            </div>
                            {
                                loginState === true && (
                                    <div className={`${styles.feeds} row`}
                                        onClick={() => setApi('https://api.realworld.io/api/articles/feed?limit=10')}>
                                        <div className='col-2'>
                                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                                        </div>
                                        <div className='col-10'>
                                            <p>Your Feeds</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    )
                }
                <div className={`col-xl-6 col-lg-12 ${styles.home2}`}>
                    <div className={`${styles.newpost}`}>
                        <div className={styles.avartar}>
                            <img src={logo} alt='error' />
                        </div>
                        <div className={styles.createbutton} onClick={handleShow}>
                            <span>Create a new article</span>
                        </div>
                    </div>
                    <Feeds api={api} changes={change}></Feeds>
                </div>
                {
                    isDesktopOrLaptop && (
                        <div className={`col-xl-3 ${styles.home3}`}>
                            <Tags></Tags>
                        </div>
                    )
                }

            </div>
            <NewPost show={show} handleClose={handleClose} handleShow={handleShow}></NewPost>
        </div>
    )
}

export default Home
