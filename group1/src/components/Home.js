import styles from '../assets/css/home.module.css'
import logo from '../assets/images/logo.png'
import GlobalFeeds from './GlobalFeeds'

function Home() {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className={`col-3 ${styles.home1}`}>
                    <div className={`${styles.feeds} row`}>
                        <div className='col-2'>
                            <i className="fa fa-globe" aria-hidden="true"></i>
                        </div>
                        <div className='col-10'>
                            <p>Global Feed</p>
                        </div>
                    </div>
                    <div className={`${styles.feeds} row`}>
                        <div className='col-2'>
                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                        </div>
                        <div className='col-10'>
                            <p>Followers Feed</p>
                        </div>
                    </div>
                </div>
                <div className={`col-6 ${styles.home2}`}>
                    <div className={`${styles.newpost}`}>
                        <div className={styles.avartar}>
                            <img src={logo} alt='error' />
                        </div>
                        <div className={styles.createbutton}>
                            <span>Khai oi ban nghi gi the</span>
                        </div>
                    </div>
                    <GlobalFeeds></GlobalFeeds>
                </div>
                <div className={`col-3 ${styles.home3}`}>
                    
                </div>
            </div>
        </div>
    )
}

export default Home
