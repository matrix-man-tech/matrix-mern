// @desc    handles name input blur event
// @params  value, error state setter
// @returns nothing
export const nameInputBlurHandler = (name, setError) => {
    if (name === '') {
      setError('This field cannot be empty!')
    } else if (name.length < 4) {
      setError('This field should have atleast 4 charecters.')
    } else if (name.slice(-1) === ' ') {
      setError('should not end with space.')
    } else {
      setError('')
    }
  }
  
  // @desc    handles name input change event
  // @params  value, error state setter
  // @returns nothing
  export const nameInputChangeHandler = (name, setError) => {
    if (name.length === 0) {
      setError('This field cannot be empty!')
    } else if (name.charAt(0) === ' ') {
      setError('should not start with space.')
    } else if (name.includes('  ')) {
      setError('should not contain consecutive spaces.')
    } else if (/\d/.test(name)) {
      setError('should not contain numbers.')
    } else if (!name.match(/^[a-zA-Z ]+$/)) {
      setError('Invalid charecter!')
    } else if (name === '') {
      setError('This field cannot be empty!')
    } else if (name.length < 4) {
      setError('This field should have atleast 4 charecters.')
    } else if (name.slice(-1) === ' ') {
      setError('should not end with space.')
    } else {
      setError('')
    }
  }

  export const emailInputBlurHandler = (email, setError) => {
    if (email === '') {
      setError('This field cannot be empty!')
    } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setError('This email id is not valid.')
    } else {
      setError('')
    }
  }
  
  
  export const emailInputChangeHandler = (email, setError) => {
    if (email.includes(' ')) {
      setError('Email id should not contain space.')
    }
   
    else {
      setError('')
    }
  }

  export const passwordInputBlurHandler = (password, setError) => {
    if (password === '') {
      setError('This field cannot be empty!')
    } else if (password.length < 5) {
      setError('password should have atleast 5 charecters')
    } else if (password.length > 20) {
      setError('password should not exceed 20 characters')
    } else {
      setError('')
    }
  }
  

  export const passwordInputChangeHandler = (password, setError) => {
    if (password.length > 20) {
      setError('password should not exceed 20 characters')
    } else {
      setError('')
    }
  }

  export const addressInputBlurHandler = (value, setError) => {
    if (value === '') {
      setError('This field cannot be empty!')
    } else if (value.length < 4) {
      setError('This field should have atleast 4 charecters.')
    } else if (value.slice(-1) === ' ') {
      setError('This field should not end with space.')
    } else {
      setError('')
    }
  }

  export const addressInputChangeHandler = (value, setError) => {
    if (value.length === 0) {
      setError('')
    } else if (value.charAt(0) === ' ') {
      setError('should not start with space.')
    } else if (value.length < 4) {
      setError('This field should have atleast 4 charecters.')
    } else if (value.includes('  ')) {
      setError('should not contain consecutive spaces.')
    } else if (value.slice(-1) === ' ') {
      setError('This field should not end with space.')
    } else {
      setError('')
    }
  }

  export const postalCodeInputBlurHandler = (postalCode, setError) => {
    if (postalCode === '') {
      setError('This field cannot be empty!')
    } else if (postalCode.length !== 6) {
      setError('Postal Code should have 6 digits')
    } else {
      setError('')
    }
  }

  export const postalCodeInputChangeHandler = (postalCode, setError) => {
    if (postalCode === '') {
      setError('This field cannot be empty!')
    } else if (!postalCode.match(/^\d{6}$/) && postalCode !== '') {
      setError('Enter numbers only!')
    } else if (postalCode.length > 6) {
      setError('postalCode should not have more than 6 digits')
    } else {
      setError('')
    }
  }

  export const priceInputBlurHandler = (price, setError) => {
    if (price === '') {
      setError('This field cannot be empty!')
    } else if (Number(price) < 0) {
      setError('Negative numbers are not allowed')
    }
   
    else {
      setError('')
    }
  }

  export const priceInputChangeHandler = (price, setError) => {
    if (price === '') {
      setError('This field cannot be empty!')
    } else if (!price.match(/^\d+(,\d{1,2})?$/)) {
      setError('Enter a valid number!')
    } else {
      setError('')
    }
  }

  export const descriptionInputChangeHandler = (name, setError) => {
    if (name.length === 0) {
      setError('This field cannot be empty!')
    } else if (name.charAt(0) === ' ') {
      setError('should not start with space.')
    } else if (name.includes('  ')) {
      setError('should not contain consecutive spaces.')
    } 
      else if (!name.match(/^[a-zA-Z ]+$/)) {
      setError('Invalid charecter!')
    } else if (name === '') {
      setError('This field cannot be empty!')
    } else if (name.length < 4) {
      setError('This field should have atleast 4 charecters.')
    } else if (name.slice(-1) === ' ') {
      setError('should not end with space.')
    } else {
      setError('')
    }
  }