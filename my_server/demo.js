// 引人jwt
const jwt = require("jsonwebtoken")

// 创建对象
const obj = {
    name: "wukong",
    age : "18",
    gender: "男"

}

// jwt对数据进行加密
const token = jwt.sign(obj, "hello", {
    expiresIn:"1h"
})
try{
    // 服务器收到客户端的token后,开始解析
    const decode = jwt.verify(
        token,  "hello"
    )
    console.log(decode);
} catch(err) {
    console.log("无效的token");
    
}


