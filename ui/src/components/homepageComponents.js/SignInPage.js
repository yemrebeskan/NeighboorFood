import React, { useState, useEffect } from 'react'
import './signin.css'
const SignInPage = () => {
    const [enteredEmail, setEnteredEmail] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState()
    const [passwordIsValid, setPasswordIsValid] = useState()
    const [formIsValid, setFormIsValid] = useState(false)
//use EmailCheck.js for email and password validation



    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(
                enteredEmail.includes('@') && enteredPassword.trim().length > 6
            )
        }, 500)
//backende az request atmak için bu kod var
        return () => {
            clearTimeout(identifier)
        }
    }, [enteredEmail, enteredPassword])
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
        setFormIsValid(
            event.target.value.includes('@') &&
                enteredPassword.trim().length > 6
        )
    }
    const validateEmailHandler = () => {
        setEmailIsValid(enteredEmail.includes('@'))
    }
    //email is valid kullanacaksan burada var
    const validatePasswordHandler = () => {
        setPasswordIsValid(enteredPassword.trim().length > 6)
    }
    //password is valid kullanacaksan burada var
    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
        setFormIsValid(
            enteredEmail.includes('@') && event.target.value.trim().length > 6
        )
    }

    const submitHandler = (event) => {
        event.preventDefault()
        //props.onLogin(enteredEmail, enteredPassword);
    }

    return (
        <div className="signin">
            <form onSubmit={submitHandler}>
                <label htmlFor="email"></label>
                <input
                    className="input-class"
                    placeholder="e-mail"
                    type="email"
                    id="email"
                    value={enteredEmail}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                />
                <br />
                <br />
                <label htmlFor="password"></label>
                <div className="form-class">
                    <input
                        className="input-class"
                        placeholder="password"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={enteredPassword}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />

                    <button
                        onClick={togglePasswordVisibility}
                        className="buttonpassword"
                    >
                        {showPassword ? (
                            <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
                        ) : (
                            <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
                        )}
                    </button>
                </div>
                <br />
                <br />
                <button
                    type="submit"
                    className="button-class"
                    disabled={!formIsValid}
                >
                    SIGN IN
                </button>
                <span className="create-account">
                    or <a href="#">Create an account</a>
                </span>
                <button className="google-button">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" />
                </button>
            </form>
        </div>
    )
}

export default SignInPage;