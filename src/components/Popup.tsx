import React, { FC, useEffect, useState } from "react";
import CreditCard from "./popup/CreditCard";
import { useNavigate } from "react-router-dom";
import ValidError from "./elements/ValidError";
import { inputValidation } from "../scripts/validationValues";
import { Ipopup } from "../scripts/interfaces";

const Popup: FC<Ipopup> = (props) => {
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
  const [isHidePop, setIsHidePop] = useState<boolean>(false);
  const [lastVal, setLastVal] = useState<string>();

  

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

  const confirmForm = (): void => {
    if (isAllValid()) {
      setIsHidePop(true);
      localStorage.setItem("cart", "[]");
      setTimeout(() => {
        history("/");
      }, 4000);
    }
  }

  
  const setSlash = (elem: { target: HTMLInputElement }): void => {
    const isSlashNeeded : boolean = String(lastVal).length < elem.target.value.length && elem.target.value.length === 2
    if (isSlashNeeded) {
      elem.target.value += "/";
    }
    setLastVal(elem.target.value);
  };
  const blurHandler = (name: string, value: string): void => {
    switch (name) {
      case inputValidation.name:
        if (value.split(" ").length > 1) {
          const isDirty : number =  value.split(" ")[0].length > 3 && value.split(" ")[1].length > 3 ? CORRECT : NOT_CORRECT;
          setNameDirty(isDirty);
        } else {
          setNameDirty(NOT_CORRECT);
        }
        break;
      case inputValidation.number:
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
      case inputValidation.address:
        if (value.split(" ").length > 2) {
          let address = value.split(" ");
          setAddressDirty(
            address[0].length > 4 && address[1].length > 4 && address[2].length > 4
              ? CORRECT
              : NOT_CORRECT
          );
        } else {
          setAddressDirty(NOT_CORRECT);
        }
        break;
      case inputValidation.email:
        let mailCheck = /\S+@\S+\.\S+/;
        setEmailDirty(mailCheck.test(value) ? CORRECT : NOT_CORRECT);
        break;
      case inputValidation.card:
        setCvv(parseInt(value[0]));
        setCardDirty(
          value.length === 16 &&
            parseInt(value.replaceAll(" ", "")) + "" ===
              value.replaceAll(" ", "")
            ? 0
            : NOT_CORRECT
        );
        break;
      case inputValidation.valid:
        const valueWithoutSlash = value.replaceAll(" ", "").replace("/", "")
        setValidDirty(
          value.length === 5 &&
            parseInt(value.split("/")[0]) < 13 &&
            parseInt(value.split("/")[1]) < 32 &&
            String(parseInt(valueWithoutSlash)) ===
            valueWithoutSlash
            ? CORRECT
            : NOT_CORRECT
        );
        break;
      case inputValidation.code:
        setCodeDirty(value.length === 3 ? CORRECT : NOT_CORRECT);
        break;
    }
  };

  useEffect(() => {
    setIsHidden(props.hidden);
  }, [props.hidden]);

  const hide = () => {
    setIsHidden(!isHidden);
    props.reverse();
  }

  return (
    <div className={isHidden ? "" : "hidden"}>
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
              <ValidError/>
            )}
            <input
              onBlur={(e) => blurHandler(inputValidation.name, e.target.value)}
              type="text"
              className="name"
              placeholder="Name"
            />
            {numberDirty > 0 && (
              <ValidError/>
            )}
            <input
              onBlur={(e) => blurHandler(inputValidation.number, e.target.value)}
              type="text"
              className="number"
              placeholder="Phone number"
            />
            {addressDirty > 0 && (
              <ValidError/>
            )}
            <input
              onBlur={(e) => blurHandler(inputValidation.address, e.target.value)}
              type="text"
              className="address"
              placeholder="Delivery address"
            />
            {emailDirty > 0 && (
              <ValidError/>
            )}
            <input
              onBlur={(e) => blurHandler(inputValidation.email, e.target.value)}
              type="email"
              className="email"
              placeholder="email"
            />
          </div>
          <CreditCard 
            cvv={cvv}
            blurHandler={blurHandler}
            setSlash={setSlash}
            cardDirty={cardDirty}
            validDirty={validDirty}
            codeDirty={codeDirty}
            />
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
