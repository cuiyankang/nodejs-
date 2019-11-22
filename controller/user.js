const userModel = require("../model/user");
//加密 1、引入加密模块
const crypto = require('crypto');
const tokenUtils = require("../utils/token")


const userRegister = async (req, res) => {
    let { username, password } = req.body;
    let findData = await userModel.userFind({ username })
    if (findData) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名已存在",
                status: 2
            }
        })
    } else {
        //加密 2、创建加密算法
        const hash = crypto.createHash('sha256');
        //加密 3、加密数据
        hash.update(password);
        //加密 4、得到加密的数据
        // console.log(hash.digest('hex'))

        //用户状态
        let status = true;
        //注册时间
        let registerTime = new Date().getTime();
        //用户昵称
        let name = Math.random().toString(36).substr(2, 8);

        let saveData = await userModel.userSave({ username, password: hash.digest('hex'), status, registerTime, name });
        if (saveData) {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "注册成功",
                    status: 1
                }
            })
        }

    }


}



const userLogin = async (req, res) => {
    let { username, password } = req.body;

    let findData = await userModel.userFind({ username });

    if (findData) {
        if (findData.status) {
            //加密 2、创建加密算法
            const hash = crypto.createHash('sha256');
            //加密 3、加密数据
            hash.update(password);
            //加密 4、得到加密的数据
            // console.log(hash.digest('hex'))
            if (findData.password == hash.digest('hex')) {

                let token = tokenUtils.sendToken({username});
                console.log(token);
                res.cookie("token",token);



                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "登陆成功",
                        status: 1
                    }
                })
            } else {
                res.json({
                    code: 200,
                    errMsg: "",
                    data: {
                        info: "密码错误",
                        status: 2
                    }
                })
            }
        } else {
            res.json({
                code: 200,
                errMsg: "",
                data: {
                    info: "账号异常",
                    status: 3
                }
            })
        }
    } else {

        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "用户名称不存在",
                status: 0
            }
        })

    }



}



const userList = async (req,res)=> {
    let {page,limit} = req.body;
    let data = await userModel.userlistfind(page,limit);
    if(data.length>0){
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                info:"查询成功"
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"查询失败"
            }
        })
    }
} 

module.exports = {
    userRegister,
    userLogin,
    userList
}



/*

    加密方法(数据+随机字符串+随机时间戳+秘钥+其他东西) = 加密后的数据

    md5  sha256  sha1

*/