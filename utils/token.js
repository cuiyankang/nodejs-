const jwt = require("jsonwebtoken");
const secret = "bk1917";

//方法
const sendToken = (userfInfo)=>{
    return jwt.sign(userfInfo,secret,{expiresIn:"1h"})
}

//自定义中间件
const tokenVerfiy = (req,res,next)=>{
    let token = req.cookies.token;
    
    jwt.verify(token, secret, function(err, decoded) {
        if(decoded){
            next();
        }else{
            res.json({
                code:200,
                errMsg:"",
                data:{
                    list:[],
                    info:"token验证失败",
                    status:0
                }
            })
        }

    });
}


module.exports = {
    sendToken,
    tokenVerfiy
}