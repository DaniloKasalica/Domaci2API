
const Product = require('../model/productmongo');
const user = require('./user')
const mongoose = require('mongoose')
const productservice = {
findall: async()=>{
    return await Product.find()
},
find: async (options)=>{

    const res= await Product.find(options).exec()
    return res
},
delete: async(productname)=>{
    
    const res = await Product.findOneAndRemove({name:productname}).exec()
    return res
},
update: async (productname,doc)=>{
    const res = await  Product.findOneAndUpdate({name:productname}, { $set: doc}).exec()
    return res
    },
add: async (doc)=>{
    return await Product(doc).save()
},
findById: async(id)=>{
    return await Product.findById(id).exec()
},
deleteById: async(id)=>{
    return await Product.findByIdAndRemove(id)
},
updateById: async(id,doc)=>{
    
    const res = await  Product.findOneAndUpdate({_id:id}, { $set: doc}).exec()
    return res
}
}
module.exports = {
    productservice
}
