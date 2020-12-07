$(function () {
    //先加载本地的数据
    load();
    //添加操作
    $("#get_content").on("click", function () {
        //判断表单是否有空项
        for (var i = 0; i < $("#myform").find("input").length; i++) {
            if ($("#myform").find("input").eq(i).val() == "") {
                alert("Erro：Input is empty");
                //初始化表单
                $("#myform").find("input").val("");
                return;
            }
        }
        // 判断输入，目前进度不能大于总进度且必须大于零
        if ($(".total").val() < 0 || $(".present").val() < 0) {
            alert("Erro:This value is Not allowed");
            $("#myform").find("input").val("");
            return;
        }
        if ($(".present").val() > $(".total").val()) {
            alert("Erro:This value is Not allowed");
            $("#myform").find("input").val("");
            return;
        }
        //点击，读取本地数据
        var local = getDate();
        //更新数据，把最新的数据追加给local数组
        local.push({
            caption: $(".target").val(),
            url: $(".web_url").val(),
            record_1: $(".present").val(),
            record_2: $(".total").val(),
            done: "false",
            percent: (function () {
                var n = Number($(".present").val());
                var m = Number($(".total").val());
                percent = ((n / m) * 100).toFixed(2) + "%";
                return percent;
            })(),
        });
        saveDate(local);
        // 渲染页面
        load();
        $("#myform").find("input").val("");
    });
    $("#cancel_content").on("click", function () {
        $("#myform").find("input").val("");
    });
    //修改操作
    $("ul,ol").on("click", "#change", function () {
        //获取本地信息
        var data = getDate();
        var index = $(this).attr("index");
        //初始化表单
        $(".post_record").val(data[index].record_1);
        //点击确定处理函数
        $("#get_change")
            .off("click")
            .on("click", function () {
                //判断值
                var x = Number($(".post_record").val());
                // console.log(x);
                // console.log(data[index].record_2);

                if (x == "") {
                    alert("Erro:This value is Empty");
                    return;
                } else if (x <= 0 || x > Number(data[index].record_2)) {
                    alert("Erro:This value is Not allowed");
                    return;
                } else {
                    // 更新record值
                    data[index].record_1 = $(".post_record").val();
                    // console.log(data[index].record_1);

                    // 更新百分比
                    var n = Number(data[index].record_1);
                    var m = Number(data[index].record_2);
                    var percent = ((n / m) * 100).toFixed(2) + "%";
                    data[index].percent = percent;
                    // console.log(percent);

                    // 更新网址
                    var str = data[index].url.split("?");
                    str[1] = "p=" + data[index].record_1;
                    data[index].url = str.join("?");
                    // console.log(str.join("?"));

                    // 保存数据
                    saveDate(data);
                    // 重新渲染
                    load();
                }
            });
    });
    // 删除操作
    $("ul,ol").on("click", "#del", function () {
        //获取本地信息
        var data = getDate();
        //修改数据
        var index = $(this).attr("index");
        data.splice(index, 1);
        $("#get_del")
            .off()
            .on("click", function () {
                //保存到本地
                saveDate(data);
                //重新渲染
                load();
            });
    });
    //已完成操作
    $("ul,ol").on("click", "#success", function () {
        //获取本地信息
        var data = getDate();
        //修改数据
        var index = $(this).attr("index");
        $("#get_success")
            .off()
            .on("click", function () {
                // console.log(typeof data[index].done);
                if (data[index].done === "false") {
                    data[index].done = "true";
                }
                //存储数据
                saveDate(data);
                // 再渲染页面
                load();
            });
    });
});

//封装一个读取本地数据的函数
function getDate() {
    var date = localStorage.getItem("learning");
    if (date !== null) {
        // 本地存储的数据是字符串格式的，我们需要的是对象格式的
        return JSON.parse(date);
    } else {
        return [];
    }
}
// 封装一个存储本地数据的函数
function saveDate(date) {
    localStorage.setItem("learning", JSON.stringify(date));
}
// 渲染加载页面
function load() {
    var data = getDate();
    //遍历之前要先清空ul,ol里面的内容，再来遍历数据
    $("ul").empty();
    $("ol").empty();
    $.each(data, function (i, n) {
        if (n.done === "true") {
            $(".listed").prepend(
                "<li class='col-md-1 caption'>" +
                n.caption +
                "</li> <li class='col-md-6 slide'><div><div class='slide_" +
                i +
                "' style='background-color: #aaaaaa;width:" +
                n.percent +
                ";'></div></div></li> <li class='col-md-1 percent'>" +
                n.percent +
                "</li> <li class='col-md-1 url'><a href='" +
                n.url +
                "' target='_blank'>Go</a></li> <li class='col-md-1 record'><span>" +
                n.record_1 +
                "</span><span>/</span><span>" +
                n.record_2 +
                "</span></li> <li class='col-md-2 change'>  <button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#exampleModal2' index='" +
                i +
                "' id='change' disabled>修改</button>  <button class='btn btn-primary btn-sm' index = '" +
                i +
                "' id='del'data-toggle='modal' data-target='#exampleModal-del'>删除</button>  <button class='btn btn-primary btn-sm' data-toggle='modal'data-target='#exampleModal-success'index='" +
                i +
                "' id='success' disabled>已完成</button></li>"
            );
        } else if (n.done === "false") {
            $(".list").prepend(
                "<li class='col-md-1 caption'>" +
                n.caption +
                "</li> <li class='col-md-6 slide'><div><div class='slide_" +
                i +
                "' style='width:" +
                n.percent +
                ";'></div></div></li> <li class='col-md-1 percent'>" +
                n.percent +
                "</li> <li class='col-md-1 url'><a href='" +
                n.url +
                "' target='_blank'>Go</a></li> <li class='col-md-1 record'><span>" +
                n.record_1 +
                "</span><span>/</span><span>" +
                n.record_2 +
                "</span></li> <li class='col-md-2 change'>  <button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#exampleModal2' index='" +
                i +
                "' id='change'>修改</button>  <button class='btn btn-primary btn-sm' index = '" +
                i +
                "' id='del'data-toggle='modal' data-target='#exampleModal-del'>删除</button>  <button class='btn btn-primary btn-sm' data-toggle='modal'data-target='#exampleModal-success'index='" +
                i +
                "' id='success'>已完成</button></li>"
            );
        }
    });
    var sum_1 = 0;
    var sum_2 = 0;
    for (var i = 0; i < data.length; i++) {
        sum_1 += Number(data[i].record_1);
        sum_2 += Number(data[i].record_2);
    }
    $("h4 span").eq(0).html(data.length + " / " + sum_2 + " / " + sum_1);

}