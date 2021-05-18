const passport = require('passport')
const localStrategy = require('passport-local').Strategy ;
const User = require('../models/User');
const Cart = require('../models/Cart')

passport.serializeUser((user, done)=>{
return done(null ,user.id)
})
passport.deserializeUser((id , done)=>{
    User.findById(id ,('email'), (error , user)=>{
        Cart.findById(id , (error , cart)=>{
            if(!cart){
                return done(error , user)
            } else {
                user.cart = JSON.parse(JSON.stringify(cart))
                return done (error , user)
            }
            
        })
    })

})

passport.use('local-signin',new localStrategy({
    usernameField :'email' ,
    passwordField :'Password',
    passReqToCallback :true ,
} , (req , email , Password , done)=>{
User.findOne({email :email} , (error , user)=>{
if(error){
    return done(error)
}
if(! user){
    return done (null, false , req.flash('signinError' , 'this user not found'))
}
if (! user.comparePassword(Password)){
    return done (null , false , req.flash('signinError' , 'wrongPassword'))
}
return done (null, user)
})
}))


passport.use('local-signup' , new localStrategy({
    usernameField :'email',
    passwordField : 'Password',
    passReqToCallback :true ,
},(req , email , Password , done)=>{
    User.findOne({email :email}).lean()
    // execute query
    .exec((error , user)=>{
        if(error){
            console.log(error)
            return done(error)
        }
        console.log(user)
        if(user){
            return done(null , false , req.flash('signupError' , 'this email already exist'))
        }
        const newUser = new User({
            email : email ,
            Password : new User().hashPassword(Password)
        })
        newUser.save((error , user)=>{
            if(error){
                return done(error)
            }
            return done (null , user)
        })
    })
}))