
const product = require('../service/product')
const user = require('../service/user');

const controller = {
    addnewuser: async (doc)=>{
        try{
        const  result =  await  user.userservice.add(doc)
        return Promise.resolve(result._id)
        }
      catch(err){
         return Promise.reject(err)
    }
},
    deleteuser: async(username)=>{
        try{
       const res =  await user.userservice.delete(username)
            return Promise.resolve(res._id)
    }catch(err){
            return Promise.reject(err)
        }
    },
    updateuser: async(username,doc)=>{
        try{
            const res =  await user.userservice.update(username,doc)
            return Promise.resolve(res._id)

    }catch(err){
          return  Promise.reject(err)
        }
    }
}
module.exports={
    controller
}