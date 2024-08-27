import { useSelector, useDispatch } from "react-redux";
import { IncreateQuantity, DecreateQuantity ,RemoteCartItem } from "../redux/slice";
import Ordernow from "./Ordernow";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((data) => data.cartData.cart);
    const totalprice = useSelector((data)=>data.cartData.totalPrice)
    return (
        <div className="cart_container container">
            {
                cart.map((elem) => (
                    <div key={elem.id} className="cart_div">
                        <img className="cart_image" src={elem.image} alt="cart_photo" />
                        <div className="cart_item">
                            <span className="cart_label">Name</span>
                            <p className="cart_value">{elem.name}</p>
                        </div>
                        <div className="cart_item">
                            <span className="cart_label">Price</span>
                            <p className="cart_value">{elem.price}</p>
                        </div>
                        <div className="cart_item">
                            <span className="cart_label">Number Of</span>
                            <p className="cart_value">{elem.numberOf}</p>
                        </div>
                        <div className="cart_item">
                            <span className="cart_label">Total Price</span>
                            <p className="cart_value">{elem.price * elem.numberOf}</p>
                        </div>
                        <div className="cart_buttons">
                            <button 
                                onClick={() => dispatch(DecreateQuantity(elem))} 
                                disabled={elem.numberOf <= 1}>
                                -
                            </button>
                            <button onClick={() => dispatch(IncreateQuantity(elem))}>+</button>
                            <button onClick={()=>dispatch(RemoteCartItem(elem))}>x</button>
                        </div>
                    </div>
                ))
            }

            <p>Total Amount to Pay: {totalprice} ₹</p>
            <Ordernow/>
        </div>
    );
}

export default Cart;
