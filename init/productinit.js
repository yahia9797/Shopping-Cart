const Product = require('../models/product')

const mongoose = require ('mongoose')
mongoose.connect('mongodb://localhost/shopping-cart')
  if(error){
    console.log(error)
  }else{
    console.log('Connecting to db..')
  }

var Products  =  [
new Product({
    
   
   
    imagepath:'/images/iphone-12-pro-max-gold-hero_1.jpg',

    productName:'iphone 12 pro' ,

    information: {
        CameraResolution: 12 ,
        Ram: 6 ,
        Networkingtopology : '5g' ,
    } ,

    price :506,
}),
new Product ({


    imagepath:'/images/eg-galaxy-s21-5g-g996-sm-g996bzvgmea-368372208.jpg',

    productName:'s21' ,

    information: {
        CameraResolution: 4 ,
        Ram: 3 ,
        Networkingtopology : '5g' ,
    } ,

    price :15.000 ,
}),
new Product ({


    imagepath:'/images/swappie-product-iphone-12-pro-max-gold.jpg' ,

    productName:'i phone 12 pro max' ,

    information: {
        CameraResolution: 15 ,
        Ram: 8 ,
        Networkingtopology : '5g' ,
    } ,

    price :22.000 ,
}),
new Product ({


    imagepath: "images/levant-galaxy-s20-plus-g985-bts-sm-g985fzpdmid-frontbpurple-thumb-261902311.jpg" ,

    productName:'samsung s20' ,

    information: {
        CameraResolution: 15 ,
        Ram: 8 ,
        Networkingtopology : '5g' ,
    } ,

    price :30.000 ,
}),
new Product ({


    imagepath:"images/Samsung-Galaxy-A71.jpg",

    productName:'a71' ,

    information: {
        CameraResolution: 15 ,
        Ram: 8 ,
        Networkingtopology : '5g' ,
    } ,

    price :10.000 ,
}),
new Product ({


    imagepath:'/images/samsung-galaxy-note-20-ultra-black_1.jpg',

    productName:'note 20' ,

    information: {
        CameraResolution: 2 ,
        Ram: 2 ,
        Networkingtopology : '2g' ,
    } ,

    price :60.000 ,
})

]
var done = 0;
for (var i = 0; i < Products.length; i++) {
    Products[i].save((error, doc)=> {
        if(error){
            console.log(error)
        }
        console.log(error)
        done++;
        if (done === Products.length) {
            mongoose.disconnect();      
         }
    });
}

   