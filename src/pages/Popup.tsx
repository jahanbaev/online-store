import React from 'react'

const Popup = () => {
    return <div>
        <div className="pop-up_buy">
            <div className="overlay"></div>
            <div className="card">
                <div className="personal-details">
                    <h4>Personal details</h4>
                    <input type="text" className="name" placeholder="Name" />
                    <input type="text" className="number" placeholder="Phone number" />
                    <input type="text" className="address" placeholder="Delivery address" />
                    <input type="email" className="email" placeholder="email" />
                </div>
                <div className="credit-card">
                    <h4>Credit card details</h4>
                    <div className="credit">
                        <input type="number" className="card-number" placeholder="Card number" />
                        <div className="card-data">
                            <label htmlFor="">Valid:</label>
                            <input type="text" placeholder="Valid Thru" />
                            <label htmlFor="">CVV</label>
                            <input type="text" placeholder="Code" />
                        </div>
                    </div>
                </div>
                <button className="confirm">confirm</button>
            </div>
        </div>
    </div>
}
export default Popup