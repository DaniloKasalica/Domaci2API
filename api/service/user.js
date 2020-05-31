
const User = require('../model/usermongo');
const mongoose = require('mongoose')
let userservice = {
    
userproducts: async(username)=>{
    const res = await User.findOne({username:username}).populate("products").exec();
    return res.products;
},
findall: async(options)=>{
    return await User.find(options).exec();
},
find: async (username)=>{
    const res= await User.findOne({username:username}).exec()
    return res

},
delete: async(username)=>{
    const res = await User.findOneAndRemove({username:username}).exec()
    return res;
},
update: async (username,doc)=>{
    const res = await  User.findOneAndUpdate({username:username},{ $set: doc}).exec()
    return res
    },
add: async (doc)=>{
    const res = await User(doc).save()
    return res;
    }

}
module.exports = {
    userservice
}