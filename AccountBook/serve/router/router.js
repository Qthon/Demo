const express = require("express");
// experss 路由方法
const router = express.Router();
// 引入封装好的函数
const modules = require("../common/component");
// 面板主题颜色
const panelColor = ["primary", "success", "info", "warning", "danger"];

// 获取随机面板主题颜色值
function getRandomColor() {
    const colorIndex = modules.getRandom(0, 4);
    return panelColor[colorIndex];
}

/**
 * 接口一：获取所有数据
 * 类型：Get
 * 参数：无
 * 返回：所有的数据
 */
router.get("/getData", (req, res) => {
    // 读取文件
    modules.readFileData((data) => {
        const obj = {
            msg: "获取成功",
            status: 200,
            data,
        };
        res.json(obj)
    });
});

/**
 * 接口二：删除数据
 * 类型：Get
 * 参数：id
 * 返回：成功提示
 */
router.get("/removeData", (req, res) => {
    // 获取id
    const { id } = req.query;
    // 删除 数据
    modules.readFileData((data) => {
        // 找到该数据的索引
        const index = data.findIndex((item) => item.id.toString() === id);
        // 删除该数据
        data.splice(index, 1);
        // 再把处理后的数据写进去
        modules.writeFileData(data, () => {
            res.json({ msg: "删除成功", status: 200 });
        });
    });
});

/**
 * 接口三：添加数据
 * 类型：Post
 * 参数：title、username、password
 * 返回：添加成功提示
 */
router.post("/addData", (req, res) => {
    // 获取数据
    const { title, username, password } = req.body;
    if (!title || !username || !password) {
        res.json({ msg: "添加失败", status: 400 });
        return;
    }
    modules.readFileData((data) => {
        // 计算id id的自增
        // 1、错误处理，若没有数据时id默认为0 若有数据，先获取到数据数组中的最后一个元素id
        const lastDataId = data.length == 0 ? 0 : data.slice(-1)[0].id;
        // 2、获取随机颜色
        const color = getRandomColor();
        // 2、拼接数据
        const obj = {
            id: lastDataId + 1,
            title,
            username,
            password,
            color,
        };
        data.push(obj);
        // 3、写入文件
        modules.writeFileData(data, () => {
            res.send({ msg: "添加成功", status: 200 });
        });
    });

    // 添加数据
});

/**
 * 接口四：修改数据
 * 类型：Post
 * 参数：id [title] [username] [password]
 * 返回：修改成功提示
 */
router.post("/editData", (req, res) => {
    // 获取id
    const { id, ...msg } = req.body;
    // console.log(typeof id); // string类型
    // 查找到对应数据
    modules.readFileData((data) => {
        // 找到该数据 并且找到该元素在数组中的索引
        const index = data.findIndex((item) => item.id.toString() === id);
        // 错误处理：给到的id查找不到对应的数据
        if (index < 0) {
            res.json({ msg: "添加失败", status: "400" });
            return;
        }
        const findData = data.find((item) => item.id.toString() === id);
        // 修改数据
        newData = {
            ...findData,
            ...msg,
        };
        // 保存数据
        data.splice(index, 1, newData);
        modules.writeFileData(data, (err) => {
            if (err) throw err;
            res.json({ msg: "修改成功", status: 200 });
        });
    });
});

/**
 * 接口五：获取单个数据
 * 类型：Get
 * 参数：id
 * 返回：单个数据
 */
router.get('/getOneData', (req, res) => {
    // 获取id
    const { id } = req.query
    console.log(id);
    modules.readFileData((data) => {
        const oneData = data.find((item) => item.id.toString() === id)
            // 错误处理 数据不存在时
        if (!oneData) {
            res.json({ msg: '数据不存在', status: 400 })
            return
        }
        // 数据存在时
        const obj = {
            msg: '获取成功',
            status: 200,
            data: oneData
        }
        res.json(obj)
    })
})

// 导出模块
module.exports = { router };