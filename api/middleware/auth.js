require('dotenv').config()

const express  = require('express');
const search = require('../controler/search');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cpassword={
addpassword : async (req,res,next)=>{
    try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    next()
    }
    catch(err){
        res.status(500).send({error: err.message})
    }
},
login: async(req,res,next)=>{
  
  const checkuser =await search.usersearch.findbyusername(req.body.username);
  if(checkuser == null){
      return res.status(400).send({error: 'cannot find user'});
  }
  
  try{
         const resp = await bcrypt.compare(req.body.password, checkuser.password);
         if(resp)
          next()
         else {
          res.status(400).send({error: 'Incorect password'})
        }
      } catch(err) {
        res.status(500).send({error: err.message})
      }
},
authenticateToken: async (req,res,next)=>{
  const authHeader = req.headers['authorization']// Bearer TOKEN
  const token  =authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,response)=>{
    if(err)
    res.sendStatus(403)
    req.params.name = response;
    next()
  })
}
}
module.exports={
    cpassword
}