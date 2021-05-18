var express = require('express');
var router = express.Router();

const product = require('../models/product');
const Cart = require('../models/Cart');
/* GET home page. */
router.get('/', function (req, res, next) {
  var totalProducts = null;
  if (req.isAuthenticated()) {
    if (req.user.cart) {
      totalProducts = req.user.cart.totalquantity
    } else {
      totalProducts = 0
    }
  }

  product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('index', {
      title: 'Shopping Cart',
      Products: docs,
      checkuser: req.isAuthenticated(),
      totalProducts: totalProducts
    })

  });
});

router.get('/addTocart/:id/:price/:name', (req, res, next) => {


  const cartID = req.user._id;

  const newProductprice = parseInt(req.params.price, 10)
  const newProduct = {
    _id: req.params._id,
    price: newProductprice,
    name: req.params.name,
    quantity: 1
  }

  Cart.findById(cartID, (error, cart) => {
    if (error) {
      console.log(error)
    }
    if (!cart) {
      const newcart = new Cart({
        _id: cartID,
        totalquantity: 1,
        totalPrice: newProductprice,
        selectedProduct: [newProduct],

      })
      newcart.save((error, doc) => {
        if (error) {
          console.log(error)
        }
        console.log(doc)

      })
    }
    if (cart) {
      var indexofproduct = -1
      for (var i = 0; i < cart.selectedProduct.length; i++) {
        if (req.params.id === cart.selectedProduct[i]._id) {
          indexofproduct = i;
          break
        }
      }
      if (indexofproduct >= 0) {
        cart.selectedProduct[indexofproduct].quantity = cart.selectedProduct[indexofproduct].quantity + 1
        cart.selectedProduct[indexofproduct].price = cart.selectedProduct[indexofproduct].price + newProductprice
        cart.totalquantity = cart.totalquantity + 1;
        cart.totalprice = cart.totalprice + newProductprice

        Cart.updateOne({ _id: cartID }, { $set: cart }, (error, doc) => {
          if (error) {
            console.log(error)
          }
          console.log(doc)
          console.log(cart)
        })

      } else {
        cart.totalquantity = cart.totalquantity + 1;
        cart.totalprice = cart.totalprice + newProductprice
        cart.selectedProduct.push(newProduct)
        Cart.updateOne({ _id: cartID }, { $set: cart }, (error, doc) => {
          if (error) {
            console.log(error)
          }
          console.log(doc)
          console.log(cart)
        })
      }
    }
  })


    res.redirect('/')

  })
  router.get('/shopping-cart', (req , res, next )=>{
    if(!req.isAuthenticated()){
      res.redirect('/users/signin')
      return
    }
 if(!req.user.cart){
   res.redirect('/')
   return
 }
 const userCart = req.user.cart
 res.render('shoppingcart', {userCart: userCart})
  })
module.exports = router;
