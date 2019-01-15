const products = require('../models/products');
let cart = [];

const resolvers = {
  Query: {
    products() {
      return products;
    },
    product(root, { id } ) {
      let itemIndex = products.findIndex(product => {
        if(product.id == id) return true;
        else return false
      })
      if(itemIndex !== -1) {
        return products[itemIndex];
      } else {
        throw new Error(`No product with id: ${id}`);
      }
    },
    cart() {
      return cart;
    }
  },
  Mutation: {
    addProductToCart: (root, { id }) => {
      let product = cart.find(item => item.id == id);
      if(product) {
        product.quantity++;
      } else {
        let newProduct = products.find(item => item.id == id);
        if(!newProduct) {
          throw new Error(`No product with id ${id}`);
        }
        let clone = {
          ...newProduct,
          quantity: 1
        }
        cart.push(clone);
      }
      return cart;
    },
    removeProductFromCart: (root, { id }) => {
      let productIndex = cart.findIndex(item => {
        return item.id == id;
      })
      if(productIndex === -1) {
        throw new Error(`item with id ${id} is not in the cart!`)
      } else {
        cart.splice(productIndex, 1);
      }
      return id;
    },
    updateQuantity: (root, { id, change }) => {
      let cartItem = cart.find(item => item.id === +id);
      if(!cartItem) {
        throw new Error(`item with id ${id} is not in the cart!`)
      } else {
        if(change === 'up') {
          cartItem.quantity++;
        } else if (change === 'down' && cartItem.quantity > 0) {
          cartItem.quantity -= 1;
        }
      }
      return cartItem;
    }
  }
}

module.exports = resolvers;

