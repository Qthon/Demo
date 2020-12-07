// 封装jq ajax请求
function sendRequest(obj) {
    // 获取参数
    const { type, url, success, ...params } = obj;
    // 基准路径
    const baseUrl = "http://127.0.0.1:3000";
    // 发送请求
    $.ajax({
        type,
        url: baseUrl + url,
        ...params,
        success,
    });
}

// 封装跳转页面
function goTo(path) {
    window.location.href = path
}

/**
 * 复制函数
 * @param {String} content  复制的内容
 * 返回：true
 */
function copyToClip(content) {
    try {
        // 创建input节点
        var aux = document.createElement("input");
        // 设置input值 = 需要复制的内容
        aux.setAttribute("value", content);
        // 在body中插入input节点
        document.body.appendChild(aux);
        // 选中
        aux.select();
        // 因为execComand()复制的方法只能在input中使用，因此对于其他标签如div 、 span就是利用插入一个input节点来接收span、div里的内容来达到复制的效果
        document.execCommand("copy");
        // 删除input节点
        document.body.removeChild(aux);
        // 成功返回true
        return true
    } catch {
        // 失败放回false
        return false
    }
}