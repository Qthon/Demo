/*
1:歌曲搜索接口
请求地址:https://autumnfish.cn/search
请求方法:get
请求参数:keywords(查询关键字)
响应内容:歌曲搜索结果

2:歌曲url获取接口
请求地址:https://autumnfish.cn/song/url
请求方法:get
请求参数:id(歌曲id)
响应内容:歌曲url地址
*/

// 获取歌曲名称  歌曲id 歌曲演唱者  歌曲专辑名称
function musicMsg(musicName) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: 'https://autumnfish.cn/search',
            data: {
                keywords: musicName
            },
            success: function (res) {
                // 获取歌曲名称 + 歌曲专辑名称
                let data = res.result.songs.map((item) => {
                    return { id: item.id, name: item.name, album: item.album.name, singer: item.artists[0].name }
                });
                resolve(data)
            },
            error: function (err) {
                reject(err)
            }
        });
    })
}

// 获取歌曲url 歌曲size，歌曲type
function musicUrl(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'get',
            url: 'https://autumnfish.cn/song/url',
            data: { id },
            success: function (res) {
                let obj = {}
                obj = {
                    url: res.data[0].url,
                    type: res.data[0].type,
                    size: (res.data[0].size / 1024 / 1024).toFixed(2)
                }
                resolve(obj)
            },
            error: function (err) {
                reject(err)
            }
        })
    })
}

// 搜索结果渲染
function listLoad(msg) {
    const list = template('list', msg)
    $('.music-list').append(list)
}

// 处理拼接歌曲完整信息并渲染
function getmusicDetail() {
    // 获取输入框值
    let inputValue = $("#search-value").val().trim()
    // 判断空值
    if (!inputValue) return
    // 清空上一次的搜索内容
    $('.music-list').empty()
    // 声明一个存储处理后的歌曲信息
    let massage = []
    // 开启loading
    $("#loading").removeClass('hide').addClass('show')
    // 发送请求
    musicMsg(inputValue).then(async res => {
        for (let item of res) {
            await musicUrl(item.id).then(data => {
                if (data.url) {
                    massage.push({ ...item, ...data })
                }
            })
        }
        // console.log(massage);
        // 渲染
        listLoad(massage)
        // 搜索框内容置空
        $("#search-value").val('')
        // 关闭loading
        $("#loading").removeClass('show').addClass('hide')
    })
}