const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// 中间件
app.use(express.json()); //解析json格式的文件
app.use(express.urlencoded({ extended: true })); //解析请求体的中间件
app.use((req, res, next) => {
  // 设置响应头
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");

  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500")
  next();
});
// app.use()

app.get("/text", (req, res) => {
}) 



// 定义登录的路由
app.post("/login", (req, res) => {
  // 获取用户的信息
  const { username, password } = req.body;

  // 验证用户名和密码
  if (username === "admin" && password === "123123") {
    // 登录成功，生成token
    const token = jwt.sign(
      { id: "2", username: "admin", nickename: "管理员" },
      "anquanmima",
      { expiresIn: "1h" }
    );
    // 登录成功
    res.send({
      status: "ok",
      data: {
        token,
        nickename: "管理员",
      },
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "用户名或密码错误",
    });
  }
});

const ARR = [
  {
    id: "1",
    name: "悟空",
    age: 18,
    gender: "男",
  },
  {
    id: "2",
    name: "八戒",
    age: 28,
    gender: "男",
  },
  {
    id: "3",
    name: "沙僧",
    age: 38,
    gender: "男",
  },
];

// 定义学生的路由
app.get("/students", (req, res) => {
  // 放回学生信息
 
    // 对token进行解码
    try{
       // 检查用户是否登录
    //获取请求头
    const token = req.get("Authorization").split(" ")[1]
      const de = jwt.verify(token, "anquanmima")
      console.log(de);
      // 解码成功token有效
      res.send({
        status: "ok",
        data: ARR,
      });
    }catch(e) {
      res.status(403).send({
        status: "error",
        data:"解码失败，用户token无效"
      })
      
    }
    // console.log(token);
    
 
});

// 添加学生的路由
app.post("/students", (req, res) => {
  // 获取学生的信息
  const { name, age, gender } = req.body;
  const stu = {
    id: +ARR.at(-1).id + 1 + "",
    name,
    age: +age,
    gender,
  };
  // 将学生添加到数组
  ARR.push(stu);

  // 添加成功
  res.send({
    status: "ok",
    data: stu,
  });
});

// 删除学生id
app.delete("/students/:id", (req, res) => {
  console.log("数据已删除");

  // 获取学生的id==params，查找你输入的值
  const id = req.params.id;

  // 遍历数组
  for (let i = 0; i < ARR.length; i++) {
    if (ARR[i].id === id) {
      const delstu = ARR[i];
      ARR.splice(i, 1);
      // 数据删除成功
      res.send({
        status: "ok",
        data: delstu,
      });
      return;
    }
  }

  // 如果执行到这里，说明学生不存在
  res.status(403).send({
    status: "error",
    data: "学生id不存在",
  });
});

// 修改学生的路由
app.put("/students", (req, res) => {
  console.log("数据已修改");

  // 获取数据
  const { id, name, age, gender } = req.body;

  // 根据id查找学生
  const update = ARR.find((item) => item.id === id);

  // 找到以后，id可能不存在,所以这里在else处理它
  if (update) {
    update.name = name;
    update.age = age;
    update.gender = gender;
    res.send({
      status: "ok",
      data: update,
    });
  } else {
    res.status(403).send({
      status: "error",
      data: "您删除的数据不存在",
    });
  }
});

// 查询某个学生的路由
app.get("/students/:id", (req, res) => {
  // 获取学生的id
  const id = req.params.id;
  const stu = ARR.find((item) => item.id === id);

  // 将数据放回
  res.send({
    status: "ok",
    data: stu,
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log("服务器启动");
});
