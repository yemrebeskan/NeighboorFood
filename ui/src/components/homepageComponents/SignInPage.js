import React, { useState, useEffect, useContext } from 'react';
import './signin.css';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import ErrorModal from '../../errorModal/errorModal';

const SignInPage = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [error, setError] = useState(null); 

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const emailChangeHandler = (event) => {
    event.preventDefault();
    setEnteredEmail(event.target.value);
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    setEnteredPassword(event.target.value);
    setFormIsValid(
      enteredEmail.includes('@') && event.target.value.trim().length > 6
    );
  };

  const submitHandler = async (event) => {
    const signInInfo = { email: enteredEmail, password: enteredPassword };
    event.preventDefault();
    try {
      const res = await axios.post(
        'http://127.0.0.1:3001/api/v1/users/login',
        signInInfo
      );
      if (res.data.status === 'success') {
        localStorage.setItem('uid', res.data.uid);
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: signInInfo.email })
        );
        const userRole = res.data.role;
        //const chefId = res.data.chefId

        //authCtx.setUserData(userRole, chefId)
        authCtx.setUserData(userRole);
        authCtx.onLogin({
          email: enteredEmail,
          password: enteredPassword,
        });
      } 
      // assump log in is successful
    } catch (err) {
      setError('Wrong password or email'); 
    }
  };

  const exitHandlerSignInPage = (event) => {
    event.preventDefault();
    authCtx.exitHandler();
  };

  const createAnAccountHandler = (event) => {
    event.preventDefault();
    authCtx.exitHandler();
    authCtx.handleSignUp();
  };

  const closeModal = () => {
    setError(null); 
  };

  return (
    <div className="signin rounded">
      <img
        className="exitButton"
        src="https://icon-library.com/images/x-button-icon/x-button-icon-17.jpg"
        onClick={exitHandlerSignInPage}
      />
      <form onSubmit={submitHandler}>
        <label htmlFor="email"></label>
        <input
          className="input-class mt-12 ml-4"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <br />
        <br />
        <label htmlFor="password"></label>
        <div className="form-class ml-4">
          <input
            className="input-class"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />

          <a onClick={togglePasswordVisibility} className="buttonpassword">
            {showPassword ? (
              <img src="https://raw.githubusercontent.com/Hasan-S-SELCUK/photos/main/eye1.png" />
            ) : (
              <img src="https://cdn.discordapp.com/attachments/978313692519202867/1098617294650867772/eye2.png" />
            )}
          </a>
        </div>
        <br />
        <br />
        <button
          type="submit"
          className="button-class mt-16"
          disabled={!formIsValid}
        >
          SIGN IN
        </button>
        <span className="create-account" onClick={createAnAccountHandler}>
          or <a href="#">Create an account</a>
        </span>
        <span className="google-button mt-16 ml-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png" />
        </span>
      </form>
      <ErrorModal
        isOpen={error !== null}
        errorMessage={error}
        onClose={closeModal}
      /> 
    </div>
  );
};

export default SignInPage;
