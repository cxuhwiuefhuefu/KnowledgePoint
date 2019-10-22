Cookie是由服务器端生成的，发送给User-Agent（一般是浏览器），（服务器告诉浏览器设置一下Cookie），浏览器会将cookie以key/value 的形式保存在某个目录下的文本文件内，下一次请求同一网站时就发送该Cookie到服务器（前提是浏览器设置Cookie）

为什么会有Cookie？

http是无状态协议  状态都是由Cookie来控制的

Cookie的特点
1.有生命周期
2.满足同源策略
3.内存大小受到限制（一般是4K左右）

生命周期：
我们可以通过设置cookie的Expires的值来设置一条Cookie信息的失效时间   默认是当浏览器关闭的时候失效
我们可以利用new Date() 的 setTime和getTime来设置失效时间

满足同源策略：
不同源的情况下，Cookie一样是无法传递的。但是我们会发现我们登录了百度账号之后，再登录百度知道或百度文库，账号都是登录状态，但是这几个网页之间的主机名是不同的。

这里就用到了我们前面跨域问题里提到的document.domain
这几个百度网页虽然不同源  但是他们都是.baidu.com主域下的子域，这种情况下我们只要把这几个页面的document.domain都设置成这个主域的名字，就可以实现跨域通信了
document.domain='baidu.com'

cookie在本地是可以被更改的   敏感数据不要放在Cookie里

现在我们可以封装一下Cookie的增删改查的函数：
function setCoolie(name, value, time) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + time);
    document.cookie = name + '=' + value + ';expires' + oDate;
}
function getCookie(key) {    
    var arr = document.cookie.split(';');
    for(var i = 0,len = arr.length; i < len; i ++) {
        var temp = arr[i].split('=');
        if (temp[i] == key) {
            return temp[1];
         }
    }
}

本地存储  cookie localstorage sessionstorage
cookie存储数据不大于4k，过期失效；
localstorage和sessionstorage存储数据可以达到5M或更大，sessionstorage在当前浏览器关闭时失效，而localstorage会一直保持，作为持久数据


// 2019/3/27