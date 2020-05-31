const express = require('express');
const { json, urlencoded } = require('body-parser')
const app = express()
const connect = require("./services/helper").connect;
const productrouter = require('./api/routes/productroutes')
const userrouter = require('./api/routes/userroutes')
const productidrouter = require('./api/routes/productidroutes')
const mailservice = require('./services/mail')
const uploadimg = require('./services/upload');


var multer  = require('multer')
var upload = multer()
 

app.use(urlencoded({ extended: true }))
app.use(json())

app.use('/product',uploadimg.single('image'),productrouter)
app.use('/user',upload.none(),userrouter)
app.use('/product_id',productidrouter)
app.post('/product', async (req,res)=>{
await mailservice.newprodinfo(req.body)
.then(res=>{
  console.log(res)
}).catch(err=>{
  console.error('err:'+err)
})
})

connect('mongodb://localhost:27017/domaci2')
  .then(() => app.listen(3000, () => {
    console.log('server on http://localhost:3000')
  }))
  .catch(e => console.error(e))