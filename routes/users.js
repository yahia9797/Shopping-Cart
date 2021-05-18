var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const passport = require('passport')



/* GET users listing. */
router.get('/signup',isNotSignin, function(req, res, next) {
  var messageError = req.flash('signupError')
  res.render('user/signup', {messages : messageError });
});

router.post('/signup',[
  check('email').not().isEmpty().withMessage('please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('Password').not().isEmpty().withMessage('please enter your password'),
  check('Password').isLength({min : 5 }).withMessage('please enter password more than 5 charcters'),
  check('Confirm-Password').custom((value , {req})=>{
    if(value !== req.body.Password){
      throw new Error('password and confirm-password not matched')
    }
    return true ;


  })
], (req , res , next)=>{
  const errors = validationResult(req);
if (! errors.isEmpty()){

var validationMessage = [];
for (var i = 0 ; i< errors.errors.length; i++){
  validationMessage.push(errors.errors[i].msg)
}
req.flash('signupError',validationMessage)
res.redirect('signup')
return
}
next()
},passport.authenticate('local-signup',{
  session :false ,
  successRedirect: 'signin',
  failureRedirect : 'signup' ,
  failureMessage : true 

}))

router.get('/profile', isSignin ,(req , res , next)=>{
if(req.user.cart){
  totalProducts = req.user.cart.totalquantity
}else{
  totalProducts = 0
}

  res.render('user/profile',{checkuser : true , checkProfile :true , totalProducts : totalProducts})
})

router.get('/signin',isNotSignin, (req , res , next)=>{
  var messagesError = req.flash('signinError')

  res.render('user/signin', {messages : messagesError })
})

router.post('/signin',[
  check('email').not().isEmpty().withMessage('please enter your email'),
  check('email').isEmail().withMessage('please enter valid email'),
  check('Password').not().isEmpty().withMessage('please enter your password'),
  check('Password').isLength({min : 5 }).withMessage('please enter password more than 5 charcters'),
],(req , res , next)=>{
  const errors = validationResult(req);
  if (! errors.isEmpty()){
  
  var validationMessage = [];
  for (var i = 0 ; i< errors.errors.length; i++){
    validationMessage.push(errors.errors[i].msg)
  }
  req.flash('signinError',validationMessage)
  res.redirect('signin')
  return
  
}

next()

}, passport.authenticate('local-signin',{
  session :true ,
  successRedirect :'profile',
  failureRedirect: 'signin',
  failureFlash :true ,
}))

router.get('/logout',isSignin, (req , res ,next)=>{
  req.logOut()
  res.redirect('/')

})


function isSignin(req ,res , next){
  if (! req.isAuthenticated()){
    res.redirect('signin')
    return
  }
  next()
}

function isNotSignin (req ,res , next){
  if (req.isAuthenticated()){
    res.redirect('/')
    return
  }
  next()
}
module.exports = router
