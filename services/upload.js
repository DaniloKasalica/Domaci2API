const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./image')

    },
      filname: function(req,file,cb){
          cb(null,  file.originalname)
 }

})

const upload = multer({storage: storage,limits:{
    fileSize: 1024*1024*3
}})
module.exports = upload