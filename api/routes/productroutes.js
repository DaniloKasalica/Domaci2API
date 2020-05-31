const express = require('express');
const { json, urlencoded } = require('body-parser')
const auth = require('../middleware/auth');
const search = require('../controler/search');
const products= require('../controler/product.js')
const validation = require('../middleware/val')
const router = express.Router();
//(/product/)

const test = require('../controler/group') // dodatna funkcija za grupisanje 
router.get('/test',async(req,res,next)=>{
  res.json(await test())
})
router.post('/',validation.productvalidation, auth.cpassword.authenticateToken, async(req,res,next)=>{
  try{
    console.log(req.params.name)
  const newprod = await products.controller.addproduct(req.body,req.params.name)
   res.status(200).send(newprod)
   next()
  }catch(err){
    res.status(404).send({ error: err.message })
  }
})


// ?min =num1 & max = num2 (price)
router.get('/', async(req,res,next)=>{ 
  let minprice = 1;
  let maxprice = 10000;
  if(req.query.min){
    minprice = req.query.min 
  }
  if(req.query.max){
   maxprice = req.query.max
  }
  const result =  await search.productsearch.searchbyprice(minprice,maxprice)
  res.json(result)
  next()
})

router.get('/:productname',async(req,res,next)=>{
  const doc = await search.productsearch.searchbyname(req.params.productname)
  res.json(doc)
  next()
})
router.put('/:productname',validation.productvalidation, auth.cpassword.authenticateToken,async (req,res,next)=>{
  const productname = req.params.productname;
  try{
  const data = await  products.controller.update(productname,req.body);
  res.json(data);
  next()
  }catch(err){
    res.status(400).send({error: err})
  }
})
router.delete('/:name',auth.cpassword.authenticateToken,async(req,res,next)=>{
  const result = await products.controller.delete(req.params.name);
  res.send(result)
  next()
})
module.exports=router;