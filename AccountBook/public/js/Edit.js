// 根据id获取当前需要修改的数据
function getOneData() {
    // 获取地址栏id
    const index = window.location.href.split('=')[1]
    // 发送请求获取数据
    sendRequest({
        type: 'get',
        url: '/getOneData',
        data: { id: index },
        success: function (res) {
            // console.log(res.data);
            // 数据回显
            $('.input-title').val(res.data.title)
            $('.input-username').val(res.data.username)
            $('.input-password').val(res.data.password)
        }
    })
}
getOneData()

// 修改数据并保存
function editData() {
    // 获取地址栏id
    const index = window.location.href.split('=')[1]
    // 利用jq序列化的方法获取表单数据
    const data = $('#editform').serialize() + `&id=${index}`
    // 发送请求
    sendRequest({
        type: 'post',
        url: '/editData',
        data,
        success: function (res) {
            if (res.status === 200) {
                window.location.href = './index.html'
            }
        }
    })
}