

const product = require('../service/product')
const user = require('../service/user');

const controller = {

 addproduct : async(doc, username) =>{
    try{
        const upuser =  await user.userservice.find(username);
        console.log(upuser)
        doc.user = upuser.id;
        const res = await product.productservice.add(doc)
        console.log(res)
        doc.user = upuser.username;
        upuser.products.push(res.id);
          await   user.userservice.update(username, upuser)
        return Promise.resolve(doc)
        }catch(err){
        return Promise.reject(err)
        }
},
 update : async(productname,doc)=>{
    try{
    const checkuser = await  user.userservice.find(name);
    if(checkuser.products.indexOf(id)===-1)
    throw new Error('Only can update your product')
    const updateprod =await product.productservice.update(productname,doc)
     return Promise.resolve(updateprod)
    }catch(err){
     return Promise.reject(err)
    }
},
delete: async(productname)=>{
    return await product.productservice.delete(productname)
},
deleteById: async(id,name)=>{
  try{
    const checkuser = await  user.userservice.find(name);
    if(checkuser.products.indexOf(id)===-1)
    throw new Error('Only can delete your product')
    const updateprod =await product.productservice.deleteById(id)
     return Promise.resolve(updateprod)
    }catch(err){
     return Promise.reject(err)
    }
},
findById: async(id)=>{
  return await product.productservice.findById(id)
},
updateById: async(id,doc,name)=>{
  try{
  const checkuser = await  user.userservice.find(name);
  if(checkuser.products.indexOf(id)===-1)
  throw new Error('Only update your product')
  const updateprod = await product.productservice.updateById(id,doc)
   return Promise.resolve(updateprod)
  }catch(err){
   return Promise.reject(err)
  }
}

}
module.exports={
    controller
}