import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import visa from "./../assets/icons/Visa_Inc._logo.png";
import master from "./../assets/icons/Mastercard-logo.png";
import unionPay from "./../assets/icons/UnionPay_logo.png";
interface popup {
  reverse: () => boolean;
  hidden: boolean;
}

const Popup: FC<popup> = (props) => {
  const NOT_CHECKED = -1;
  const NOT_CORRECT = 1;
  const CORRECT = 0;

  const history = useNavigate();
  const [nameDirty, setNameDirty] = useState(NOT_CHECKED);
  const [numberDirty, setNumberDirty] = useState(NOT_CHECKED);
  const [addressDirty, setAddressDirty] = useState(NOT_CHECKED);
  const [emailDirty, setEmailDirty] = useState(NOT_CHECKED);
  const [cardDirty, setCardDirty] = useState(NOT_CHECKED);
  const [validDirty, setValidDirty] = useState(NOT_CHECKED);
  const [codeDirty, setCodeDirty] = useState(NOT_CHECKED);
  const [cvv, setCvv] = useState(300);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isHidePop, setIsHidepop] = useState<boolean>(false);

  const isAllValid = (): boolean => {
    let isValid: number = CORRECT;
    if (!!nameDirty) {
      setNameDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!numberDirty) {
      setNumberDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!addressDirty) {
      setAddressDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!emailDirty) {
      setEmailDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!cardDirty) {
      setCardDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!validDirty) {
      setValidDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    if (!!codeDirty) {
      setCodeDirty(NOT_CORRECT);
      isValid = NOT_CORRECT;
    }
    return !isValid;
  };

  function confirmForm() {
    if (isAllValid()) {
      setIsHidepop(true);
      localStorage.setItem("cart", "[]");
      setTimeout(() => {
        history("/");
      }, 4000);
    }
  }

  let lastVal: string = "";
  const setSlash = (elem: { target: HTMLInputElement }): void => {
    if (
      lastVal.length < elem.target.value.length &&
      elem.target.value.length === 2
    ) {
      elem.target.value += "/";
    }
    lastVal = elem.target.value;
  };
  const blurHandler = (e: string, value: string): void => {
    switch (e) {
      case "name":
        if (value.split(" ").length > 1) {
          setNameDirty(
            value.split(" ")[0].length > 3 && value.split(" ")[1].length > 3
              ? 0
              : 1
          );
        } else {
          setNameDirty(NOT_CORRECT);
        }
        break;
      case "number":
        if (
          value[0] === "+" &&
          value.length > 9 &&
          parseInt(value.replaceAll(" ", "")) + "" ===
            value.replace("+", "").replaceAll(" ", "")
        ) {
          setNumberDirty(CORRECT);
        } else {
          setNumberDirty(NOT_CORRECT);
        }

        break;
      case "address":
        if (value.split(" ").length > 2) {
          let i = value.split(" ");
          setAddressDirty(
            i[0].length > 4 && i[1].length > 4 && i[2].length > 4
              ? CORRECT
              : NOT_CORRECT
          );
        } else {
          setAddressDirty(NOT_CORRECT);
        }
        break;
      case "email":
        let re = /\S+@\S+\.\S+/;
        setEmailDirty(re.test(value) ? CORRECT : NOT_CORRECT);
        break;
      case "card":
        setCvv(parseInt(value[0]));
        setCardDirty(
          value.length === 16 &&
            parseInt(value.replaceAll(" ", "")) + "" ===
              value.replaceAll(" ", "")
            ? 0
            : NOT_CORRECT
        );
        break;
      case "valid":
        setValidDirty(
          value.length === 5 &&
            parseInt(value.split("/")[0]) < 13 &&
            parseInt(value.split("/")[1]) < 32 &&
            parseInt(value.replaceAll(" ", "").replace("/", "")) + "" ===
              value.replaceAll(" ", "").replace("/", "")
            ? CORRECT
            : NOT_CORRECT
        );
        break;
      case "code":
        setCodeDirty(value.length === 3 ? CORRECT : NOT_CORRECT);
        break;
    }
  };

  useEffect(() => {
    setIsHidden(props.hidden);
  }, [props.hidden]);

  function hide() {
    setIsHidden(!isHidden);
    props.reverse();
  }

  return (
    <div className={isHidden === true ? "" : "hidden"}>
      <div className="pop-up_buy">
        <div className="overlay" onClick={() => hide()}></div>
        <div
          className={
            isHidePop
              ? "z-full w-[100%] flex justify-center items-center h-[100%] absolute top-0 left-0"
              : "hidden"
          }
        >
          <div className="bg-white w-96 h-64 flex flex-col justify-center items-center">
            <h1 className="text-green-600 text-4xl">order is processed</h1>
            <p className="opacity-75 text-lg">please wait...</p>
          </div>
        </div>
        <form className={!isHidePop ? "card" : "hidden"}>
          <div className="personal-details">
            <h4>Personal details</h4>
            {nameDirty > 0 && (
              <div className="text-red-600 text-left w-[80%] m-auto">Error</div>
            )}
            <input
              onBlur={(e) => blurHandler("name", e.target.value)}
              type="text"
              className="name"
              placeholder="Name"
            />
            {numberDirty > 0 && (
              <div className="text-red-600 text-left w-[80%] m-auto">Error</div>
            )}
            <input
              onBlur={(e) => blurHandler("number", e.target.value)}
              type="text"
              className="number"
              placeholder="Phone number"
            />
            {addressDirty > 0 && (
              <div className="text-red-600 text-left w-[80%] m-auto">Error</div>
            )}
            <input
              onBlur={(e) => blurHandler("address", e.target.value)}
              type="text"
              className="address"
              placeholder="Delivery address"
            />
            {emailDirty > 0 && (
              <div className="text-red-600 text-left w-[80%] m-auto">Error</div>
            )}
            <input
              onBlur={(e) => blurHandler("email", e.target.value)}
              type="email"
              className="email"
              placeholder="email"
            />
          </div>
          <div className="credit-card">
            <h4>Credit card details</h4>
            <div className="credit">
              <img
                src={cvv === 4 ? visa : cvv === 5 ? master : unionPay}
                className="absolute top-2 z-20 left-5 w-9"
                alt=""
              />
              {cardDirty > 0 && (
                <div className="text-red-600 text-left absolute bottom-14">
                  Error
                </div>
              )}
              <input
                onBlur={(e) => blurHandler("card", e.target.value)}
                type="number"
                className="card-number text-white"
                placeholder="Card number"
              />
              <div className="card-data">
                {validDirty > 0 && (
                  <div className="text-red-600 text-left">Error</div>
                )}
                <label htmlFor="">Valid:</label>
                <input
                  name="valid"
                  maxLength={5}
                  className="text-white"
                  onChange={setSlash}
                  onBlur={(e) => blurHandler("valid", e.target.value)}
                  type="text"
                  placeholder="Valid Thru"
                />
                {codeDirty > 0 && (
                  <div className="text-red-600 text-left">Error</div>
                )}
                <label htmlFor="">CVV</label>
                <input
                  className="bg-opacity-25 bg-white text-white"
                  maxLength={3}
                  onBlur={(e) => blurHandler("code", e.target.value)}
                  type="number"
                  placeholder="Code"
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => confirmForm()}
            className="confirm"
          >
            confirm
          </button>
        </form>
      </div>
    </div>
  );
};
export default Popup;
