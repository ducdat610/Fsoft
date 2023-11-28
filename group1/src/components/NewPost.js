import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NewPost(props) {
    const nav = useNavigate();
    const LoginValidate = Yup.object().shape({
        title: Yup.string()
            .required('Required Title'),
        description: Yup.string()
            .required('Required Description'),
        body: Yup.string()
            .required('Required Content'),

        // email: Yup.string().email('Invalid email').required('Required'),
    });
    const handleSubmit = async (values) => {
        let taglist = [];
        const token = localStorage.getItem('token');
        console.log(values.tagList);
        if (values.tagList !== undefined) {
            console.log('zoday');
            taglist = values.taglist.split(',').map((tag) => {
                return tag.trim();
            });
        }

        const article = {
            title: values.title,
            description: values.description,
            body: values.body,
            tagList: taglist
        }
        console.log(article);
        try {
            await axios.post('https://api.realworld.io/api/articles', { article }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            nav("/");
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ title: '', description: '', body: '', tagList: '' }}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={LoginValidate}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className='form-group'>
                                    <Field name='title' className={`form-control ${errors.title && touched.title && 'error-input'}`}
                                        placeholder='Article Title' />
                                    <ErrorMessage component="div" name="title" className="text-danger" />
                                </div>
                                <div className='form-group' style={{ marginTop: "10px" }}>
                                    <Field name='description' className={`form-control ${errors.description && touched.description && 'error-input'}`}
                                        placeholder='What&#8216;s this article about' />
                                    <ErrorMessage component="div" name="description" className="text-danger" />
                                </div>

                                <div className='form-outline' style={{ marginTop: "10px" }}>
                                    <Field as="textarea" name="body"
                                        className={`form-control ${errors.body && touched.body && 'error-input'}`}
                                        placeholder='Write your article' />
                                    <ErrorMessage component="div" name="body" className="text-danger" />
                                </div>
                                <div className='form-group' style={{ marginTop: "10px" }}>
                                    <Field name='taglist' className={`form-control`}
                                        placeholder='Tags' />
                                </div>
                                <button type="submit" className='btn btn-primary' style={{ marginTop: "10px" }}>Publish Article</button>
                            </Form>)}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewPost
