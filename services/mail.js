const nodemailer = require('nodemailer');
const ObjectsToCsv = require('objects-to-csv');
const search = require('../api/controler/search');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'danilo.kasalica@gmail.com',
     pass: process.env.PASSWORD
   }
 });
 class mailOptionsobj {
     
   constructor(mail,filepath){
       this.to = mail;
       this.text = 'New prod';
       this.from = 'danilo.kasalica@gmail.com';
       this.subject = 'New Product';
       this.attachments = {
           path: filepath
       }
   };
 };
 const writecsvfile = async (doc)=>{
   const csv = new ObjectsToCsv([doc]);
   return  await csv.toDisk(__dirname+'/product.csv')
 }
 const newprodinfo = async(doc) =>{ 
     try{
      console.log(__dirname+'/product.csv')
      await writecsvfile(doc)
     const arr = (await search.usersearch.searchwhatever({role:1})).map(elem =>{
         return elem.email;
     })
     const path =__dirname+ '/product.csv'
     const mailOptions = new mailOptionsobj(arr,path)
     await transporter.sendMail(mailOptions)
     return Promise.resolve(true)
    }catch(error){
        return Promise.reject(error)
    }

}
module.exports = {
   newprodinfo
}