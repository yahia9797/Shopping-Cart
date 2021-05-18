const mongoose = require('mongoose');
var Schema = mongoose.Schema

const productschema = new Schema({
    imagepath: {
        type: String, 
        required: true,
        unique: true
       },

    productName:{
        type: String,
        required :true
    },
    information :{
        require :true,
        type:{
       CameraResolution: String,
       Ram: String,
       Networkingtopology : String,
        }
    },
    price:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Product',productschema)
