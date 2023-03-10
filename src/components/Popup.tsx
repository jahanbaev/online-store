import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import visa from './../assets/icons/Visa_Inc._logo.png'
import master from './../assets/icons/Mastercard-logo.png'
import unionPay from './../assets/icons/UnionPay_logo.png'

const Popup: React.FunctionComponent<{
    reverse: ()=>boolean;
    hidden : boolean}> = (props) => {
    const history = useNavigate();
    const [nameDirty, setNameDirty] = useState(-1)
    const [numberDirty, setNumberDirty] = useState(-1)
    const [addressDirty, setAddressDirty] = useState(-1)
    const [emailDirty, setEmailDirty] = useState(-1)
    const [cardDirty, setCardDirty] = useState(-1)
    const [validDirty, setValidDirty] = useState(-1)
    const [codeDirty, setCodeDirty] = useState(-1);
    const [cvv, setCvv] = useState(300);
    const [hidden, setHidden] = useState(false);
    const [hidepop, setHidepop] = useState(false);


    const isAllValid = () : boolean =>{
        let isValid: number = 1;
        if(!!nameDirty){
            setNameDirty(1);
            isValid = 0
        }
        if(!!numberDirty){
            setNumberDirty(1);
            isValid = 0
        }
        if(!!addressDirty){
            setAddressDirty(1);
            isValid = 0
        }
        if(!!emailDirty){
            setEmailDirty(1);
            isValid = 0
        }
        if(!!cardDirty){
            setCardDirty(1);
            isValid = 0
        }
        if(!!validDirty){
            setValidDirty(1);
            isValid = 0
        }
        if(!!codeDirty){
            setCodeDirty(1);
            isValid = 0
        }
        return !!isValid
    }

    function confrimForm(){
        if(isAllValid()){
            setHidepop(true)
            localStorage.setItem("cart",'[]')
            setTimeout(() => {
                history("/")
            }, 4000);
            
        }
    }

    let lastVal: string = ""
    const setSlash = (e: {target: HTMLInputElement}):void => {
        if(lastVal.length < e.target.value.length && e.target.value.length === 2) {
            e.target.value += "/"   
        }
        lastVal = e.target.value 
    }
    const blurHandler = (e : string, value: string): void => {
        switch (e) {
            case 'name':
              if(value.split(" ").length > 1){
                setNameDirty((value.split(" ")[0].length > 3 && value.split(" ")[1].length > 3)?0:1)
              }else{
                setNameDirty(1)
              }
                break;
            case 'number':
                if(value[0] === "+" && value.length > 9 && parseInt(value.replaceAll(" ","")) + '' === value.replace("+","").replaceAll(" ","")){
                    setNumberDirty(0)
                }else{
                    setNumberDirty(1)
                }
                
                break;
            case 'address':
                if(value.split(" ").length > 2){
                    let i = value.split(" ");
                    setAddressDirty((i[0].length > 4 && i[1].length > 4 && i[2].length > 4)?0:1)   
                }else{
                    setAddressDirty(1)
                }
                break;
            case 'email':
                var re = /\S+@\S+\.\S+/;
                setEmailDirty(re.test(value)?0:1)
                break;
            case 'card':
                setCvv(parseInt(value[0]))
                setCardDirty(value.length === 16 && parseInt(value.replaceAll(" ","")) + "" === value.replaceAll(" ","")?0:1)
                break;
            case 'valid':
                setValidDirty((value.length === 5 && parseInt(value.split("/")[0]) < 13 && parseInt(value.split("/")[1]) < 32 && parseInt(value.replaceAll(" ","").replace("/","")) + "" === value.replaceAll(" ","").replace("/",""))?0:1)
                break;
            case 'code':
                setCodeDirty((value.length === 3)?0:1)
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
            <div className={(hidepop)?'z-full w-[100%] flex justify-center items-center h-[100%] absolute top-0 left-0':'hidden'}>
                <div className='bg-white w-96 h-64 flex flex-col justify-center items-center'>
                   <h1 className='text-green-600 text-4xl'>order is processed</h1>
                   <p className='opacity-75 text-lg'>please wait...</p>
                </div>
            </div>
            <form className={(!hidepop)?"card":"hidden"}>
                <div className="personal-details">
                    <h4>Personal details</h4>
                    {(nameDirty > 0) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler("name",e.target.value)}
                            type="text"
                            className="name"
                            placeholder="Name"
                    />
                    {(numberDirty > 0) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler('number',e.target.value)}
                            type="text"
                            className="number"
                            placeholder="Phone number"
                    />
                    {(addressDirty > 0) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler('address',e.target.value)} 
                            type="text"
                            className="address"
                            placeholder="Delivery address"
                    />
                    {(emailDirty > 0) && <div className="text-red-600 text-left w-[80%] m-auto">Error</div>}
                    <input onBlur={e => blurHandler('email',e.target.value)} 
                            type="email" 
                            className="email"
                            placeholder="email" 
                    />
                </div>
                <div className="credit-card">
                    <h4>Credit card details</h4>
                    <div className="credit">
                        <img src={(cvv === 4)?visa:(cvv === 5)?master:unionPay} 
                             className="absolute top-2 z-20 left-5 w-9"
                             alt="" 
                        />
                        {(cardDirty > 0) && <div className="text-red-600 text-left absolute bottom-14">Error</div>}
                        <input onBlur={(e) => blurHandler('card',e.target.value)} 
                                type="number"
                                className="card-number text-white"
                                placeholder="Card number"
                        />
                        <div className="card-data">
                            {(validDirty > 0) && <div className="text-red-600 text-left">Error</div>}
                            <label htmlFor="">Valid:</label>
                            <input name='valid' 
                                    maxLength={5}
                                    className="text-white"
                                    onChange={setSlash}
                                    onBlur={(e) => blurHandler('valid',e.target.value)}
                                    type="text" placeholder="Valid Thru" 
                            />
                            {(codeDirty > 0) && <div className="text-red-600 text-left">Error</div>}
                            <label htmlFor="">CVV</label>
                            <input className='bg-opacity-25 bg-white text-white'
                                    maxLength={3} onBlur={(e) => blurHandler("code",e.target.value)} 
                                    type="number" 
                                    placeholder="Code"
                            />
                        </div>
                    </div>
                </div>
                <button type='button' onClick={()=>confrimForm()} className="confirm">confirm</button>
            </form>
        </div>
    </div>
}
export default Popup