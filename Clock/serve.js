// 引入模块
const express = require('express')
const fs = require('fs')
const cors = require('cors')
const moment = require('moment')
const axios = require('axios')
const openIndex = require('child_process')

// 创建服务器
const app = express()

// 跨域资源共享
app.use(cors())

// 获取列表信息
app.get('/getData', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) throw err
        // console.log(res);
        res.send(data)
    })
})

// 添加信息 【状态】彩虹屁 时间
app.get('/addData', async (req, res) => {
    // 创建状态信息
    let obj = await objList()
    // 读取信息
    await fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) throw err
        let arr = JSON.parse(data)
        // 插入信息
        arr.push(obj)
        // 判断数据不超过21条
        if (arr.length > 21) {
            arr.splice(0, 1)
        }
        // 写入保存
        fs.writeFile('./data.json', JSON.stringify(arr), err => {
            if (err != null) {
                console.log('write error');
                return
            }
            fs.readFile('./data.json', 'utf-8', (err, data) => {
                if (err) throw err
                // console.log(res);
                res.send(data)
            })
        })

    })
})

async function objList() {
    // 获取当天9点时间戳
    const clock = new Date().setHours(9)
    // 获取当前时间戳
    const date = +new Date()
    // 彩虹屁
    let msg = ''
    let time = moment().format('YYYY-MM-DD HH:mm'); // 2021-02-26 5:20 PM
    let obj = {}
    // 判断状态
    if (date < clock) {
        await axios({
            method: 'get',
            url: 'https://api.muxiaoguo.cn/api/caihongpi',
        }).then(res => {
            msg = '【按时签到】' + res.data.data.comment + '😁'
            obj = {
                id: date,
                msg,
                time,
                state: "el-icon-success success",
            }
        })
        return obj
    } else {
        obj = {
            id: date,
            msg: "【签到已结束】今天的签到已结束了哦，亲爱的，下此签到时将重新计算哦 😤",
            time: time,
            state: "el-icon-error danger",
        }
        return obj
    }
}

app.listen(3000, () => {
    console.log("Serve http://127.0.0.1:3000 is runing... ");
    // 开启浏览器
    openIndex.exec('start ./index.html')
});