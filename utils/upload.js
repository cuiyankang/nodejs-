const multer = require("multer");

//文件存储的配置
var storage = multer.diskStorage({
    //设置文件存储的位置
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    //设置文件的唯一名称
    filename: function (req, file, cb) {
        cb(null, Date.now()+"-"+file.originalname )
    }
})

//使用配置
var upload = multer({ storage: storage })

//设置当前字段最多可以上传多少张图片
var cpUpload = upload.fields([{ name: 'booksLogo', maxCount: 1 }])


module.exports=cpUpload;