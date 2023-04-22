import React, { useState } from 'react'
import './signup.css'

const SignUpPage = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false)
  const [formIsValid, setFormIsValid] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const emailChangeHandler = (event) => {
    const enteredEmail = event.target.value
    setEnteredEmail(enteredEmail)
    setEmailIsValid(
      enteredEmail.includes('@') && enteredEmail.trim().length > 0
    )
    setFormIsValid(
      enteredEmail.includes('@') &&
        enteredPassword.trim().length > 0 &&
        enteredConfirmPassword.trim().length > 0 &&
        enteredPassword === enteredConfirmPassword
    )
  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
    setPasswordIsValid(event.target.value.trim().length >= 6)
    setFormIsValid(
      enteredEmail.includes('@') &&
        event.target.value.trim().length >= 6 && // update here
        enteredConfirmPassword.trim().length > 0 &&
        enteredPassword === enteredConfirmPassword
    )
  }

  const confirmPasswordChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value)
    setConfirmPasswordIsValid(event.target.value.trim().length >= 6)
    setFormIsValid(
      enteredEmail.includes('@') &&
        enteredPassword.trim().length > 6 &&
        event.target.value.trim().length > 6 &&
        enteredPassword === event.target.value
    )
  }

  function getPasswordStrength(password) {
    let score = 0

    if (!password) {
      return ''
    }

    // Add points for length
    const lengthScore = Math.min(1, password.length / 8)
    score += lengthScore

    // Add points for uppercase letters
    if (/[A-Z]/.test(password)) {
      score++
    }

    // Add points for lowercase letters
    if (/[a-z]/.test(password)) {
      score++
    }

    // Add points for numbers
    if (/[0-9]/.test(password)) {
      score++
    }

    // Add points for symbols
    if (/[^A-Za-z0-9]/.test(password)) {
      score++
    }

    if (score < 2) {
      return 'weak'
    } else if (score < 4) {
      return 'medium'
    } else {
      return 'strong'
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onSignUp(enteredEmail, enteredPassword)
    // handle signup logic
  }

  return (
    <div className="signup flex">
      <form onSubmit={submitHandler} className="signup-form">
        <label htmlFor="email">Email</label>
        <input
          className="input-class"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailChangeHandler}
        />
        {!emailIsValid && (
          <p className="error-text">Please enter a valid email address.</p>
        )}
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <div className="form-class">
          <input
            className="input-class"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordChangeHandler}
          />

          {!passwordIsValid && (
            <p className="error-text">
              Password should be at least 7 characters long.
            </p>
          )}
          <br />
          <input
            className="input-class"
            placeholder="confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordChangeHandler}
          />
          {enteredPassword !== enteredConfirmPassword && (
            <p className="error-text">Passwords do not match.</p>
          )}
          <br />
          <button onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'} password
          </button>
        </div>
        {passwordIsValid && confirmPasswordIsValid && (
          <div className="strength-meter">
            <p>Password strength:</p>
            <div
              class={`strength-meter__bar strength-meter__bar--${getPasswordStrength(
                enteredPassword
              )}`}
            />
          </div>
        )}
        <button type="submit" className="button-class" disabled={!formIsValid}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
