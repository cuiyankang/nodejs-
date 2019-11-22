const mongoose = require("../utils/database");

const User = mongoose.model("user",{
    username:String,
    password:String,
    name:String,
    registerTime:Number,
    status:Boolean
})



const userFind = (userInfo)=>{
   return User.findOne(userInfo)
}


const userSave = (userInfo,callback)=>{
    let user = new User(userInfo);
    return user.save()
}

const userlistfind = (page,limit)=>{
    page = Number(page);
    limit = Number(limit);
    return User.find({},{password:0}).skip((page-1)*limit).limit(limit);
}


module.exports = {
    userFind,
    userSave,
    userlistfind
}