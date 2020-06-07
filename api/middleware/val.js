
const search = require('../controler/search')
const validation = async (req,res,next)=>{
    const newuser = req.body;
        Promise.all([
             usernameval(newuser.username),
             passval(newuser.password),
             roleval(newuser.role)

        ]).then(()=>{
            next()
        }).catch((err)=>{
            res.status(400).send({ error: err })
        })
    }

const productvalidation = async(req,res,next)=>{
    try{
  res = await imgvalidation(req.file);
  if (res === false){
      req.body.image = 'logo.png'
      next()
  }else{
      req.body.image = req.file.filename;
      next()
  }
    }catch(err){
        res.status(400).send({error: err})
    }
}


const imgvalidation = async(file)=>{
    if(file){
        console.log(file.size)
    if(file.size<=1024*1024)
        return Promise.resolve(true)
        return Promise.reject('Image size should be less then 3MB')
    }else{
    return Promise.resolve(false)
    }
}

const roleval = async(role) =>{
    if(role == undefined)
    return Promise.resolve(true)
    role =  parseInt(role)
    console.log(role)
    if(role!==1 && role !==0)
    return Promise.reject('role can be 1 or 0')
    return Promise.resolve(true)
}
const passval =async (password)=>{
    if(password == undefined)
    return Promise.resolve(true)
    try{
       await includenum(password);
       await letter(password)
       return(Promise.resolve(true))
    }
    catch(err){
        return(Promise.reject(err))

    }
    }
const includenum = (password)=>{
   const res =  /\d/.test(password);
   if(res==true)
   return(Promise.resolve(true))
   return (Promise.reject("Password doesn't have 1 uppercase or 1 lowercase or 1 number character"))
}
const letter = (password)=>{
    return new Promise((resolve,reject)=>{
        for(let i = 0; i<password.length; i++){
            if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&& password.charAt(i)==password.charAt(i).toUpperCase()){
            for(let i = 0; i<password.length; i++){
                if( (password.charAt(i).toLowerCase()!=password.charAt(i).toUpperCase())&&password.charAt(i)==password.charAt(i).toLowerCase()){
            resolve(true)
                }
            }
            reject("Password doesn't have 1 uppercase or 1 lowercase or 1 number character")
        }
        }
         reject("Password doesn't have 1 uppercase or 1 lowercase or 1 number character")
    })
}
const usernameval = async (username) =>{
    const response = await  search.usersearch.searchwhatever({username:username});
    if(response)
    return Promise.resolve(true);
    return Promise.reject('Username exist')
}
module.exports = {
    validation,
    productvalidation
}