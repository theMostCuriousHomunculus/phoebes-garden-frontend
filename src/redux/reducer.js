import * as actions from './actions';

export default function (state = {}, action) {
  let productIndex;
  let newCart;
  switch (action.type) {
    case actions.CHANGE_QUANTITY:
      productIndex = state.cart.findIndex(x => x.productId === action.value.id);
      if (productIndex === -1) {
        newCart = state.cart.concat({
          productId: action.value.id,
          chosenQuantity: 1,
          availableQuantity: action.value.availableQuantity,
          description: action.value.description,
          image: action.value.image,
          name: action.value.name,
          price: action.value.price
        });
        localStorage.setItem(action.value.id, 1);
      } else {
        const productCopy = { ...state.cart[productIndex] };
        productCopy.chosenQuantity = action.value.quantity;
        newCart = state.cart.slice(0, productIndex).concat(productCopy).concat(state.cart.slice(productIndex + 1));
        localStorage.setItem(action.value.id, action.value.quantity);
      }
      return { cart: newCart };
    case actions.INITIALIZE_STORE:
      return { cart: action.value.cart };
    case actions.REMOVE_PRODUCT:
      productIndex = state.cart.findIndex(x => x.productId === action.value.id);
      if (productIndex !== -1) {
        newCart = state.cart.slice(0, productIndex).concat(state.cart.slice(productIndex + 1));
        localStorage.removeItem(action.value.id);
        return { cart: newCart };
      } else {
        return state;
      }
    default:
      return state;
  }
}