import React, { useReducer, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import Icon from "../Icon";
import TextInput from "../TextInput";
import { INITIAL_STATE, signReducer } from "./signReducer";
import { checkEmail, checkPassword, logUserIn, registerUser } from "../../logic/apiCallsUser";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Snackbar, { SnackbarType } from "../Snackbar";
import { useNavigate } from "react-router-dom";

const Login = (isFromTickets) => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [state, dispatch] = useReducer(signReducer, INITIAL_STATE);
  const { pending, error, errorText } = useSelector((state) => state.user)
  const [isAllValid, setIsAllValid] = useState(true)
  const dispatchAction = useDispatch();

  const onInputChange = e => {
    const { name, value } = e.target;
    setAccount(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(name, value)
  }

  const handleSubmitEmail = (async () => {
    validateInput("email");
    const isValid = await checkEmail(account.email, dispatchAction);

    if (isValid) {
      dispatch({ type: "CONFIRMATION" })
    }
  });

  const handleSubmitPassword = (async () => {
    const isValid = await checkPassword(account.password, dispatchAction);
    validateInput("password")
    // NO OTP
    registerUser(account.email, account.password, dispatchAction, isFromTickets, navigate);
    snackbarRef.current.show();

    // if (isValid) {
    //   validateInput("password");
    //   dispatch({ type: "CODE_ENTERING" });
    // }
  });

  const navigate = useNavigate();
  const checkCode = (e) => {
    var code = e.target.value;
    if (code.length === 6) {
      registerUser(account.email, account.password, dispatchAction, isFromTickets, navigate);
      
      snackbarRef.current.show();
    }
  }

  const handleLogIn = () => {
    logUserIn(account.email, account.password, dispatchAction, isFromTickets, navigate);
    
    snackbarRef.current.show();
  }

  const snackbarRef = useRef(null);
  const validateInput = (name,value) => {
    switch (name) {
      case "email":
        if (value !== undefined && value.length!==0 && value.conta) {
          setIsAllValid(true)
        } else {
          setIsAllValid(false)
        }
        break;

      case "password":
        if (value !== undefined && value.length!==0) {
          setIsAllValid(true)
        } else {
          setIsAllValid(false)
        }
        break;

      case "confirmPassword":
        if (value !== undefined && value.length!==0) {
          setIsAllValid(true)
        } else {
          setIsAllValid(false)
        }
        break;

      default:
        break;
    }

  }


  return (
    <div className={cn(styles.login)}>
      {
        state.visibleSignUp &&
        <div className={cn(styles.item)} >
          <div className={cn("h3", styles.title)}>Registration</div>

          <br />
          {error && <span className={styles.error}>{errorText}</span>}
          <TextInput
        
            className={cn(styles.form)}
            onClickFunc={handleSubmitEmail}
            placeholder="Your email"
            type="email"
            name="email"
            iconName="arrow-next"
            onChange={onInputChange}
            buttonType="submit"
            view
            required
          />
          <div className={styles.foot}>
            Already have an account?{" "}
            <button className={styles.link}
              onClick={() => {
                dispatch({ type: "SIGN_IN" });
              }
              }>
              Login
            </button>
            <div className={styles.btns}>
              {/*
                <button className={cn("button-black", styles.button)}>
                  <Icon name="google" size="16" />
                  <span>Google</span>
                </button>*/
              }

              {
                /*<button className={cn("button-black", styles.button)}>
                    <Icon name="apple" size="16" />
                    <span>Apple</span>
                 </button>*/
              }
            </div>
          </div>
        </div>
      }
      {
        state.visibleSignIn &&
        <div className={cn(styles.item)}>
          <div className={cn("h3", styles.title)}>Sign In</div>
          <br></br>
          <form className={styles.form}>
          {error && <span className={styles.error}>{errorText}</span>}
            <TextInput
              className={styles.field}
              name="email"
              type="email"
              placeholder="E-mail"
              required
              onChange={onInputChange}
            />
            <br />
            <TextInput
              className={styles.field}
              name="password"
              type="password"
              placeholder="Password"
              required
              view
              onChange={onInputChange}
            />
            <br />
            <button disabled={pending || !isAllValid} type="button" className={cn("button", styles.button)}
              onClick={handleLogIn}>
              {pending ? <Loader></Loader> : "Sign in"}
            </button>
          </form>
          <div className={styles.foot}>
            {/*<a className={styles.password} href="/#" rel="noopener noreferrer">
              Forgot passport?
               </a>*/}
          </div>
        </div>
      }
      {
        state.visibleConfirmation &&
        <div className={styles.item}>
          <div className={cn("h3", styles.title)}>
            Password
          </div>
          <br />
          <form className={styles.form}>
            <div className={styles.variants}>
              <TextInput
                className={styles.field}
                name="password"
                type="password"
                placeholder="Password"
                required
                view
                onChange={onInputChange}
                autoFocus
              />
              <br />
              <TextInput
                className={styles.field}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                onChange={onInputChange}
                view
              />
              {error && <span className={styles.error}>{errorText}</span>}
            </div>
            <button disabled={pending} type="button" className={cn("button", styles.button)}
              onClick={ handleSubmitPassword }>
              
              {/*pending ? <Loader></Loader> : "Send OTP"*/}
                {pending ? <Loader></Loader> : "Sign up"}
            </button>
          </form>
        </div>
      }
      {
        state.visibleEnteringCode &&
        <div className={cn(styles.item)}>
          <div className={cn("h3", styles.title)}>Enter OTP</div>
          <div className={styles.info}>{`We sent code to ${account.email}`}</div>
          <form className={styles.form}>
            <div className={styles.code}>
              <div className={styles.number}>
                <input type="tel" name="authCode" autoFocus placeholder="XXXXXX" onChange={checkCode} />
                {/* TODO: ERROR HANDLING */}
              </div>
            </div>
          </form>
        </div>
      }
      {error ?
        <Snackbar
          ref={snackbarRef}
          message="An error occured"
          type={SnackbarType.error}
        /> :
        <Snackbar
          ref={snackbarRef}
          message="Login successful"
          type={SnackbarType.success}
        />
      }
    </div>

  );
};

export default Login;
