import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/posts.module.css'
function EditPost(props) {
    const nav = useNavigate();
    const [feed, setFeed] = useState();
    useEffect(() => {
        if (props.Article) {
            setFeed(props.Article);
        }
    }, [props.Article])
    const LoginValidate = Yup.object().shape({
        title: Yup.string()
            .required('Required Title'),
        description: Yup.string()
            .required('Required Description'),
        body: Yup.string()
            .required('Required Content'),
    });
    const handleSubmit = async (values) => {
        let taglist = [];
        const token = localStorage.getItem('token');
        console.log(values.tagList)
        if (values.tagList !== undefined && values.tagList !== '') {
            taglist = values.tagList.split(',').map((tag) => {
                return tag.trim();
            });
        }
        taglist.push(...feed.tagList);
        const article = {
            title: values.title,
            description: values.description,
            body: values.body,
            // tagList: taglist
        }
        if (values.tagList !== undefined && values.tagList !== '') {
            article.tagList = taglist;
        }
        else article.tagList = feed.tagList;
        console.log(article)
        try {
            await axios.put(`https://api.realworld.io/api/articles/${feed.slug}`, { article }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            props.handleClose();
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleDeleteTag = (tag) => {
        const newArr = {
            ...feed
        }
        const newTag = newArr.tagList.filter((tagg) => {
            return tagg !== tag;
        })
        newArr.tagList = newTag;
        setFeed(newArr);
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Article</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            title: `${feed ? feed.title : ""}`,
                            description: `${feed ? feed.description : ""}`,
                            body: `${feed ? feed.body : ""}`, tagList: ""
                        }}
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
                                        placeholder='Write your article'
                                        style={{ height: "200px" }} />
                                    <ErrorMessage component="div" name="body" className="text-danger" />
                                </div>
                                <div className='form-group' style={{ marginTop: "10px" }}>
                                    <Field name='tagList' className={`form-control`}
                                        placeholder='Tags' />
                                </div>
                                <div className={styles.tagGroup}>
                                    {
                                        feed !== undefined && feed.tagList !== undefined && feed.tagList.map((tag) => {
                                            return (
                                                <div className={styles.tagItem} key={tag}>
                                                    <p><i className="fa fa-times" aria-hidden="true"
                                                        onClick={() => handleDeleteTag(tag)}></i><span>{tag}</span></p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button type="submit" className='btn btn-primary' style={{ marginTop: "10px" }}>Publish Article</button>
                            </Form>)}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditPost
