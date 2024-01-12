export const roundDecimal=(number)=> {
    return (Math.round(number * 100) / 100);
  }

export const updatedState= (state)=>{
    
       //price
       state.priceItem = roundDecimal(
        state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
      );

      //shipping
      state.shippingItem = roundDecimal(state.priceItem > 100 ? 0 : 10);

      //tax price (15% of the total)
      state.taxItem = roundDecimal(Number((state.priceItem * 0.15).toFixed(2)));

      //total
      state.totalItem = 
      roundDecimal(
        Number(state.priceItem) +
        Number(state.shippingItem) +
        Number(state.taxItem)
      ).toFixed(2);
      
      localStorage.setItem("cart", JSON.stringify(state));
      return state;
}



