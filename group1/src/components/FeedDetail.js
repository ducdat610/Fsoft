import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react'
import styles from '../assets/css/posts.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'



function FeedDetail({ selectedFeed, showModal, setShowModal, handleLike ,index}) {

    const [comments, setComments] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const loginState = useSelector(state => state.login.value);
    const nav = useNavigate()
    const [readMoreStates, setReadMoreStates] = useState([]);


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
            console.error( error);
        }
    };


const handleLikeIndex=()=>{
        handleLike(selectedFeed.slug, selectedFeed.index, selectedFeed.favorited,1)
}

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

            // setComments(prevComments => [
            //     ...prevComments,
            //     { body: comment }
            // ]);
            setCommentContent('');
        } catch (error) {
            console.error( error);
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
            console.error( error);
        }
    };




    useEffect(() => {
        if (showModal && selectedFeed) {
            getComments(selectedFeed.slug);
        }
    }, [showModal, selectedFeed]);

    useEffect(() => {
        setReadMoreStates((prev) => [...prev, false]);
      
        return () => {
          setReadMoreStates((prev) => prev.slice(0, prev.length - 1));
        };
      }, []);
      

      const handleReadMore = () => {
        setReadMoreStates((prev) => {
          const newState = [...prev];
          newState[selectedFeed.slug] = !newState[selectedFeed.slug];
          return newState;
        });
      };
      
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
            console.error( error);
        }
    };




    return (
        <div className='modal-dialog' id='comment'>
            <Modal show={showModal} onHide={() => setShowModal(false)} >
                
                <Modal.Header closeButton>
                    <Modal.Title className='container' >
                        <div className='row '>
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
                                        <div className='row' style={{ textAlign: 'center' }}>
                                            <div className='' style={{ paddingTop: '15px' }}>
                                                <p>
                                                    <img className='rounded-circle' style={{ width: '60px' }} src={selectedFeed.author.image} alt='error' />
                                                </p>
                                            </div>
                                            <div className='' style={{ fontWeight: 'bold' }}>
                                                <span>{selectedFeed.author.username} </span>
                                                <div> <span style={{ fontWeight: 'lighter' }}>{displayDate(selectedFeed.createdAt)}</span></div>
                                            </div>
                                        </div>

                                <h3 style={{ marginBottom: '40px', marginTop: '20px', fontStyle: 'italic' }}>{selectedFeed.title}</h3>
                                {/* <div className='border border-secondary ' style={{ borderRadius: '5px', marginBottom: '10px', padding: '10px 10px 1px 9px' }}>
                                    <p >{selectedFeed.body}</p>

                                </div> */}
                                <div className='border border-secondary ' style={{ borderRadius: '5px', marginBottom: '10px', padding: '10px 10px 1px 9px' }}>
                                    {readMoreStates[selectedFeed.slug] ? (
                                        <p>{selectedFeed.body}</p>
                                    ) : (
                                        <p>
                                            {selectedFeed.body.length > 450
                                                ? selectedFeed.body.substring(0, 450) + '... '
                                                : selectedFeed.body}
                                            {selectedFeed.body.length > 450 && (
                                                <span onClick={handleReadMore} style={{ cursor: 'pointer', fontWeight:'bold', fontStyle:'italic' }}>
                                                    Read more...
                                                </span>
                                            )}
                                        </p>
                                    )}
                                </div>

                                <div >
                                    {
                                        selectedFeed.tagList.length !== 0 && (
                                            <span>
                                                {
                                                    selectedFeed.tagList.map((tag, index) => {
                                                        return (
                                                            <span style={{ marginLeft: "7px", display:'inline-grid' }} key={index}><Link>#{tag}</Link></span>
                                                        )
                                                    })
                                                }
                                            </span>
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
                            <div className='row'>
                             <Button className='col-6' variant="outline-secondary"  onClick={handleLikeIndex}>
                                    <span className={selectedFeed !==null &&  selectedFeed.favorited ?'text-primary':''}><i className="fa fa-thumbs-o-up" aria-hidden="true" ></i> Like</span>
                                </Button>

                                <Button className='col-6' variant="outline-secondary" >
                                    <span><i className="fa fa-comment-o" aria-hidden="true"></i> Comment</span>
                                </Button>
                                </div>
                               
                                <div className='card mb-3 comment-form ng-pristine ng-valid' style={{ marginTop: '20px' }}  >
                                    <div className='card-block'>
                                        <textarea 
                                        onFocus={()=>{
                                            if(
                                                loginState === false 
                                            )
                                            nav('/sign_in')
                                        }}

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

                                                <div className="card " >
                                                    <div className="card-body ">
                                                        <h6 className="card-text">{comment.body}</h6>
                                                    </div>
                                                    <div className="card-footer bg-transparent border-success">
                                                        <div className='row'>
                                                            <div className='col-6'>
                                                                {comment.author && comment.author.image && (
                                                                    <img src={`${comment.author.image}`} style={{
                                                                        maxWidth: '50px',  borderRadius: '50%'
                                                                    }} alt='User avatar'></img>
                                                                )}
                                                                <div style={{fontamily: 'cursive',fontStyle: 'italic'}}>
                                                                  <span> {comment.author.username} </span><br></br>
                                                                <span> {displayDate(comment.createdAt)} </span>
                                                                </div>
                                                               
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
               
            </Modal>
        </div>



    )
}

export default FeedDetail