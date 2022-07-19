import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { nameInputBlurHandler,
        nameInputChangeHandler,
        emailInputBlurHandler,
        emailInputChangeHandler,
        passwordInputBlurHandler,
        passwordInputChangeHandler        
} from '../helpers/validationHelpers'  
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    nameInputBlurHandler(name, setNameError)
    emailInputBlurHandler(email, setEmailError)
    passwordInputBlurHandler(password, setPasswordError)
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    }else if (
      !nameError &&
      !emailError &&
      !passwordError &&
      name !== '' &&
      password !== '' &&
      email !== '' &&
      name !== null &&
      password !== null &&
      email !== null
    ) 
    {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              nameInputChangeHandler(e.target.value, setNameError)
            }}
            onBlur={(e) => {
              nameInputBlurHandler(e.target.value, setNameError)
            }}
            placeholder='Enter name'
          ></Form.Control>
          <Form.Text className='text-danger fs-6'>
            {nameError && nameError}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              emailInputChangeHandler(e.target.value, setEmailError)
            
            }}
            onBlur={(e) => {
              emailInputBlurHandler(e.target.value, setEmailError)
            }}
          ></Form.Control>
          <Form.Text className='text-danger fs-6'>
            {emailError && emailError}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              passwordInputChangeHandler(e.target.value, setPasswordError)
            }}
            onBlur={(e) => {
              passwordInputBlurHandler(e.target.value, setPasswordError)
            }}
          ></Form.Control>
          <Form.Text className='text-danger fs-6'>
            {passwordError && passwordError}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
