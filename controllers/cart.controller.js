const Product = require('../models/product.model');

function getCart(req, res) {
    res.render('customer/cart/cart');
}

async function addCartItem (req, res, next) {
    let product;
    try {
        product = await Product.findById(req.body.productId);
    } catch(error) {
    next(error);
    return;
    }

    const cart = res.locals.cart; //utility constant
    cart.addItem(product);
    req.session.cart = cart;

    res.status(201).json({
        message: 'cart has been updated!',
        newTotalItems: cart.totalQuantity
    });
}

function updateCartItem(req, res) {
    
    const cart = res.locals.cart;
   

    const updatedItemData = cart.updateItem(req.body.productId, req.body.quantity);
    
    req.session.cart = cart;

    res.json({
        message: 'Item Updated!',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        },
    });
}

module.exports = {
    addCartItem,
    getCart,
    updateCartItem
}