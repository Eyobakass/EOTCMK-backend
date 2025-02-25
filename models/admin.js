const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config');
const adminSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
adminSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},config.get('jwtPrivateKey'));
    return token;
}

const Admin=mongoose.model('admin',adminSchema);
module.exports = Admin;