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
  const [enteredName, setEnteredName] = useState('')
  const [enteredSurname, setEnteredSurname] = useState('')

  const nameHandler = (event) => {
    event.preventDefault();
    const enteredName = event.target.value.trim();
    const onlyLettersRegex = /^[A-Za-z]+$/; // regular expression for letters only
  
    if (enteredName.length > 1 && onlyLettersRegex.test(enteredName)) {
      setEnteredName(enteredName);
    }
  };

  const surnameHandler = (event) => {
    event.preventDefault();
    const enteredSurName = event.target.value.trim();
    const onlyLettersRegex = /^[A-Za-z]+$/; // regular expression for letters only
  
    if (enteredSurName.length > 1 && onlyLettersRegex.test(enteredSurName)) {
      setEnteredName(enteredSurName);
    }
  };
  

  const togglePasswordVisibility = (event) => {
    event.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const emailChangeHandler = (event) => {
    event.preventDefault()
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
    event.preventDefault()
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
    event.preventDefault()
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

  const exitHandlerSignInPage = (event) => {
    event.preventDefault()
    props.onClickSignExit()
  }

  return (
    <div className="signup flex">
      <img className="exitButton" src='https://icon-library.com/images/x-button-icon/x-button-icon-17.jpg' onClick={exitHandlerSignInPage}/>
      <form onSubmit={submitHandler} className="signup-form">
        <label htmlFor="name"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="name"
          type="text"
          id="name"
          value={enteredName}
          onChange={nameHandler}
          onBlur={nameHandler}
        />
        <br />
        <label htmlFor="surname"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="surname"
          type="text"
          id="surname"
          value={enteredSurname}
          onChange={surnameHandler}
          onBlur={surnameHandler}
        />
        <br />
        <label htmlFor="email"></label>
        <input
          className="input-class mt-5 ml-4"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailChangeHandler}
        />
        {!emailIsValid && (
          <p className="error-text ml-4">Please enter a valid email address.</p>
        )}
        <br />
        <br />
        <label htmlFor="password"></label>
        <div className="form-class ml-4" >
          <input className="input-class "
          id="password"
          value={enteredPassword}
          type={showPassword ? 'text' : 'password'}
          onChange={passwordChangeHandler}
          onBlur={passwordChangeHandler}
            placeholder="password"/><button onClick={togglePasswordVisibility} className="buttonpassword">
          {showPassword ? (
            <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
          ) : (
            <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
          )}
        </button></div>
           
          
        
          {!passwordIsValid && (
            <p className="error-text ml-4">
              Password should be at least 7 characters long.
            </p>
          )}
          <br />
          <div className="form-class ml-4">
          <input
            className="input-class"
            placeholder="confirm password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={enteredConfirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordChangeHandler}
          />
          <button onClick={togglePasswordVisibility} className="buttonpassword">
          {showPassword ? (
            <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
          ) : (
            <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
          )}
        </button>
        </div>
          {enteredPassword !== enteredConfirmPassword && (
            <p className="error-text ml-4">Passwords do not match.</p>
          )}
          <br />
          
     
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
        <button type="submit" className="button-class ml-4" disabled={!formIsValid}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUpPage
