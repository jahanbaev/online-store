import React, { useEffect, useState } from 'react'
import visa from './../assets/icons/Visa_Inc._logo.png'
import master from './../assets/icons/Mastercard-logo.svg'
import union from './../assets/icons/UnionPay_logo.svg'

const Popup = (props : {
    reverse: ()=>boolean;
    hidden : boolean
}) => {
    const [nameDirty, setNameDirty] = useState(false)
    const [numberDirty, setNumberDirty] = useState(false)
    const [addressDirty, setAddressDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [cardDirty, setCardDirty] = useState(false)
    const [validDirty, setValidDirty] = useState(false)
    const [codeDirty, setCodeDirty] = useState(false)
    const [hidden, setHidden] = useState(false)


    const blurHandler = (e: { target: HTMLInputElement }) => {
        switch (e.target.name) {
            case 'name':
              if(e.target.value.split(" ").length > 1){
                setNameDirty((e.target.value.split(" ")[0].length > 3 && e.target.value.split(" ")[1].length > 3)?false:true)
              }else{
                setNameDirty(true)
              }
                break;
            case 'number':
                if(e.target.value[0] === "+" && e.target.value.length > 9 && parseInt(e.target.value.replaceAll(" ","")) + '' === e.target.value.replace("+","").replaceAll(" ","")){
                    setNumberDirty(false)
                }else{
                    setNumberDirty(true)
                }
                
                break;
            case 'address':
                if(e.target.value.split(" ").length > 2){
                    let i = e.target.value.split(" ");
                    setAddressDirty((i[0].length > 4 && i[1].length > 4 && i[2].length > 4)?false:true)   
                }else{
                    setAddressDirty(true)
                }
                break;
            case 'email':
                var re = /\S+@\S+\.\S+/;
                setEmailDirty(!re.test(e.target.value))
                break;
            case 'card':
                setCardDirty(true)
                break;
            case 'valid':
                setValidDirty(true)
                break;
            case 'code':
                setCodeDirty(true)
                break;
        }
    }

    useEffect(() => {
        setHidden(props.hidden)
    },[props.hidden])

    function hide(){
        setHidden(!hidden)
       props.reverse()
    }

    

    return <div  className={(hidden === true)?"":"hidden"}>
        <div className="pop-up_buy">
            <div className="overlay" onClick={()=>hide()}></div>
            <form className="card">
                <div className="personal-details">
                    <h4>Personal details</h4>
                    {(nameDirty) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='name' className="name" placeholder="Name" />
                    {(numberDirty) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='number' className="number" placeholder="Phone number" />
                    {(addressDirty) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='address' className="address" placeholder="Delivery address" />
                    {(emailDirty) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler(e)} type="email" name='email' className="email" placeholder="email" />
                </div>
                <div className="credit-card">
                    <h4>Credit card details</h4>
                    <div className="credit">
                        <img src={visa} className="absolute top-2 z-20 left-5 w-9" alt="" />
                        {(cardDirty) && <div className="text-red-600 text-left">Error</div>}
                        <input onBlur={(e) => blurHandler(e)} type="number" name='card' className="card-number" placeholder="Card number" />
                        <div className="card-data">
                            {(validDirty) && <div className="text-red-600 text-left">Error</div>}
                            <label htmlFor="">Valid:</label>
                            <input name='valid' onBlur={(e) => blurHandler(e)} type="text" placeholder="Valid Thru" />
                            {(codeDirty) && <div className="text-red-600 text-left">Error</div>}
                            <label htmlFor="">CVV</label>
                            <input className='bg-opacity-25 bg-white' name='code' maxLength={3} onBlur={(e) => blurHandler(e)} type="text" placeholder="Code" />
                        </div>
                    </div>
                </div>
                <button type='submit' className="confirm">confirm</button>
            </form>
        </div>
    </div>
}
export default Popup