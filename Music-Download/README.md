进来的朋友看这里：

打开`index.html`就可直接开始搜索了，前提是您必须保证在<u>有网</u>的情况下

---

对于后续想继续优化的小伙伴

推荐几点：

1. 增加历史搜索记录
2. 资源可以试听
3. 减少DOM的操作
4. 在不影响效果的同时减少请求次数



开发过程中我认为的一个难点

描述：页面渲染的信息包括，歌曲名称，演唱者，专辑，资源的类型(mp3 / flac)，资源大小，但我们需要的这些信息分别来自两个接口；

1. 接口一：https://autumnfish.cn/search 歌曲搜索接口，信息只返回我们要的歌曲名称，演唱者，专辑名称
2. 接口二：https://autumnfish.cn/song/url 根据接口`id`返回我们需要的歌曲`url`，资源类型，资源大小

这里就牵扯到一个问题，就是我们调用接口二的时候，接口一已经执行完成了，这个容易，`Promise`和`async / await`都可以解决，但就是接口二要依赖接口一的`id` 才能调用，因此这里，就引申到一个遍历id，不断发起请求的一个等待的问题

解决：👇 👇 👇

```js
musicMsg(inputValue).then(async res => {
    // 不建议用forEach进行遍历
    for (let item of res) {
        await musicUrl(item.id).then(data => {
            if (data.url) {
                massage.push({ ...item, ...data })
            }
        })
    }
    // 要等待前面的请求完了，在来打印 done
    console.log('done');
}
```

