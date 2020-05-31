
const product = require('../service/product')
const user = require('../service/user')

const productsearch = {

    searchbyname: async (productname) =>{
       const regexp = new RegExp(`^${productname}`,"i");
       const res =  await product.productservice.find({name :regexp})
       return res

    },
    searchbyprice: async(min,max)=>{
        console.log(max)
        console.log(min)
        const res = await product.productservice.find({price: {
            $gt:min,
            $lt:max
        }
    })
        return res
    }
}
const usersearch = {
    findbyusername: async(username) =>{
        const res = await user.userservice.find(username)
        return res;

    },
    searchwhatever: async(options={})=>{
           const res =  await user.userservice.findall(options);
           return res;
},
     userproducts: async(username, id='')=>{
    if(id!==''){

      return (await user.userservice.userproducts(username)).products.filter(elem=>{
        return elem.id===id
    });
    
    }else
    return await user.userservice.userproducts(username)
}

}
module.exports = {
    productsearch,
    usersearch
}