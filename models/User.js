const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
    email :{
    type: String,
    require:true 
    } ,

    Password :{
        type: String,
        require:true 
        }
})

UserSchema.methods.hashPassword = function(Password){
    return bcrypt.hashSync(Password , bcrypt.genSaltSync(5) , null)
}

UserSchema.methods.comparePassword = function(Password){
    return bcrypt.compareSync(Password, this.Password)
}
module.exports = mongoose.model('User', UserSchema)
