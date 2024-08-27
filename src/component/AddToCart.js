import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, IncreateQuantity, DecreateQuantity } from '../redux/slice';

const AddToCart = ({ elem }) => {
    const dispatch = useDispatch();
    const cart = useSelector((data) => data.cartData.cart);

    // Find the cart item that matches the current element
    const cartItem = cart.find(cartItem => cartItem.id === elem.id);

    return (
        <div>
            {
                cartItem ? (
                    <div className='cart_btn'>
                        <button 
                            onClick={() => dispatch(DecreateQuantity(elem))}
                            disabled={cartItem.numberOf === 1}
                        >
                            -
                        </button>
                        <p>{cartItem.numberOf}</p>
                        <button onClick={() => dispatch(IncreateQuantity(elem))}>
                            +
                        </button>
                    </div>
                ) : (
                    <div>
                        <button onClick={() => dispatch(addToCart(elem))}>
                            Add To Cart
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default AddToCart;
