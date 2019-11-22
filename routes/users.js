var express = require('express');
var router = express.Router();
const userController = require("../controller/user")

router.post("/register", userController.userRegister);

router.post("/login", userController.userLogin);

router.post("/usersList",userController.userList);


module.exports = router;

/*
  MVC:
    M:model 数据层  数据的增删改查
    V:view  视图层  类似于html一样的模板
    c:controller  逻辑层  编写功能的业务逻辑







    数据层
    const mongoose = require("../utils/database");

    const User = mongoose.model("user", {
      username: String,
      password: String
    })
    User.findOne({ username }).then((data) => {
    let user = new User({ username, password });
    user.save().then(() => {

    逻辑层


      (req, res, next) => {
  let { username, password } = req.body;

  
    if (data) {
      res.json({
        code: 200,
        errMsg: "",
        data: {
          info: "用户名重复",
          status: 2
        }
      })
    } else {
     
        res.json({
          code: 200,
          errMsg: "",
          data: {
            info: "注册成功",
            status: 1
          }
        })
      })
    }
  })


}

*/