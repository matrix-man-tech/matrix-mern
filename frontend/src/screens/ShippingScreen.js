import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'
import {
  addressInputBlurHandler,
  addressInputChangeHandler,
  nameInputChangeHandler,
  nameInputBlurHandler,
  postalCodeInputBlurHandler,
  postalCodeInputChangeHandler,
} from '../helpers/validationHelpers'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const [errorAddress, setErrorAddress] = useState('')
  const [errorCity, setErrorCity] = useState('')
  const [errorPostalCode, setErrorPostalCode] = useState('')
  const [errorCountry, setErrorCountry] = useState('')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    addressInputBlurHandler(address, setErrorAddress)
    nameInputBlurHandler(city, setErrorCity)
    postalCodeInputBlurHandler(postalCode, setErrorPostalCode)
    nameInputBlurHandler(country, setErrorCountry)

    if (
      errorAddress === '' &&
      
      errorCity === '' &&
      errorPostalCode === '' &&
      errorCountry === ''
    ) {
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
          onChange={(e) => {
              setAddress(e.target.value)
              addressInputChangeHandler(e.target.value, setErrorAddress)
            }}
            onBlur={(e) => {
              addressInputBlurHandler(e.target.value, setErrorAddress)
            }}
          ></Form.Control>
          <span className='text-danger text-small'>{errorAddress}</span>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => {
              setCity(e.target.value)
              nameInputChangeHandler(e.target.value, setErrorCity)
            }}
            onBlur={(e) => {
              nameInputBlurHandler(e.target.value, setErrorCity)
            }}
          ></Form.Control>
          <span className='text-danger text-small'>{errorCity}</span>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => {
              setPostalCode(e.target.value)
              postalCodeInputChangeHandler(
                e.target.value,
                setErrorPostalCode
              )
            }}
            onBlur={(e) => {
              postalCodeInputBlurHandler(
                e.target.value,
                setErrorPostalCode
              )
            }}
          ></Form.Control>
           <span className='text-danger text-small'>
                  {errorPostalCode}
                </span>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => {
              setCountry(e.target.value)
              nameInputChangeHandler(e.target.value, setErrorCountry)
            }}
            onBlur={(e) => {
              nameInputBlurHandler(e.target.value, setErrorCountry)
            }}
          ></Form.Control>
          <span className='text-danger text-small'>{errorCountry}</span>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
