import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import styles from '../assets/css/posts.module.css'


function FeedDetail({ selectedFeed, showModal, setShowModal }) {

    const [comment, setComment] = useState('');

    const displayDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
    }

    const handleComment = () => {
        // Thực hiện các thao tác cần thiết để lưu comment, chẳng hạn gọi API để lưu comment
        // Sau khi lưu thành công, có thể cập nhật danh sách comment và làm sạch trường nhập comment.
        // Ví dụ:
        // saveCommentToAPI(selectedFeed.id, comment);
        // fetchCommentsForFeed(selectedFeed.id);
        setComment('');
      };
    return (
        <>
            <Modal  show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header  closeButton>
                    {/* <Modal.Title>{selectedFeed && selectedFeed.title}</Modal.Title> */}
                    <Modal.Title className='container' >
                        <div >
                            <div className='col-12'>
                                <div>
                                    Bài viết của {selectedFeed && selectedFeed.author.username}
                                </div>

                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {selectedFeed && (
                            <div className='container'>
                            <div className='row' style={{marginLeft:'5px'}}>
                            <div className='col-4'>
                                <div className='row'>
                                        <div className='col-3' style={{paddingTop:'15px'}}>
                            <p >
                                <img className='rounded-circle' style={{scale:'200%'}} src={selectedFeed.author.image} alt='error'/>
                            </p> 

                                        </div>
                                        <div className='col-9' style={{fontWeight:'bold',}}>
                                        <span>{selectedFeed.author.username} </span>
                            <div> <span style={{fontWeight:'lighter'}}>{displayDate(selectedFeed.createdAt)}</span></div>
                                        </div>
                                </div>
                            </div>
                            </div>
                                <h3 style={{ marginBottom: '40px', marginTop: '20px', fontStyle:'italic' }}>{selectedFeed.title}</h3>
                                <div className='border border-secondary ' style={{borderRadius:'5px', marginBottom:'10px', padding:'10px 10px 1px 9px'}}>
                                <p >{selectedFeed.body}</p>
                                    
                                </div>
                                <div>
                        {selectedFeed.tagList && selectedFeed.tagList.map((tag, index) => (
                            <span key={index} className='badge badge-info' style={{ marginRight: '5px' }}>
                                {`#${tag}`}
                            </span>
                        ))}
                    </div>

                    <div className={styles.followed}>
                                <p><i className="fa fa-heart" aria-hidden="true"></i> {selectedFeed.favoritesCount}</p>
                            </div>
                            </div>

                        )}
                        <div className='container' style={{marginTop:'20px'}}>
                        <div className='col-12' >
                            <Button className='col-6' variant="outline-secondary" onClick={() => setShowModal(false)}>
                            <span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Like</span>
                            </Button>
                            
                            <Button className='col-6' variant="outline-secondary" onClick={handleComment}>
                            <span><i className="fa fa-comment-o" aria-hidden="true"></i> Comment</span>
                            </Button>
                            <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="comment..."
                    rows="4"
                />
                        </div>
                            
                        </div>

                    </>

                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>



    )
}

export default FeedDetail