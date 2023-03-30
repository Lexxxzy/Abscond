import React, { useEffect, useReducer, useRef, useState } from "react";
import cn from "classnames";
import styles from "./Login.module.sass";
import TextInput from "../TextInput";
import { INITIAL_STATE, INITIAL_STATE_MANAGEMENT, signReducer } from "./signReducer";
import { checkEmail, checkPassword, logUserIn, registerUser } from "../../logic/apiCallsUser";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Snackbar, { SnackbarType } from "../Snackbar";
import { useNavigate } from "react-router-dom";
import DropdownWithSearch from "../DropdownWithSearch";
import { getAirlines, loginManager, registerManager } from "../../logic/apiCallsDashboard";


const Login = ({ isFromTickets, isFromManagement = false }) => {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: ''
  });

  const [state, dispatch] = useReducer(signReducer, isFromManagement === true ? INITIAL_STATE_MANAGEMENT : INITIAL_STATE);
  const { pending, error, errorText } = useSelector((state) => state.user)
  const { managerPending, managerError, managerErrorText } = useSelector((state) => state.manager)
  const [isAllValid, setIsAllValid] = useState(true)
  const dispatchAction = useDispatch();

  const [airlines, setAirlines] = useState([]);
  const [selectedAirline, selectAirline] = useState({});
  const [dropdownAirlineSearch, setDropdownAirlineSearch] = useState("");
  const [pendingAirlines, setPendingAirlines] = useState();

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
    const isValid = await checkEmail(account.email, dispatchAction, isFromManagement);

    if (isValid) {
      dispatch({ type: "CONFIRMATION" })
    }
  });

  const handleSubmitPassword = (async () => {
    const isValid = await checkPassword(account.password, dispatchAction);

    validateInput("password")
    // NO OTP
    if (isValid) {
      if (isFromManagement) {
        registerManager(account.email, account.password, account.name, account.surname, selectedAirline, dispatch, dispatchAction);

      } else {
        registerUser(account.email, account.password, dispatchAction, isFromTickets, navigate, isFromManagement);
      }

    }
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
    if (isFromManagement) {
      loginManager(account.email, account.password, dispatchAction, snackbarRef);

    } else {
      logUserIn(account.email, account.password, dispatchAction, isFromTickets, navigate, snackbarRef);
    }
    snackbarRef.current.show();
  }


  useEffect(() => {
    if (isFromManagement) {
      getAirlines(setPendingAirlines, setAirlines, dropdownAirlineSearch, selectAirline);
    }

  }, []);

  const onSearchAirline = () =>
    getAirlines(setPendingAirlines, setAirlines, dropdownAirlineSearch);


  const snackbarRef = useRef(null);
  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        if (value !== undefined && value.length !== 0 && value.conta) {
          setIsAllValid(true)
        } else {
          setIsAllValid(false)
        }
        break;

      case "password":
        if (value !== undefined && value.length !== 0) {
          setIsAllValid(true)
        } else {
          setIsAllValid(false)
        }
        break;

      case "confirmPassword":
        if (value !== undefined && value.length !== 0) {
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
          {(error || managerError )&& <span className={styles.error}>{isFromManagement ? managerErrorText : errorText}</span>}
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
            {(error||managerError) && <span className={styles.error}>{isFromManagement ? managerErrorText : errorText}</span>}
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
            <button disabled={(pending || managerPending) || !isAllValid} type="button" className={cn("button", styles.button)}
              onClick={handleLogIn}>
              {(pending || managerPending) ? <Loader></Loader> : "Sign in"}
            </button>
            <button type="button" className={cn("button", styles.button_back)}
              onClick={() => {
                dispatch({ type: "SIGN_UP" });
              }}>
              Register
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
          <div className={cn(isFromManagement ? "h4" : "h3", styles.title)}>
            Password {isFromManagement && "and company selection"}
          </div>
          <br />
          <form className={styles.form}>
            <div className={styles.variants}>
              <TextInput
                className={cn(styles.field, styles.text__input)}
                name="password"
                type="password"
                placeholder="Password"
                required
                view
                onChange={onInputChange}
                autoFocus
              />
              <TextInput
                className={cn(styles.field, styles.text__input)}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                onChange={onInputChange}
                view
              />
              {isFromManagement &&
                <div>
                  <TextInput
                    className={cn(styles.field, styles.text__input)}
                    name="name"
                    type="text"
                    placeholder="Your name"
                    required
                    onChange={onInputChange}
                  />
                  <TextInput
                    className={cn(styles.field, styles.text__input)}
                    name="surname"
                    type="text"
                    placeholder="Your surname"
                    required
                    onChange={onInputChange}
                  />
                  <DropdownWithSearch
                    className={cn(styles.dropdown)}
                    value={selectedAirline}
                    disabled
                    setValue={selectAirline}
                    options={airlines}
                    dropdownValue={dropdownAirlineSearch}
                    setDropdownValue={setDropdownAirlineSearch}
                    onSearch={onSearchAirline}
                    isString={true}
                  />

                </div>}
              {(error || managerError) && <span className={styles.error}>{isFromManagement ? managerErrorText : errorText}</span>}
            </div>
            <button disabled={pending || managerPending} type="button" className={cn("button", styles.button)}
              onClick={handleSubmitPassword}>

              {/*pending ? <Loader></Loader> : "Send OTP"*/}
              {pending || managerPending ? <Loader></Loader> : "Sign up"}
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
      {
        state.visibleInfo &&
        <div className={cn(styles.item)}>
          <div className={cn("h4", styles.title)}>
            Success. 👌🏻 <br></br> Please, wait till our administrator confirm your account
          </div>
          <div className={styles.info}>{`When your account will be ready, we send you confirmation to ${account.email}`}</div>
        </div>
      }
      {(error || managerError) ?
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
