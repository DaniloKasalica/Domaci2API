require('dotenv').config()

const express = require('express');
const auth = require('../middleware/auth')
const user = require('../controler/user');
const search = require('../controler/search')
const product = require('../controler/product')
const jwt = require('jsonwebtoken');
const val = require('../middleware/val')
const router = express.Router();

router.post('/',val.validation , auth.cpassword.addpassword, async (req,res,next)=>{ //sing in
  try{
    const newuserid = await  user.controller.addnewuser(req.body)
    res.send({id: newuserid})
    next()
  }catch(err)
  {
    res.status(404).send( { error: err.message})
  }

})

router.post('/login',auth.cpassword.login , async (req,res,next)=>{
  const key = req.body
  const accessToken = jwt.sign(key.username, process.env.ACCESS_TOKEN_SECRET);
  res.json({accessToken: accessToken})
})




//querry
router.get('/',async(req,res,next)=>{
  if(req.query.username  && req.query.id){
    let username =req.query.username ;
    let prodid = req.query.id;
    try{
      res.json(await search.usersearch.userproducts(username,prodid))
    }catch(err){
      res.sendStatus(404)
    }
  }else{
    res.status(400).send('Username and id query require for this action')
  }
})
router.put('/', auth.cpassword.authenticateToken, async(req,res,next)=>{
  if(req.query.username==req.params.name  && req.query.id){
    let username = req.query.username;
    let prodid = req.query.id;
    try{
      res.json(await product.controller.updateById(prodid,req.body,username))
      next()
    }catch(err){
      res.status(404).send({error: err.message})
    }
  }else{
    res.status(400).send('Username and id query required for this action and can update only your products')
  }
})
router.delete('/', auth.cpassword.authenticateToken, async(req,res,next)=>{
  if(req.query.username==req.params.name  && req.query.id){
    let username = req.query.username;
    let prodid = req.query.id;
    try{
      res.json(await product.controller.deleteById(prodid,username))
      next()
    }catch(err){
      res.status(404).send({error: err.message})
    }
  }else{
    res.status(400).send('Username and id query required for this action and can delete only your products')
  }
})




//params
router.get('/products/:name',async(req,res,next)=>{
    const products = await search.usersearch.userproducts(req.params.name);
    console.log(typeof(products))
    console.log(products)
    res.json(products)
    next()
})
//set req.param.name in authenticateToke
router.get('/:name',/*auth.cpassword.authenticateToken,*/ async(req,res,next)=>{
  const doc = await search.usersearch.searchwhatever({username:req.params.name}) // za sada vraca sve informacije o useru
  res.send(doc)
  next()
})
router.put('/:username',auth.cpassword.authenticateToken,val.validation,auth.cpassword.addpassword,  async (req,res,next)=>{ 
  const name = req.params.name;
  try{
    if(name!==req.params.username)
    throw new Error('Can update only user '+name)
     const userid = await  user.controller.updateuser(name,req.body)
     res.json(userid);
     next()
  }catch(err){
    res.status(400).send({error: err.message})
  }
})
router.delete('/:username',auth.cpassword.authenticateToken, async(req,res,next)=>{
  const name = req.params.name;
  try{
    if(name!==req.params.username)
    throw new Error('Can delete only user '+name)
    const result = await user.controller.deleteuser(req.params.name);
    res.json(result._id)
    next()
  }catch(err){
    res.status(400).send({error: err.message})
  }
})
module.exports=router;