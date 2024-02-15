import { createSlice ,current} from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers:{
         addItem: (state,action)=>{
            //mutating state 

         state.items.push(action.payload);
  },
        removeItem: (state) =>{
           state.items.pop();
        },
//originalState=["pizza"];
     clearCart: (state)=>{
        
          //RTK said either mutate state or return a new state. 
         // state=['akshay'];only changing the reference.
        return{items:[]};//this new []will be replace originalstate.

 },
    },
});


export const{addItem,removeItem,clearCart}=cartSlice.actions;
export default cartSlice.reducer;