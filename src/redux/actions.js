export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const INITIALIZE_STORE = 'INITIALIZE_STORE';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_CART = 'SET_CART';

export function changeQuantity (id, quantity) {
  return {
    type: CHANGE_QUANTITY,
    value: {
      id,
      quantity
    }
  };
}

export function initializeStore () {
  return async function (dispatch) {
    let cart = [];
    for (let i = 0; localStorage.key(i); i++) {
      cart.push({
        productId: localStorage.key(i),
        chosenQuantity: localStorage.getItem(localStorage.key(i))
      });
    }
    
    try {
      const products = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product?_id=${cart.map(item => item.productId).join(',')}`);
      const productsData = await products.json();
      for (let item of cart) {
        const product = productsData.find(x => x._id === item.productId);
        if (product) {
          item.availableQuantity = product.quantity;
          item.description = product.description;
          item.image = product.image;
          item.name = product.name;
          item.price = product.price;
        } else {
          // the item is no longer available so delete it from cart
          cart = cart.filter(x => x !== item);
          localStorage.removeItem(item.productId);
        }
      }
      dispatch(setCart(cart));
    } catch (error) {
      console.log(error);
      dispatch(setCart([]));
    }
  }
}

export function removeProduct (id) {
  return {
    type: REMOVE_PRODUCT,
    value: {
      id
    }
  };
}

export function setCart (cart) {
  return {
    type: INITIALIZE_STORE,
    value: {
      cart
    }
  };
}