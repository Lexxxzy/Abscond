import React, { useRef, useState } from "react";
import styles from "./DocumentsInfo.module.sass";
import TextInput from "../../TextInput";
import Dropdown from "../../Dropdown";

const optionsDocs = ["Passport"/*, "Visa"*/];
const optionsGender = ["Man", "Woman"]

const PassportForm = ({passport, setPassport, genderOption, setGender}) => {
  
  const [document, setDocument] = useState(optionsDocs[0]);

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


  return (
    <form className={styles.section} ref={myContainer}>
      
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
                  Passport info
              </div>
              <div className={styles.row}>
                <div className={styles.col}>
                  <TextInput
                    label={"Surname"}
                    className={styles.field}
                    onChange={onInputChange}
                    name="surname"
                    type="tel"
                    placeholder="Your surname"
                    required
                  />
                </div>
                <div className={styles.col}>
                  <TextInput
                    label={"Name"}
                    className={styles.field}
                    onChange={onInputChange}
                    name="name"
                    placeholder="Your name"
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
                    placeholder= "DD.ММ.YYYY"
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
                    placeholder="0000 000000"
                    required
                  />
                </div>
                {document === 'Visa' &&
                  <div className={styles.col}>
                    <TextInput
                      label={"Expiry date"}
                      className={styles.field}
                      name="fp-id"
                      placeholder="DD.ММ.YYYY"
                      required
                    />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
    </form>
  );
};

export default PassportForm;
