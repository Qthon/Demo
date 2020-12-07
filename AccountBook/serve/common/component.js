const fs = require('fs')
const path = require('path')
// 数据文件路劲
const filePath = path.join(__dirname, '../data.json')

/**
 * 封装读取文件函数
 * @param {Function} callback  回调函数
 */
function readFileData(callback) {
    fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
            console.log("read File error");
            return;
        }
        // 错误处理：读取数据为空时，默认给他一个空数组
        if (data === '') {
            writeFileData('[]', (err) => {
                console.log('write file error');
            })
        } else {
            callback(JSON.parse(data));
        }
    });
}

/**
 * 封装写入文件函数
 * @param {Object} data 
 * @param {Function} callback 
 */
function writeFileData(data, callback) {
    // 错误处理：写入数据不能为空
    if (!data) return
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.log("write File error");
            return;
        }
        callback();
    });
}

/**
 * 随机返回一个整数
 * @param {Number} max 
 * @param {Number} min 
 */
function getRandom(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 导出
module.exports = { readFileData, writeFileData, getRandom }