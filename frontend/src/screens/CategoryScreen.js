import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { Table, Button, Row, Col, Form, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { createCategory, listCategories } from '../actions/categoryActions'
import { CATEGORY_CREATE_RESET } from '../constants/categoryConstants'

import { nameInputBlurHandler,nameInputChangeHandler } from '../helpers/validationHelpers'



const CategoryManage = ({ history }) => {
  const [_category, set_category] = useState('')
  
 

  const [errorCategory, seteErrorCategory] = useState('')
  
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const {
    loading: categoryListLoading,
    error: categoryListError,
    categories,
  } = categoryList

  const categoryCreate = useSelector((state) => state.categoryCreate)
  let {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = categoryCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: CATEGORY_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    if (categories.length === 0 && !categoryListLoading) {
      dispatch(listCategories())
    }
  }, [dispatch, history, userInfo, createSuccess, categories])

  const createCategoryHandler = (e) => {
    e.preventDefault()
    nameInputBlurHandler(_category, seteErrorCategory)
    
   
    if (errorCategory !== '') {
      dispatch(createCategory(_category))
      set_category('')
      
    }
  }

  

  return (
    <>
      <Row xs={1} md={2} className='g-4'>
        <Col md={5}>
          <Row>
            <Card>
              <Card.Body>
                <Card.Title>Add Category</Card.Title>
                {createLoading ? (
                  <Loader />
                ) : createError ? (
                  <Message variant='danger'>{createError}</Message>
                ) : (
                  <Form onSubmit={createCategoryHandler}>
                    <Form.Group controlId='category'>
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Category'
                        value={_category}
                        onChange={(e) => {
                          set_category(e.target.value)
                          nameInputChangeHandler(
                            e.target.value,
                            seteErrorCategory
                          )
                        }}
                        onBlur={(e) => {
                          nameInputBlurHandler(
                            e.target.value,
                            seteErrorCategory
                          )
                        }}
                      ></Form.Control>
                      <span className='text-danger'>{errorCategory}</span>
                    </Form.Group>

                    

                    <Button type='submit' variant='primary' className='m-3'>
                      Add
                    </Button>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Row>
         
        </Col>

     
      </Row>
    </>
  )
}

export default CategoryManage
