const product = require('../service/product')
const user = require('../service/user');


class MyObj{
    constructor(username, products){
        this.username = username;
        if(products.length ===0 )
        this.productsprice = 0;
        else{
        this.productsprice = products.map((elem)=>{
            return elem.price
        }).reduce((res,elem)=>{
            return res +elem
        })
            
        }
}}
const getproducts = async(allusers) =>{ 
    return  Promise.all( allusers.map((elem)=>{
     return user.userservice.userproducts(elem.username);
})

)}
const possiblearn = async()=>{
    const array = []
    const users = await user.userservice.findall({})
    const products =await getproducts(users) // niz nizova objekata
    let i = 0;
    products.forEach((elem)=>{
        array.push(new MyObj(users[i++].username, elem))
    })
    return array
 
}

module.exports = possiblearn