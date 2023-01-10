import React, { FC } from "react";
import ValidError from "../elements/ValidError";
import { inputValidation } from "../../scripts/validationValues";
import { IcreditCart } from "../../scripts/interfaces";
import visa from '../../assets/icons/Visa_Inc._logo.png'
import master from "../../assets/icons/Mastercard-logo.png";
import unionPay from "../../assets/icons/UnionPay_logo.png";

const CreditCard: FC<IcreditCart> = (props) =>{
    return <div className="credit-card">
    <h4>Credit card details</h4>
    <div className="credit">
      <img
        src={props.cvv === 4 ? visa : props.cvv === 5 ? master : unionPay}
        className="absolute top-2 z-20 left-5 w-9"
        alt=""
      />
      {props.cardDirty > 0 && (
        <div className="text-red-600 text-left absolute bottom-7 w-[80%] m-auto">Error</div>
      )}
      <input
        onBlur={(e) => props.blurHandler(inputValidation.card, e.target.value)}
        type="number"
        className="card-number text-white"
        placeholder="Card number"
      />
      <div className="card-data">
        {props.validDirty > 0 && (
          <ValidError/>
        )}
        <label htmlFor="">Valid:</label>
        <input
          name="valid"
          maxLength={5}
          className="text-white"
          onChange={props.setSlash}
          onBlur={(e) => props.blurHandler(inputValidation.valid, e.target.value)}
          type="text"
          placeholder="Valid Thru"
        />
        {props.codeDirty > 0 && (
          <ValidError/>
        )}
        <label htmlFor="">CVV</label>
        <input
          className="bg-opacity-25 bg-white text-white"
          maxLength={3}
          onBlur={(e) =>    props.blurHandler(inputValidation.code, e.target.value)}
          type="number"
          placeholder="Code"
        />
      </div>
    </div>
  </div>
}

export default CreditCard