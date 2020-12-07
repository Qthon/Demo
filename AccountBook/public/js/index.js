// 获取数据，并渲染页面
function getdata() {
    sendRequest({
        type: "get",
        url: "/getData",
        success: function (res) {
            // console.log(res.data);
            const tempDom = template("temp", res);
            // console.log(tempDom);
            $("#content").html(tempDom);
        },
    });
}
getdata();

// 添加数据，并渲染页面
function addData() {
    // 获取数据
    const data = $("#form").serialize();
    sendRequest({
        type: "post",
        url: "/addData",
        data,
        success: function (res) {
            getdata();
            // 清空表单数据
            $("#form").get(0).reset();
        },
    });
}

// 删除数据，并渲染页面
function removeData(index) {
    sendRequest({
        type: "get",
        url: "/removeData",
        data: index,
        success: function (res) {
            getdata();
        },
    });
}

// 复制内容
function copyData(id, btnName) {
    sendRequest({
        type: 'get',
        url: '/getOneData',
        data: { id },
        success: function (res) {
            if (btnName === 'username') {
                const result = copyToClip(res.data.username)
                if (result) {
                    alert('复制成功');
                } else {
                    alert('复制失败');
                }
            } else {
                const result = copyToClip(res.data.password)
                if (result) {
                    alert('复制成功');
                } else {
                    alert('复制失败');
                }
            }
        }
    })
}
