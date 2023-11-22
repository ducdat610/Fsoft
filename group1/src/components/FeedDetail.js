import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React from 'react'


 function FeedDetail({ selectedFeed, showModal, setShowModal }) {

    return (
        <>
<Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    {/* <Modal.Title>{selectedFeed && selectedFeed.title}</Modal.Title> */}
                    <Modal.Title >
                        <div className='row'>
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
                            <>

                                <h3 style={{marginBottom:'40px', marginTop:'20px    '}}>{selectedFeed.title}</h3>
                            <p>{selectedFeed.body}</p>
                            </>
                            
                        )}

                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Like
                    </Button> <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Comment
                    </Button>
                    </>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>



    )
  }

export default FeedDetail