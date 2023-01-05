import React, { useState } from 'react'

const Popup = () => {
    const [nameDirty, setNameDirty] = useState(false)
    const [numberDirty, setNumberDirty] = useState(false)
    const [addressDirty, setAddressDirty] = useState(false)
    const [emailDirty, setEmailDirty] = useState(false)
    const [cardDirty, setCardDirty] = useState(false)
    const [validDirty, setValidDirty] = useState(false)
    const [codeDirty, setCodeDirty] = useState(false)

    const blurHandler = (e: { target: { name: string } }) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break;
            case 'number':
                setNumberDirty(true)
                break;
            case 'address':
                setAddressDirty(true)
                break;
            case 'email':
                setEmailDirty(true)
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

    return <div>
        <div className="pop-up_buy">
            <div className="overlay"></div>
            <form className="card">
                <div className="personal-details">
                    <h4>Personal details</h4>
                    {(nameDirty) && <div style={{ color: 'red' }}>Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='name' className="name" placeholder="Name" />
                    {(numberDirty) && <div style={{ color: 'red' }}>Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='number' className="number" placeholder="Phone number" />
                    {(addressDirty) && <div style={{ color: 'red' }}>Error</div>}
                    <input onBlur={e => blurHandler(e)} type="text" name='address' className="address" placeholder="Delivery address" />
                    {(emailDirty) && <div style={{ color: 'red' }}>Error</div>}
                    <input onBlur={e => blurHandler(e)} type="email" name='email' className="email" placeholder="email" />
                </div>
                <div className="credit-card">
                    <h4>Credit card details</h4>
                    <div className="credit">
                        {(cardDirty) && <div style={{ color: 'red' }}>Error</div>}
                        <input onBlur={(e) => blurHandler(e)} type="number" name='card' className="card-number" placeholder="Card number" />
                        <div className="card-data">
                            {(validDirty) && <div style={{ color: 'red' }}>Error</div>}
                            <label htmlFor="">Valid:</label>
                            <input name='valid' onBlur={(e) => blurHandler(e)} type="text" placeholder="Valid Thru" />
                            {(codeDirty) && <div style={{ color: 'red' }}>Error</div>}
                            <label htmlFor="">CVV</label>
                            <input name='code' onBlur={(e) => blurHandler(e)} type="text" placeholder="Code" />
                        </div>
                    </div>
                </div>
                <button type='submit' className="confirm">confirm</button>
            </form>
        </div>
    </div>
}
export default Popup