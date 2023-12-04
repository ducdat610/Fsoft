import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react'
import styles from '../assets/css/posts.module.css'
import axios from 'axios';
import { Link } from 'react-router-dom';


function FeedDetail({ selectedFeed, showModal, setShowModal, handleLike }) {

    const [comments, setComments] = useState('');
    const [commentContent, setCommentContent] = useState('');



    const displayDate = (time) => {
        const date = new Date(time);
        return `${date.getMonth()} - ${date.getDate()} - ${date.getFullYear()}`
    }

    const getComments = async (slug) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            setComments(response.data.comments);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu comment:', error);
        }
    };




    const addComment = async (slug, comment) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `https://api.realworld.io/api/articles/${slug}/comments`,
                { comment: { body: comment } },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            setComments(prevComments => [
                ...prevComments,
                { body: comment }
            ]);
            setCommentContent('');
        } catch (error) {
            console.error('Lỗi khi thêm comment:', error);
        }
    };





    const handleCommentSubmit = async () => {
        try {
            if (commentContent.trim() !== '') {
                await addComment(selectedFeed.slug, commentContent);
                getComments(selectedFeed.slug);
                setCommentContent('');
            }
        } catch (error) {
            console.error('Lỗi khi gửi bình luận:', error);
        }
    };




    useEffect(() => {
        if (showModal && selectedFeed) {
            getComments(selectedFeed.slug);
        }
    }, [showModal, selectedFeed]);




    const handleDeleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://api.realworld.io/api/articles/${selectedFeed.slug}/comments/${commentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error del', error);
        }
    };




    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='container' >
                        <div >
                            <div className='col-12'>
                                <div >
                                    <h3 style={{ textAlign: 'center' }}> {selectedFeed && selectedFeed.author.username}'s Article</h3>
                                </div>

                            </div>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        {selectedFeed && (
                            <div className='container'>
                                <div className='row' style={{ marginLeft: '5px' }}>
                                    <div className='col-4'>
                                        <div className='row'>
                                            <div className='col-3' style={{ paddingTop: '15px' }}>
                                                <p >
                                                    <img className='rounded-circle' style={{ width:'60px'}} src={selectedFeed.author.image} alt='error' />
                                                </p>

                                            </div>
                                            <div className='col-9' style={{ fontWeight: 'bold', }}>
                                                <span>{selectedFeed.author.username} </span>
                                                <div> <span style={{ fontWeight: 'lighter'}} id={'text-author-detail'}> {displayDate(selectedFeed.createdAt)}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 style={{ marginBottom: '40px', marginTop: '20px', fontStyle: 'italic' }}>{selectedFeed.title}</h3>
                                <div className='border border-secondary ' style={{ borderRadius: '5px', marginBottom: '10px', padding: '10px 10px 1px 9px' }}>
                                    <p >{selectedFeed.body}</p>

                                </div>
                                <div >
                                    {
                                        selectedFeed.tagList.length !== 0 && (
                                            <p>
                                                {
                                                    selectedFeed.tagList.map((tag, index) => {
                                                        return (
                                                            <span style={{ marginLeft: "7px" }} key={index}><Link>#{tag}</Link></span>
                                                        )
                                                    })
                                                }
                                            </p>
                                        )
                                    }

                                </div>

                                <div className={styles.followed}>
                                    <p><i className="fa fa-heart" aria-hidden="true"></i> {selectedFeed.favoritesCount}</p>
                                </div>
                            </div>

                        )}
                        <div className='container' style={{ marginTop: '20px' }}>
                            <div className='col-12' >
                                <Button className='col-6' variant="outline-secondary" onClick={handleLike}>
                                    <span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Like</span>
                                </Button>

                                <Button className='col-6' variant="outline-secondary" >
                                    <span><i className="fa fa-comment-o" aria-hidden="true"></i> Comment</span>
                                </Button>
                                <div className='card comment-form ng-pristine ng-valid' style={{ marginTop: '20px' }}  >
                                    <div className='card-block'>
                                        <textarea

                                            value={commentContent}
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            placeholder="Write a comment ..."
                                            rows="4"
                                            className='form-control ng-pristine ng-untouched ng-valid ng-empty'
                                        />
                                    </div>

                                    <div className='card-footer'>
                                        <div className='col-12'>
                                            <button onClick={handleCommentSubmit} className='btn btn-success' style={{ float: 'right', marginRight: '15px' }}> Post comment</button>
                                        </div>
                                    </div>

                                </div>
                                <div>

                                    <div className='container'>
                                        {Array.isArray(comments) && comments.map((comment, index) => (
                                            <div className='' key={index} style={{ border: '1px grey solid', borderRadius: '10px', marginBottom: '10px', marginTop: '10px' }}>

                                                <div className="card ">
                                                    <div className="card-body ">
                                                        <h6 className="card-text">{comment.body}</h6>
                                                    </div>
                                                    <div className="card-footer bg-transparent border-success">
                                                        <div className='row'>
                                                            <div className='col-6'>
                                                                {comment.author && comment.author.image && (
                                                                    <img src={`${comment.author.image}`} style={{
                                                                        width: '15%', marginLeft: '10px', borderRadius: '50%'
                                                                    }} alt='User avatar'></img>
                                                                )}
                                                            </div>
                                                            <div className='col-6'>
                                                                <button style={{
                                                                    backgroundColor: 'white', border: 'none', textAlignLast: 'center', float: 'right'
                                                                }} onClick={() => handleDeleteComment(comment.id)}>
                                                                    <i className="fa fa-trash" aria-hidden="true" style={{
                                                                        color: 'black', marginTop: '15px',
                                                                        fontSize: 'x-large'
                                                                    }}></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}



                                    </div>
                                </div>
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