import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    cart: [cartType],
    login: false,
    totalPrice: 0,
}
const Slice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const data = {
                id: action.payload.id,
                numberOf: 1,
                image: action.payload.imageurl,
                name: action.payload.name,
                price: action.payload.price
            }
            state.cart.push(data)
            state.totalPrice += action.payload.price

        },
        IncreateQuantity: (state, action) => {
            state.cart.forEach(element => {
                if (element.id === action.payload.id) {
                    element.numberOf += 1;

                }
            });
            state.totalPrice += action.payload.price;
        },
        DecreateQuantity: (state, action) => {
            state.cart.forEach(element => {
                if (element.id === action.payload.id) {
                    element.numberOf -= 1;
                }
            })
            state.totalPrice -= action.payload.price;
        },
        RemoteCartItem: (state, action) => {
            let newCart = [];
            let removedItemPrice = 0;
            let removedItemQuantity = 0;

            state.cart.forEach(element => {
                if (element.id !== action.payload.id) {
                    newCart.push(element);
                } else {
                    removedItemPrice = element.price; 
                    removedItemQuantity = element.numberOf;
                }
            });

            state.totalPrice -= (removedItemPrice * removedItemQuantity);
            state.cart = newCart;
        },
        EmptyCartItem:(state)=>{
            state.cart = [],
            state.totalPrice=0
        },
        Logind: (state, action) => {
            state.login = action.payload;
        }
    }
})


export const { addToCart, IncreateQuantity, DecreateQuantity, Logind,RemoteCartItem,EmptyCartItem } = Slice.actions
export default Slice.reducer;