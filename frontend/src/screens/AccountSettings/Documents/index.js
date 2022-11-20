import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./DocumentsInfo.module.sass";
import TextInput from "../../../components/TextInput";
import Icon from "../../../components/Icon";
import Dropdown from "../../../components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { getUserDocuments, setUserDocuments } from "../../../logic/apiCallsUser";
import Moment from 'moment';
import Loader from "../../../components/Loader"
import Snackbar, { SnackbarType } from "../../../components/Snackbar";

const optionsDocs = ["Passport"/*, "Visa"*/];
const optionsGender = ["Man", "Woman"]

const Documents = () => {
  const dispatch = useDispatch();
  useEffect(() => { getUserDocuments(dispatch) }, [])
  const [document, setDocument] = useState(optionsDocs[0]);
  const [genderOption, setGender] = useState(optionsGender[0]);
  const userInfo = useSelector(state => state.user.userInfo);
  const { error, pending, errorText } = useSelector(state => state.user);

  const [passport, setPassport] = useState({
    "id": '',
    "issue_date": '',
    "name": '',
    "surname": '',
    "gender": 'M'
  });

  const handleSubmit = () => {

    passport.issue_date = passport.issue_date.replaceAll(".", "-");
    passport.id = passport.id.replace(" ", "");
    passport.gender = genderOption === "Man" ? 'M' : 'W';

    setUserDocuments(passport, dispatch);
    snackbarRef.current.show();
  }

  const handleKeyUpDate = (e) => {
    setPassport(prev => ({
      ...prev,
      "issue_date": e.target.value
    }))

    if (e.key !== "Backspace") {
      var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
      if (i >= 1) num.splice(2, 0, '.');
      if (i >= 3) num.splice(5, 0, '.');
      e.target.value = num.join('');
    }

  }

  const handleKeyUpId = (e) => {
    setPassport(prev => ({
      ...prev,
      "id": e.target.value
    }))

    if (e.key !== "Backspace") {
      var num = e.target.value.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
      if (i >= 3) num.splice(4, 0, ' ');
      e.target.value = num.join('');
    }

  }

  const onInputChange = e => {
    var { name, value } = e.target;

    setPassport(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const myContainer = useRef(null);

  const snackbarRef = useRef(null);

  const onEraseForm = () => {
    myContainer.current.reset()
  }

  return (
    <form className={styles.section} ref={myContainer}>
      <div className={styles.head}>
        <div className={cn("h2", styles.title)}>Documents</div>
      </div>
      {pending && <Loader className={styles.loader} />}
      {!pending ? (
        <div className={styles.list}>
          <div className={styles.item}>
            <div className={styles.fieldset}>
              <div className={styles.row}>
                <div className={styles.col}>
                  <div className={styles.label}>Citizenship</div>
                  <input
                    className={styles.input}
                    name="citizen"
                    type="text"
                    placeholder="Russia"
                    disabled={true}
                  />
                </div>
                <div className={styles.col}>
                  <div className={styles.label}>Document type</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={document}
                    setValue={setDocument}
                    options={optionsDocs}
                  />
                </div>
                <div className={styles.col}>
                  <div className={styles.label}>Gender</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={genderOption}
                    setValue={setGender}
                    options={optionsGender}
                  />
                </div>
              </div>

              <div className={styles.category}>
                {
                  document === 'Passport' ? 'Passport data'
                    : 'Visa'
                }
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <TextInput
                    label={"Surname"}
                    className={styles.field}
                    onChange={onInputChange}
                    name="surname"
                    type="tel"
                    placeholder={userInfo.passport != null ? userInfo.passport.surname : "Your surname"}
                    required
                  />
                </div>
                <div className={styles.col}>
                  <TextInput
                    label={"Name"}
                    className={styles.field}
                    onChange={onInputChange}
                    name="name"
                    placeholder={userInfo.passport != null ? userInfo.passport.name : "Your name"}
                    required
                  />
                </div>
                <div className={styles.col}>
                  <TextInput
                    label={"Issue date"}
                    className={styles.field}
                    maxLength="10"
                    onKeyUp={handleKeyUpDate}
                    name="issue_date"
                    placeholder={userInfo.passport != null ? "Issued at " + Moment(userInfo.passport.issue_date).format("DD/MM/YYYY") : "DD.ММ.YYYY"}
                    required
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <TextInput
                    label={"ID"}
                    className={styles.field}
                    onKeyUp={handleKeyUpId}
                    name="id"
                    maxLength="11"
                    placeholder={userInfo.passport != null ? userInfo.passport.id.substring(0, 4) + "  " + userInfo.passport.id.substring(4, userInfo.passport.id.length) : "0000 000000"}
                    required
                  />
                </div>
                {document === 'Visa' &&
                  <div className={styles.col}>
                    <TextInput
                      label={"Expiry date"}
                      className={styles.field}
                      name="fp-id"
                      placeholder={userInfo.passport != null ? "Expire at " + Moment(userInfo.passport.issue_date).format("DD/MM/YYYY") : "DD.ММ.YYYY"}
                      required
                    />
                  </div>
                }
              </div>
              {!pending && error ? <span className={styles.error}>{errorText}</span> : null}
            </div>
          </div>
        </div>) : null}
        <div className={styles.controls}>
        <button className={cn("button", styles.button)} type="button" onClick={handleSubmit}>Update document</button>
        <button className={styles.clear} type="button" onClick={onEraseForm}>
          <Icon name="close" size="16"/>
          Reset fields
        </button>
      </div>

      {error ?
        <Snackbar
          ref={snackbarRef}
          message="An error occured"
          type={SnackbarType.error}
        /> :
        <Snackbar
          ref={snackbarRef}
          message="Your data has been updated"
          type={SnackbarType.success}
        />
      }
    </form>
  );
};

export default Documents;
