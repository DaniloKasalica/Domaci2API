const search = require('../controler/search');
const products= require('../controler/product.js')
const validation = require('../middleware/val');
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router();


router.get('/:id', async(req,res,next)=>{
    try{
    const result =  await products.controller.findById(req.params.id)
    res.json(result)
    next()
    }catch(err){
        res.sendStatus(404)
    }
  })
  //req.params.name set in authenticateToken
  router.put('/:id',validation.productvalidation, auth.cpassword.authenticateToken,async (req,res,next)=>{
     const id = req.params.id
     const name = req.params.name
    try{
    const data = await  products.controller.updateById(id,req.body,name);
    res.json(data);
    next()
    }catch(err){
      res.status(404).send({error: err.message})
    }
  })
  router.delete('/:id',auth.cpassword.authenticateToken,async(req,res,next)=>{
      try{
    const result = await products.controller.deleteById(req.params.id,req.params.name);
    res.send(result)
    next()
      }catch(err){
          res.status(404).send({error: err.message})
      }
  })

module.exports= router