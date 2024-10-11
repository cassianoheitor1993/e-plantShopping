import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    addedToCart: {},
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if(existingItem){
            existingItem.quantity++;
        }else{
            state.items.push({name, image, cost, quantity: 1});
        }
        state.addedToCart[action.payload.name] = true;
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
        state.addedToCart[action.payload] = false;
    },
    updateQuantity: (state, action) => {
        const { name, quantity} = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if(itemToUpdate){
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export const selectTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectAddedToCart = state => state.cart.addedToCart;

export default CartSlice.reducer;
