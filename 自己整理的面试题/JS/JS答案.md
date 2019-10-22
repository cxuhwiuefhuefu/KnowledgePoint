(一)
1)
DOM定义了表示和修改文档对象所需的对象丶这些对象的行为和属性以及这些对象之间的关系 DOM对象即为宿主对象 由浏览器厂商定义 用来操作html和css功能的一类对象的集合 也有人称DOM是对HTML和XML的编程接口
BOM定义了操作浏览器的接口 
BOM对象: Window History Navigator Screen Location等
由于浏览器厂商的不同 BOM对象的兼容性极低 一般情况下 我只用其中的部分功能

2)
防抖&节流
在前端开发中有一部分的用户行为会频繁的触发事件执行 而对DOM操作丶资源加载等耗费性能的处理 很可能会导致页面卡顿 甚至浏览器崩溃 函数节流和函数防抖就是为了解决类似需求应运而生的
为什么会导致页面卡顿呢 本质是因为我们js是单线程的 

节流
    函数节流就是预定一个函数只有在大于等于执行周期时才执行 周期内调用不执行 好像水滴攒到一定重量才会落下一样
场景
   窗口调整
   页面滚动       瀑布流的布局或者进行动态页面的加载
   抢购疯狂点击    脚本式的触发事件进行疯狂点击 向服务器发送疯狂的请求 服务器会崩溃
function throttle(method, delay) {
    var last = 0;
    return function() {
        var  now = +new Date().getTime();
        if(now - last > delay) {
            method.apply(this, arguments);
            last = now;
        }
    }
}  

防抖
    函数防抖就是在函数需要频繁触发情况时 只有足够空闲的时间 才执行一次 好像公交司机会等人都上车后才出站一样 等一小段时间没人再上才走
场景
   实时搜索
   拖拽
function debounce(handler, delay) {
    var timer = null;
    return function() {
        var _self = this,
            _arg = arguments;
        clearTimeout(timer);
        timer = setTimerout(function() {
            handler.apply(_self, _arg); 
        }, delay);    
    }
}

3) 
观察者模式

观察者模式又叫做发布-订阅模式 是我们最常用的设计模式之一 它定义对象间的一种一对多的依赖关系 当一个对象的状态发生改变时 所有依赖于它的对象都将得到通知和更新 观察者模式提供一个了一个订阅模式 其中对象订阅事件在发生时得到通知 这种模式事件驱动的编程基石 它有利于良好的面向对象的设计

使用场景?
1. DOM事件
2. 自定义事件

优点:
1. 一是时间上的解耦 二是对象上的解耦
2. 即可用于异步编程中 也可以用帮助我们完成更松耦合的代码编写 
缺点:
1. 创建订阅者本身要消耗一定的时间和内存
2. 当订阅一个消息时 也许此消息并没有发生 但这个订阅者会始终存在内存中
3. 观察者模式弱化了对象之间的联系 这本是好事 但如果过度使用 对象与对象之间的联系也会隐藏的很深 会导致项目的难以跟踪维护和理解

function Event() {
    // 存储不同的事件类型对应不同的处理函数 保证后续emmit可以执行
    this.cache = {};
}
Event.prototype.on = function(type, handle) {
    if(!this.cache[type]) {
        this.cache[type] = [handle];
    }else {
        this.cache[type].push(handle);
    }
}
Event.prototype.emmit = function() {
    // 没有保证参数是多少个 就用arguments
    var type = arguments[0];
    var arg = [].slice.call(arguments, 1);  
    for(var i = 0; i < this.cache[type].length; i++) {
        this.cache[type][i].apply(this, arg);   
        // 检查是否有标记
        if(this.cache[type][i].flag) {
            this.cache[type].splice(i, 1);
        }
    }
}
Event.prototype.empty = function(type) {
    this.cache[type] = [];
}
Event.prototype.remove = function(type, handle) {
    this.cache[type] = this.cache[type].filter(function(ele) {
        return ele != handle;
    })
}
Event.prototype.once = function(type, handle) {
    if(!this.cache[type]) {
        this.cache[type] = [];  
    }
    // 做标记
    handle.flag = 'true';
    this.cache[type].push(handle);
}
var oE = new Event();
function deal1(time) {
    console.log('overtime1:' + time);
}
oE.on('over', deal1);
function deal2(time) {
    console.log('overtime2:' + time);
}
oE.on('over', deal2);

oE.emmit('over', '2018-9-25');
oE.remove('over', deal2);
oE.emmit('over', 'seconde-1-1');

详解: https://www.nowcoder.com/questionTerminal/80c725bb5e6a4746aa566fdf9a07069e?orderByHotValue=1&page=1&onlyReference=false

4) 
1. form和input上传
设置from的action为后端页面 enctype="multipart/form-data" type="post"
触发form表单提交数据的方式有2种 一种是在页面上点击button按钮或<input type="submit">按钮触发 第二种是在js中执行form.submit()方法
优点: 
    使用简单方便 兼容性好 基本所有浏览器都支持
缺点:
    1. 提交数据后页面会跳转
    2. 因为是浏览器发起的请求 不是一个Ajax 所以前端无法知道什么时候上传结束
    3. form表单里发送除文件外的数据 一般是新建一个type=hidden的input value="需要传的数据" 每发送一个数据就需要一个input 一旦多了就会使得dom看起来比较冗余

怎么禁止页面跳转?
    1. 可以在页面中新建一个空的iframe

2. 
使用formData上传
优点:
    由于这种方式Ajax上传 可以准确知道什么时候上传完成 也可以方便地接收回调数据
缺点: 兼容性差    

3. 使用fileReader读取文件数据进行上传
优点: 
    由于这种方式是Ajax上传 可以准确知道什么时候上传完成 也可以方便地接收到回调数据
缺点: 
    1. HTML5的新API 兼容性也不是特别好 只兼容到了IE10
    2. 一次性发送大量的base64数据会导致浏览器卡顿 服务端接收这样的数据可能也会出现问题

详解: http://www.cnblogs.com/soraly/p/8441589.html

5)
1. 与setTimeout和setInterval不同 requestAnimationFrame不需要设置时间间隔    
2. setTimeout和setInterval的问题是 它们都不精确 它们的内在运行机制决定了时间间隔参数实际上只是把指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间 如果队列前面已经加入了其他任务 那动画代码就要等待前面的任务执行完成后再执行
3. requestAnimationFrame采用系统时间间隔 保持最佳绘制效率 不会因为时间间隔过短 造成过度绘制 增加开销 也不会因为时间间隔太长 使用动画不流畅 让各种网页动画效果能够有一个统一的刷新机制 从而节省系统资源 提高系统性能 改善视觉效果 

window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame  ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           function(callback) {
               window.setTimeout(callback, 1000/60);
           }
})()
window.cancelAnimationFrame = (function() {
    return window.cancelAnimationFrame ||
           window.webkitCancelAnimationFrame ||
           window.mozCancelAnimationFrame ||
           function(id) {
               window.clearTimout(id);
           }
})() 

// 方块水平移动
var box = document.getElementsByClassName('box')[0],
    left = 0;
function move(){
    left += 10;
    box.style.left = left + 'px'; 
    window.requestAnimationFrame(move);
}
window.requestAnimationFrame(move);
		
6)
js加载的缺点: 加载工具方法没必要阻塞文档 过多的js加载会影响页面效率 一旦网速不好 那么整个网站将等待js加载而不进行后续等渲染工作
有些工具方法需要按需加载 用到再加载 不用不加载

JavaScript异步加载的三种方案
1. defere异步加载 但要等到dom文档全部解析完才会被执行 只有IE能用
2. async异步加载 加载完就执行 async只能加载外部脚本 不能把js写在script标签里
1,2执行时也不阻塞页面
3. 创建script 插入到DOM中 加载完毕后callBack
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javaScript';
    if(script.readyState) {
        if(script.onreadystatechange == 'complete' || script.onreadystatechange == 'loaded') {
            callback();
        }
    }else {
        script.onload = function() {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}

7) ？？？？？？？？？？？？？？？？？

8) 
数组去重

原理: 利用对象的特性,同一属性名不可能出现两次
Array.prototype.unique = function() {
    var obj = {},
        arr = [],
        len = this.length;
    for(var i = 0; i < len; i++) {
        if(!obj[this[i]]) {
            obj[this[i]] = 'abc'; // 不能是=this[i] 万一数组去重0
            arr.push(this[i]);
        }
    }    
    return arr;
}
缺点: 这个方法对于number和其对于的字符串形式无法过滤 谁在前面谁就保留下拉

利用Set去重
var newArr = [...new Set(arr)];

详解: https://juejin.im/post/5b0284ac51882542ad774c45#heading-7

9)
1. typeof
缺点: 
    结果返回六种数据类型 number string boolean object function undefined
    对于null及数组丶对象 typeof均检测出object 不能进一步判断它们的类型
2. instanceof
A instanceof B
    A对象是不是B构造函数出来的实例(看A对象的原型链上有没有B的原型)
缺点:   
    instanceof不能区别undefined和null 因为undefied和null没有原型
3. constructor
定义: 返回实例的构造函数 即返回创建此对象的函数引用
缺点: 
    constructor不能判断undefined和null 
    并且使用它是不安全的 因为constructor的指向是可以改变 
4. Object.prototype.toString.call()
缺点:
    它不能检测非原生构造函数的构造函数名 $.type()内部原理就是用的Object.prototype.toString.call()

详解: https://segmentfault.com/a/1190000015264821

10) 
减少HTTP请求数(最重要最有效)
一个完整的请求都需要DNS寻址丶与服务器建立连接丶发送数据丶等待服务器响应丶接受数据这样一个漫长而复杂的过程 由于浏览器进行并发请求的请求数都是有上限的 因此请求数多了以后 浏览器需要分批进行请求 因此会增加用户的等待时间 会给用户造成网站速度慢这样的一个印象 即使可能用户能看到的第一屏的资源都已经请求完了 但是浏览器的进度条一直在加载

请求优化----------
减少HTTP请求数的途径主要有以下几个
1. 从设计实现层面优化页面
如果你的页面和百度的页面一眼简单 那么也就不需要什么优化操作了 因此保持页面简洁丶减少资源的使用是最直接的
2. 合理设置HTTP缓存
缓存的力量是强大的 恰当的缓存设置可以大大减少HTTP请求
怎么才是合理的设置 原则很简单: 能缓存越多越久越好
例如: 很少变化的图片资源就可以直接通过HTTP Header中的Expires设置一个很长的过期头 变化不频繁而又可能会变的资源可以使用Last-Modified来做请求验证 尽可能的让资源能够在缓存中待的更久
3. 资源合并与压缩 
如果可以的话 尽可能的将外部脚本丶样式进行合并 尽可能地合并为一个 另外 CSS JS Image都可以用相应的工具进行压缩 压缩后往往能节省不少空间 或者使用Webpack等前端工厂化工具进行代码的压缩和去重
4. CSS Sprites雪碧图
雪碧图又叫做精灵图 我们可以把网站中需要用到的一些icon 全部放到一个图片资源中 然后通过改变位置来获取需要的图片 这样合并CSS图片 就可以大幅度减少HTTP请求数了
5. Inline Images
使用data: URL scheme的方式将图片嵌入到页面或CSS中 如果不考虑资源管理上的问题的话 不失为一个好办法 如果是嵌入页面的话换来的是增大了页面的体积 而且无法利用好浏览器缓存 使用CSS中的图片更为理想一些
6. Lazy Load Images 懒加载
这条策略实际上并不一定能减少HTTP请求数 但是却能在某些条件下或者页面刚加载时减少HTTP请求数 对于图片而言 在页面加载的时候只加载第一屏 当用户继续往后滚屏的时候才加载后续的图片 这样一来 假如用户只对第一屏的内容感兴趣时 那剩余的图片请求就都节省了 有的首页曾经的做法是在加载的时候把第一屏之后的图片地址缓存在Textarea标签中 待用户往下滚屏的时候才"惰性"加载
7. 瀑布流
其实懒加载并不能减少HTTP请求数 它只是减少页面刚加载的时候的HTTP请求数 总数是不变的 对于图片而言 在页面刚加载的时候可能只加载第一屏的图片 随着用户的滚动才会继续加载后面的图片资源 这种瀑布流的加载方式就可以有效提高性能  
8. 减少不必要的HTTP跳转
对于以目录形式访问的HTTP链接 很多人都会忽略链接最后是否带"/" 加入你的服务器对此区别对待的话 那么你也需要注意了 这其中很可能隐藏了301跳转 增加了多余请求
9. 避免重复的资源请求
这种情况主要是由于在模块化开发的时候 我们的不同模块化之间可能有相同的部分 导致资源的重复请求  

渲染优化-------------
1. 将外部脚本放在底部 
前文有谈到 浏览器是可以并发请求的 这一特点使得其能够更快的加载资源 然而外部脚本在加载时却会阻塞其他资源 例如在脚本加载完成之前 他后面的图片丶样式以及其他的脚本都处于阻塞状态 直到脚本加载完成后才会开始加载 如果将脚本放在靠前的位置 则会影响整个页面的加载速度从而影响用户体验 解决这一问题的方法有很多 而最简单可依赖的方法就是将脚本尽可能的往后挪 减少对并发下载的影响
2. 将CSS放在HEAD中 
如果将CSS放在其他地方比如body中 则浏览器有可能还未下载和解析到CSS就开始渲染页面了 这就导致由无CSS状态跳转到CSS状态 用户体验比较糟糕 除此之外 有些浏览器会在CSS下载完成后才开始渲染页面 如果CSS放在靠下的位置则会导致浏览器将渲染事件推迟
3. 慎用with 
with会改变作用域链 有可能导致我们的作用域链变长 导致查询性能下降
4. 避免使用eval和Function
每次eval或Function构造函数作用于字符串表示的源代码时 脚本引擎都需要将源代码转换成可执行代码 这是很耗费资源的操作 -- 通常比简单的函数调用慢100倍以上
5. 减少作用域链查找 
如果在循环中需要访问非作用域下的变量的时候 请遍历之前用局部变量缓存的变量 并在遍历结束之后重写缓存变量
6. 减少数据访问
js中对直接量和局部变量的访问时最快的 对对象属性以及数组的访问需要更大的开销 当出现下面的情况的时候 建议将数据放入局部变量 
    对任何对象属性的访问超过1次
    对任何数组成员的访问次数超过1次
    另外 要尽可能的减少对对象以及数组的深度查找 
7. 减少字符串拼接
字符串拼接尽可能少的使用"+" 这种方式的效率是十分低下的 因为每次运行都会开辟新的内存并生成新的字符串变量 然后将拼接的结果赋值给新变量 
建议使用的是先转化为数组 如果通过数组的join方法来连接成字符串 不过由于数组也有一定的开销 因此就需要权衡一下 当拼接的字符串比较少的时候 可以考虑用"+"的方式 比较多的时候就需要考虑用数组的join方法了
8. 减少DOM操作 (DOM操作应该是脚本中最耗费性能的一类操作)
HTMLCollection(HTML收集器 返回的是一个数组的内容信息)
因为是这个集合并不是一个静态的集合 它表示的仅仅是一个特定的查询 每次访问该集合时都会重新执行这个 查询从而更新查询结果 所谓的"访问集合"包括读取集合的length属性丶访问集合中的元素   
9. 避免重排重绘
页面有三个树: DOMTree丶CSSTree丶renderTree(实际上多于三个) renderTree上有两个规则 repaint和reflow 重排和重绘 repaint是元素自身的位置和宽高不变 只改变颜色的之类的属性而不会导致后面的元素位置的变化的位置 renderTree发生的动作 reflow是元素自身的位置或宽高改变了从而导致的整个页面的大范围移动的时候 renderTree发生的动作 所以我们在DOM操作的时候 要尽量避免重排 

11)
1. 显示类型转换
Number(mix)
parseInt(string, radix)
parseFloat(string)
toString(radix)
String()
Boolean()
2. 隐式类型转换
isNaN()  --> isNaN()  --> Number()
++/-- +/-(一元正负) --> Number()
+  --> 左右只要有一个是字符串的就调用String()转化为字符串类型
*/%     --> Number()
&& ||    ! --> 先Boolean()再取反
< > <= >=  --> (字符串和字符串比的是ascill码 数字和字符串的数字比则Numer())
== !=  --> Number()
3. 不发生类型转换
=== !==

详解: https://blog.csdn.net/itcast_cn/article/details/82887895

12) ?????????????????////




(二)
1)
原型定义: 原型是function对象的一个属性 它定义了构造函数制造出的对象的公共祖先 通过该构造函数产生的对象 可以继承该原型的属性和方法 原型也是对象

使用场景?
    可以提取公有属性
    可以提取公有方法

对象如何查看原型? 
    隐式属性 __proto__

对象如何查看对象的构造函数?
    constructor

2)
事件处理模型 -- 事件冒泡/时间捕获
事件冒泡:
    结构上(非视觉上)嵌套关系的元素 会存在事件冒泡的功能 即同一事件 自子元素冒泡向父元素(自底向上)
事件捕获:
    结构上(非视觉上)嵌套关系的元素 会存在事件捕获的功能 即同一事件 自父元素捕获至子元素(事件源元素) (自上向底)
    IE没有捕获事件
触发顺序: 先捕获 后冒泡

focus blur change submit reset select等事件不冒泡

3)
原型是function对象的一个属性 他定义了构造函数构造出来的对象的公共祖先 通过构造函数产生对象可以继承该原型的属性和方法，原型也是对象  

构造函数创建对象时候隐式创建this对象 this中一个默认属性叫做_proto_ 这个属性就是指向对象的原型

原型上还有原型的结构叫原型链 绝大部分原型都继承自Object.prototype即为原型链上的终点 Object.create(null)可以构造没有原型的对象

详解: https://github.com/huyaocode/webKnowledge/blob/master/JS%E5%9F%BA%E7%A1%80/%E5%8E%9F%E5%9E%8B%E9%93%BE%E4%B8%8E%E7%BB%A7%E6%89%BF.md

4) ?????????????????????

5) ?????????????????????/

6) 
什么是跨域?
    跨域是指浏览器不能执行其他网站的脚本 它是由浏览器的同源策略造成的 是浏览器对JavaScript实施的安全限制 

什么是同源策略?
    所谓的同源是指 域名、协议、端口均为相同 

同源策略限制了一下行为?
    1. Cookie、LocalStorage 和 IndexDB 无法读取
    2. DOM和JS对象无法获取
    3. Ajax请求发送不出去

跨域的几种情况 一般在哪出现?
    上传图片、文件
    富文本编辑器，像我的KingEditor群里，经常会问到这个问题
    页面直接请求第三方接口

1. JSONP--------------------
json的工作原理: 利用script标签的src属性没有跨域限制的漏洞来达到与第三方通信的目的 不仅如此 凡是带有src属性的标签都不受同源策略的影响 

script标签中src属性的格式是"url+参数" 比如url?cd=doJSON cd是我们和后台协商好的类似于形参的东西 是一个留给我们写处理函数接口 doJSON就是我们事先定义好的函数 也就是回调函数 所有数据会以参数的形式传递给该函数

json是一种数据格式 jsonp是一种约定俗成的非正式传输协议

JSONP的优点? 
    1. 它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制 JSONP可以跨域同源策略
    2. 它的兼容性更好 在更加古老的浏览器中都可以运行 不需要XMLHttpRequest或ActiveX的支持
    3. 在请求完毕后可以通过调用callback的方式回传结果 将回调方法的权限给了调用方 这个就相当于将controller和view层终于分开了 我提供的JSONP服务只提供纯服务的数据 至于提供服务以后的页面渲染和后续的view操作都由调用者来定义就好了 如果有两个渲染页面需要渲染同一份数据 你们只需要有不同的渲染逻辑就可以了 逻辑都可以使用同一个JSONP服务
JSONP的缺点?
     1. 它只支持GET请求而不是POST等其他类型的HTTP请求
     2. 它只支持跨域HTTP请求这种情况 不能解决不同域的两个页面之间如何进行JavaScript调用的问题
     3. JSONP在调用失败的时候不会返回各种HTTP状态码
     4. 安全性 万一假如提供JSONP的服务存在页面注入漏洞 即它返回的JavaScript的内容被人控制的 那么结果是什么? 所有调用这个JSONP的网站都会存在漏洞 于是无法把危险控制在一个域名下 所以在使用JSONP的时候必须要保证使用的JSONP服务必须是安全可信的

JSONP安全防范解决方案新思路?
    1. 防止callback参数意外截断js代码 特殊字符单引号双引号 换行符均存在风险
    2. 防止callback参数恶意添加标签（如script） 造成XSS漏洞
    3. 防止跨域请求滥用 阻止非法站点恶意调用
    
    1. 纯手工过滤特殊字符 引号尖括号等 一旦发现潜在恶意字符则服务端拒绝 返回错误 此种方式较为严格，但是随之而来的问题是失败率会有所提升 尤其对于对外开发者 而且JS中恶意字符的变形十分多 此方式需要枚举所有非法字符 可能存在疏漏 我们不应该将潜在的恶意字符都一概屏蔽 因为确实有些需求需要传入并存储这些字符
    2.对于callback参数作严整的格式检查或强制约定指定格式 基本可以彻底解决安全问题 但同样是对调用端不是完全透明 使用者需要额外去知晓相关限制和约定 可能会造成不必要的沟通成本

    1. 返回包体添加header头部 强制指定MIME类型 避免按HTML方式解析 防止XSS漏洞 这似乎是个很完美的解决方案 但是十分诡异的是 在某些版本的火狐浏览器下 直接访问MIME类型为JAVASCRIPT的请求时 浏览器仍然会按照HTML解析 或许是该浏览器设计的缺陷 但它忽略了我们设置的header 无法保证所有浏览器严格按照MIME类型解析 我们的关注点一直在于如何限制用户输入 但是请从另外一个层面去考虑该问题 或许就会豁然开朗 我们先了解一下JS本身的特性 JSONP的本质是构造全局回调函数 之后加载script标签触发回调函数  通常我们使用函数可以这么写
    function test(){}test();
    而在全局的函数也就默认是window的成员 也可以显示书写为
    window.test = function(){};window.test();
    而JS中对象的成员是可以使用字符串索引的方式访问的 故进一步改造为
    window['test']=function(){};window['test']();
    现在有注意到么 如此一来我们已经把函数名已经完全限制在了字符串上下文 理论上只要做好了防注入工作 callback参数是不可能跳出字符串上下文意外执行代码的 以PHP为例 单字符串防止注入甚至可以直接使用json_encode该字符串实现.
    window['alert("123");abc']();
    上面的callback参数虽然有注入的风险 可以由于callback参数严格限制在字符串内部 仅会作为文本 不会意外执行 但仍然存在xss漏洞问题
    看下面例子
    window['<script>alert(123);</script>']();
    我们虽然已经保证了<script>严格限制在引号内部 不会造成js注入 但是直接在浏览器中输入该jsonp请求仍会按照HTML解析 产生XSS漏洞 即便设置了header也很难防范
    在进一步 我们只需要保证浏览器内不会明文出现<>标签 那么问题便可彻底解决。
    基本思路是在服务端做一次urlencode 而在output输出decodeURIComponent(‘#####’)来规避显示尖括号 Urlencode过的字符串，只可能包含字母数字% 也顺便解决了注入的问题
    
    最终附上一段简短的代码。根本解决jsonp的安全问题 
    <?php header('Content-type: text/javascript'); //加上此句可以消除chrome的警告 $callback = urlencode($_GET['callback']); echo "window[decodeURIComponent('{$callback}')]({ret:0,msg:’OK’});"

详解: https://blog.csdn.net/jian_xi/article/details/66474717

使用场景?
    当A网站使用B服务器的数据 因为在不同的网段ajax无法进行跨域处理，但是如果对方将A网站需要的数据使用js进行封装 然后A网站可以通过src标签直接获取B服务器上的js文件 然后解析获取需要的数据
    应用领域: 一些网站的天气预报功能 股票动态信息显示

2. CORS-----------------
它允许浏览器向跨源服务器 发出XMLHttpRequest请求 从而克服了Ajax只能同源使用的限制
CORS需要浏览器和服务器同时支持 目前 所有浏览器都支持该功能 IE浏览器不能低于IE10

整个CORS通信过程 都是浏览器自动完成 不需要用户参与 对于开发者来说 CORS通信与同源的Ajax通信没有差别 代码完全一样 浏览器一旦发现Ajax请求跨源 就会自动添加一些附加的头信息 有时还会多出一次附加的请求 但用户不会有感觉
因此 实现CORS通信的关键是服务器 只要服务器实现了CORS接口 就可以跨源通信

浏览器把CORS请求分成两类 简单请求和非简单请求?
简单请求
    请求方法
        HEAD
        GET
        POST
    HTTP的头部信息不超过以下几种字段
        Accept
        Accept-Language
        Content-Language
        Last-Event-ID
        Content-Type: 只限于三个值 application/x-www-form-urlencoded multipart/form-data text/palin    
凡是不同时满足上面的两个条件 就属于非简单请求

浏览器对这两种请求的处理是不一样的?
    1. 非简单请求是那种对服务器有特殊要求的请求 比如请求方法是PUT或DELETE 或者Content-Type字段的类型是application/json。
    2. 非简单请求的CORS请求 会在正式通信之前 增加一次HTTP查询请求 称为"预检"请求（preflight）。
    3. 浏览器先询问服务器 当前网页所在的域名是否在服务器的许可名单之中 以及可以使用哪些HTTP动词和头信息字段 只有得到肯定答复 浏览器才会发出正式的XMLHttpRequest请求 否则就报错。

与JSONP的比较: CORS和JSONP的使用目的相同 但是比JSONP更强大 JSONP只支持GET请求 CORS支持所有类型的HTTP请求 JSONP的优势在于支持老式浏览器 以及可以向不支持CORS的网站请求数据

cors使用场景?
    1. cors在移动终端支持的不错 可以考虑在移动端全面尝试 PC上有不兼容和没有完美支持 所以小心踩坑 当然浏览器兼容就是个伪命题 说不准某个浏览器的某个版本就完美兼容了 说不准就有点小坑 尼玛伤不起！
    2. jsonp是get形式 承载的信息量有限 所以信息量较大时CORS是不二选择 
    3. 配合新的JSAPI(fileapi、xhr2等)一起使用 实现强大的新体验功能。

cors详解: http://www.ruanyifeng.com/blog/2016/04/cors.html
详解: https://www.cnblogs.com/Darren_code/p/cors.html

3. postMessage--------------
H5中有一种功能就是跨文本档丶多窗口丶跨域消息传输 getMessageHTML.postMessage(message, targetorigin, [transfer]); getMessageHTML是我们对于接受信息的页面引用 可以是iframe的contentWindow window window.open的返回值 message指要发送到其他window的数据 targetOrigin是用于指定哪些窗口能够接受到的消息事件 其实可以是字符串"*"的时候不做限制或者一个URL 如果目标窗口的协议丶主机地址或端口这三者的任意一项不匹配targetOrigin提供的值 那么消息就不会倍发送 只有这三者完全匹配 消息才会被发送 transfer(可选) 是一串和message同时传递的Transferable对象 这些对象的所有权将被转移到消息的接收方 而发送一方将不再保有所有权

怎么接受信息?
window.onmessage = function(e) {
    console.log(e.data);
}

使用场景?
    页面与其打开的新窗口的数据传递
    多窗口之间消息传递
    页面与嵌套的iframe消息传递
    上面三个场景的跨域数据传递

所谓浏览器兼容性几乎变成了IE几开始支持的问题了... 不过好消息是跟localStorage一样 IE8+都支持了 只不过有些浏览器的低版本（比如FireFox4.0）并不支持window.onmessage=function(){}这种写法 所以我么最好使用事件绑定的写法 为了兼容IE 也要判断是否支持addEventListener 

详解: https://www.cnblogs.com/dolphinX/p/3464056.html

4. WebSocket--------------
WebSocket 是一种网络通信协议很多高级功能都需要它
WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。

为什么需要WebSocket?
    1. 因为HTTP协议有一个缺陷: 通信只能由客户端发起
    2. 举例来说 我们想了解今天的天气 只能是客户端向服务器发出请求 服务器返回查询结果 HTTP协议做不到服务器主动向客户端推送信息
    3. 这种单向请求的特点 注定了如果服务器有连续的状态变化 客户端要获知就非常麻烦 我们只能使用"轮询": 每隔一段时候 就发出一个询问 了解服务器有没有新的信息 最典型的场景就是聊天室 
    4. 轮询的效率低 非常浪费资源（因为必须不停连接 或者HTTP连接始终打开） 因此 工程师们一直在思考 有没有更好的方法 WebSocket就是这样发明的

WebSocket的特点?/WebSocket是什么?
    1. 它的最大特点就是 服务器可以主动向客户端推送信息 客户端也可以主动向服务器发送信息 是真正的双向平等对话 属于服务器推送技术的一种 
    其他特点包括：
    2. 建立在TCP协议之上 服务器端的实现比较容易 
    3. 与HTTP协议有着良好的兼容性 默认端口也是80和443 并且握手阶段采用HTTP协议 因此握手时不容易屏蔽，能通过各种HTTP代理服务器
    4. 数据格式比较轻量 性能开销小 通信高效 
    5. 可以发送文本 也可以发送二进制数据 
    6. 没有同源限制 客户端可以与任意服务器通信 
    7. 协议标识符是ws（如果加密，则为wss） 服务器网址就是URL

决定手头的工作是否需要使用WebSocket技术的方法很简单?
    1. 你的应用提供多个用户相互交流吗？
    2. 你的应用是展示服务器端经常变动的数据吗？
WebSocket使用场景?
    1. 股票基金报价
    2. 体育实况更新
    3. 多媒体聊天
    4. 在线教育

详解: https://blog.csdn.net/lldouble/article/details/80742082

// 事例
var ws = new WebSocket("wss://echo.websocket.org");
ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};
ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};
ws.onclose = function(evt) {
  console.log("Connection closed.");
};     

详解: http://www.ruanyifeng.com/blog/2017/05/websocket.html

5. window.name + iframe-------------
window.name属性的独特之处: name值在不同的页面(甚至不同域名)加载后依旧存在 并且支持非常长的name值(2MB)
和location.hash方法差不多 主页面有一个iframe 通过iframe的src属性由外域转向本地域 跨域数据即由iframe的window.name从外域传递到本地域 这个就巧妙地绕过了浏览器的跨域访问限制 但同时它又是安全的操作.

有坑?
    提示啥协议、主机、端口三者要一致 这不是赤裸裸地告诉你跨域了么 为什么会这样 因为规定如果index.html页面和和该页面里的iframe框架的src如果不同源 则也无法操作框架里的任何东西 所以就取不到iframe框架的name值了 告诉你我们不是一家的 你也休想得到我这里的数据 既然要同源 那就换个src去指 前面说了无论怎样加载window.name值都不会变化 于是我们在index.html相同目录下 新建了个proxy.html的空页面

    理想似乎很美好 在iframe载入过程中 迅速重置iframe.src的指向 使之与index.html同源 那么index页面就能去获取它的name值了 但是现实是残酷的 iframe在现实中的表现是一直不停地刷新 也很好理解 每次触发onload时间后 重置src 相当于重新载入页面 又触发onload事件 于是就不停地刷新了（但是需要的数据还是能输出的）

iframe = document.createElement('iframe');
iframe.style.display = 'none';
var state = 0;
iframe.onload = function() {
    if(state === 1) {
        var data = JSON.parse(iframe.contentWindow.name);
        console.log(data);
        iframe.contentWindow.document.write('');
        iframe.contentWindow.close();
    }else if(state === 0) {
        state === 1;
        iframe.contentWindow.location = 'http://localhost/test/index1.html';
    }
};
iframe.src = 'https://www.baidu.com';
document.body.appendChild(iframe);

总结:
能使用这种方式跨域，有几个条件必不可少。
    iframe标签的跨域能力
    window.name属性值在文档刷新后依旧存在的能力

详解: https://www.tuicool.com/articles/viMFbqV

6. location.hash + iframe--------------
实现原理: a.html欲与c.html跨域相互通信 通过中间页b.html来实现 三个页面 不同域之间利用iframe的location.hash传值 相同域之间直接js访问来通信

具体实现步骤: 一开始a.html给c.html传一个hash值 然后c.html收到hash值后 再把hash值传递给b.html 最后b.html将结果放在a.html的hash中
利用location.hash来传值 改变hash不会刷新页面 

缺点: 数据直接暴漏在url中 数据长度和类型都限制

跨域通信过程如下
// a.html
<iframe src="http://localhost:4000/c.html#iloveyou"></iframe>
<script>
window.onhashchange = function () { //检测hash的变化
    console.log(location.hash);
}
</script>
// b.html
<script>
window.parent.parent.location.hash = location.hash
//b.html将结果放到a.html的hash值中，b.html可通过parent.parent访问a.html页面
</script>
// c.html
console.log(location.hash);
let iframe = document.createElement('iframe');
iframe.src = 'http://localhost:3000/b.html#idontloveyou';
document.body.appendChild(iframe);

详解: https://mp.weixin.qq.com/s/HxJI0q_5_nqf-tKX2pz1FQ

7. document.domain + iframe-----------
该方式只能用于主域相同子域不同的情况下 比如a.test.com和b.test.com适用于该方式 只需要给页面添加document.domain='test.com'表示二级域名都相同就可以实现跨域

.com => 一级域名
test.com => 二级域名
a.test.com => 三级域名
详解: https://baike.baidu.com/item/%E4%BA%8C%E7%BA%A7%E5%9F%9F%E5%90%8D/4778701?fr=aladdin

实现原理: 两个页面都通过js强制设置document.domain为基础主域 就实现了同域
页面的domain默认值等于window.location.hostname 

缺点:
    一个网页被攻击 另外一个站点就会引起安全漏洞 
    操作繁琐一个页面引入多个iframe 并且它们必须都设置相同的domain

8. 服务器代理中转(Node中间件代理[两次跨域])-------------
实现原理: 同源策略是浏览器需要遵循的标准 而如果是服务器向服务器请求就无需遵循同源策略 

代理服务器 需要做以下几个步骤:
    接受客户端请求 
    将请求转发给服务器
    拿到服务器响应数据
    将响应转发给客户端

上述代码经过两次跨域，值得注意的是浏览器向代理服务器发送请求，也遵循同源策略 

9. nginx反向代理
实现原理类似于Node中间件代理 需要你搭建一个中转nginx服务器 用于转发请求

使用nginx反向代理实现跨域是最简单的跨域方式 只需要修改nginx的配置即可解决跨域问题支持所有浏览器 支持session 不需要修改任何代码 并且不会影响服务器性能 

实现思路: 通过nginx配置一个代理服务器（域名与domain1相同 端口不同）做跳板机 反向代理访问 domain2接口 并且可以顺便修改cookie中domain信息 方便当前域cookie写入 实现跨域登录。

10. flash ----------------
很久之前的方法 不做考虑


详解: https://mp.weixin.qq.com/s/HxJI0q_5_nqf-tKX2pz1FQ

7) ?????????????????????????/

8)
闭包定义: 当内部函数被保存到外部时 将会生成闭包 闭包会导致原有作用域链不释放 造成内存泄露 

闭包的好处: 
    1. 变量长期驻扎在内存中
    2. 避免污染全局变量
    3. 私有成员的存在

闭包的坏处: 
    1. 增大内存的使用量 2. 容易造成内存泄漏

闭包的作用/使用场景?
    实现公有变量
        eg: 函数累加器
    可以做缓存 
        eg: eater
    可以实现封装 属性私有化
        eg: Person()

// 累加器
function add() {
    var count = 0;
    function demo() {
        count ++;
        console.log(count);
    }
    return demo;
}
var counter = add();
counter();
counter();        

// 缓存
function eater() {
    var food = '';
    var obj = {
        eat: function() {
            console.log('i am eating'  + ' ' + food);
            food = '';
        },
        push: function(myFood) {
            food = myFood;
        }
    }
    return obj;
}
var eater1 = eater();
eater1.push('banana');
eater1.eat();

// 闭包的私有化
function Deng(name, wife) {
    var prepareWife = 'xiaozhang';
    this.name = name;
    this.wife = wife;
    this.divorce = function() {
        this.wife = prepareWife;
    }
    this.changePrepareWife = function(target) {
        prepareWife = target;
    }
    this.sayPrepareWife = function() {
        console.log(prepareWife);
    }
}
var deng = new Deng('deng', 'xiaoliu'); 
deng.prepareWife;
deng.sayPrepareWife();

闭包的防御
    闭包会导致多个执行函数共用一个公有变量 如果不是特殊需要 应尽量防止这种情况发生

解决闭包的方法?
    使用立即执行函数

立即执行函数定义: 此类函数没有声明 在一次执行过后释放 适合做初始化工作 

立即执行函数与普通函数的区别: 执行完就被释放了

function test() {
    var arr = [];
    for(var i = 0; i < 10; i++) {
        arr[i] = function() { // 语句执行 =  函数定义
            console.log(i);
        }
    }
    return arr;
}
var myArr = test();
for(var i = 0; i < 10; i++) {
    myArr[i]();
}

function test() {
    var arr = [];
    for(var i = 0; i < 10; i++) {
        (function(j) {
            arr[j] = function() {
                console.log(j);
            }
        }(i))
    }
    return arr;
}
var myArr = test();
for(var i = 0; i < 10; i++) {
    myArr[i]();
}    

9)
Promise是异步编程的一种解决方案 所谓的Promise 简单来说就是一个容器 里面保存着未来才会结束的事件的结果

Promise对象有以下两个特点
1. 对象的状态不受外界影响 Promise对象代表一种异步操作 有三种状态:Pending(进行中) Resolved(已完成) Rejected(已失败) 只有异步操作的结果可以改变状态 其他的任何操作都不能改变状态
2. 一旦状态改变了 就不会再变了 任何时候都可以得到这个结果 Promise对象的状态只有两种可能:Pending->Resolved或Pending->Rejected 只要这两种情况发生了 状态就不会发生改变了 并且会一直保持这个结果 这与事件监听不同 事件的特点是 不同时间监听 得到的结果是不同的 

当然Promise也有一些缺点 
1. 首先无法取消Promise 一旦创建它就会立即执行 中途无法取消
2. 其次 如果还不设置回调函数 Promise内部跑出的错误 不会反映到外部
3. 最后 当处于Pending状态时 无法得知目前进展到哪一个阶段了

使用场景:
1. Ajax请求
2. 自定义弹窗处理
3. 图片加载

详解: https://juejin.im/entry/58e1d720ac502e006c0e0196

10)
箭头函数的特点/特性
1. 不用写function关键字
2. 只能作为函数使用不能new 没有原型
3. 参数不能重复命名
4. 内部arguments this由定义时外围最接近一层的非箭头函数的arguments和this决定其值
5. 返回值可以不写return 但是有时需要配合{}
 

箭头作用/好处:
    函数的指向性更强 可读性好 简化代码 提高开发效率

使用箭头函数有几个注意点:
1. 函数体内的this对象 就是定义时所在的对象 而不是使用时所在的对象 
2. 不可以当作构造函数 也就是说 不可以使用new命令 否则会抛出一个错误
3. 不可以使用arguments对象 该对象在函数体内不存在 如果要用 可以用Rest参数代替
4. 不可以使用yeild命令 因此箭头函数不能用作Generator函数

箭头函数可以让this指向固定化 这种特性很有利于封装回调函数

this指向的固定化 并不是因为箭头函数内部有绑定this的机制 实际原因是箭头函数根本没有自己的this 导致内部的this就是外层代码块的this 正是因为它没有this 所以也就不能用作构造函数

箭头函数与普通函数的区别?
1. 普通函数的声明在变量提升是最高的 箭头函数没有函数提升
2. 箭头函数没有属于的自己的this arguments
3. 箭头函数不能作为构造函数 不能被new 没有property
4. call和apply方法只有参数 没有作用域 详解(https://www.jianshu.com/p/73cbeb6782a0)





(三)
1)
重排: 当DOM的变化影响了元素的几何属性(宽或高) 浏览器需要重新计算元素的几何属性 同样其他元素的几何属性和位置也会因此受到影响 浏览器会使渲染树中受到影响的部分失效 并重新构造渲染树 这个过程称为重排 
重绘: 完成重排后 浏览器会重新绘制受影响的部分到屏幕 该过程称重绘

重排重绘的危害: 它们会导致Web应用程序的UI反应迟钝 所以 应当尽可能减少这类过程的发生

触发重排的情况
1. 添加或删除可见的DOM元素
2. 元素位置的改变
3. 元素尺寸改变
4. 元素内容改变(例如: 一个文本被另一个不同尺寸的图片代替)
5. 页面渲染初始化(这个无法避免)
6. 浏览器窗口尺寸改变

触发重绘的情况
1. 字体颜色
2. 背景颜色

优化
1. 读写分离操作
2. 样式集中改变 
    (通过class和cssText)
3. 缓存布局信息
4. 离线改变dom 
    (一旦我们给元素设置display:none时 元素不会存在于渲染树中 相当于将其从页面“拿掉” 我们之后的操作将不会触发重排和重绘 这叫做DOM的离线化)
    (通过使用DocumentFragment创建一个dom碎片 在它上面批量操作dom 操作完成之后 再添加到文档中 这样只会触发一次重排)
    (复制节点 在副本上工作 然后替换它)
5. position属性为absolute或fixed
    (position属性为absolute或fixed的元素 重排开销比较小 不用考虑它对其他元素的影响)
6. 优化动画 启动GPU加速
  (将2d transform换成3d就可以强制开启GPU加速 提高动画性能)

详解: https://imweb.io/topic/5c2206a7611a25cc7bf1d848

2)
什么是js继承?
子类可以使用父类的所有功能 并且对这些功能进行拓展

1. 传统形式(原型链继承) 
       缺点:
           过多的继承了没用的属性
2. 借用构造函数继承(类式继承)
       优点:
           可以传参
       缺点: 
           不能继承借用构造函数的原型
           每次构造函数都要多走一个函数           
3. 组合式继承(通俗来讲就是用原型链实现对原型属性和方法的继承 用借用构造函数继承来实现对实例属性的继承)
        优点: 
            避免了原型链和构造函数的缺陷 融合他们的优点 成为JavaScript中最常用的继承模式
        缺点: 
            实例和原型上存在两份相同的属性    
4. 共享原型
       不能随便改动自己的原型
5. 圣杯模式(寄生组合继承)     

1. 
Grand.prototype.lastName = 'JC'
function Grand() {}
var grand = new Grand();
Father.prototype = grand;
function Father() {
    this.name = 'hehe';
}
var father = new Father();
Son.prototype = father;
function Son() {}
var son = new Son();
2. 
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}
function Student(name, age, sex, grade) {
    Person.call(this, name, age, sex);
    this.grade = grade;
}
var student = new Student('dg', 40, 'male', 18);
3. 
Father.prototype.getfaName = function() {
    console.log(this.faName);
}
function Father(name) {
    this.faName = 'father';
}  
function Child(args) {
    this.chName = 'child';
    Father.apply(this, []);
}
Child.prototype = new Father();
Child.prototype.constructor = Child;
var child = new Child(); 
4. 
Father.prototype.lastName = 'Deng';
function Father() {}
function Son() {}
Son.prototype = Father.prototype;
var son = new Son();
var father = new Father();
5. 
function inherit(Target, Origin) {
    function F() {}
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.uber = Origin.prototype;
}
var inherit = (function() {
    function F() {}
    return function(Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.contructor = Target;
        Target.prototype.uber = Origin.prototype;
    }
})
   



3)?????????????

4)
深浅拷贝的关键的是什么?/区别
深拷贝: 内容拷贝 指向新的内存空间
浅拷贝: 指针拷贝 指向原有的空间

使用场景?
当你想用某个对象的值 在修改时不想改变原对象 那么可以用深拷贝来弄一个新的内存对象 像es6新增方法都是深拷贝 所以推荐使用es6语法

详解：https://www.jianshu.com/p/8014db65e520


浅层克隆
function clone(origin, target) {
    var target = target || {};
    for(var prop in origin) {
        target[prop] = origin[prop];
    }
    return target;
}

深层克隆
function deepClone(origin, target) {
    var target || {},
        toStr = Object.prototype.toString,
        arrStr = '[object Array]';
    for(var prop in origin) {
        if(origin.hasOwnProperty(prop)) {
            if(origin[prop] !== 'null' && typeof(origin[prop]) == 'object) {
                if(toStr.call(origin[prop]) == arrStr) {
                    target[prop] = [];
                }else {
                    target[prop] = {};
                }
                deepClone(origin[prop], target[prop]);
            }else {
                target[prop] = origin[prop];
           }
        }
    }    
    return target;
}

5) 
1. 服务器出口宽带不够用
2. 服务器负载过大忙不过来 比如说CPU和内存消耗完 
3. 网站开发代码没写好 mysql语句没有进行优化 导致数据库的读写相当耗费事件 性能优化方面也可以答把
4. 数据库的瓶颈 当我们的数据库变愈发庞大 比如好多G好多T 那么对于数据库的读写就会    变的相当缓慢了      

详解: https://blog.csdn.net/Lv_Victor/article/details/53148421  
详解: https://blog.csdn.net/qq_27626333/article/details/51602941
详解: https://blog.csdn.net/LEoe_/article/details/79475981




(四)
1)
1.  用户登录验证注册
登录注册页面前端部分内容 关注的重点还是用户的账户和密码在js代码里要做对于正则的匹配  这是验证的第一步 保证用户输入格式的正确性同时也从一方面减少用户向后台发送没必要的错误请求 前端向后端请求的方式使用POST 
在后台接受前端传送的信息同样要经过正则的规则匹配步骤 因为有可能一些人并不是通过合法的方式进行访问 可以减少没必要的数据库查询
关于HTTP环绕HTTPS因为前者是明文传输 相对后者来说不够安全 有条件对这类敏感和重要信息当然使用HTTPS
2. 用户密码的安全性
密码如何保存 明文存入数据库? 当然非常非常非常不推荐 由于大多数客户的习惯是使用相同的密码 如果明文在发生信息泄露的情况下如果发生撞库的事情 所以在密码的保存上最好在后台使用"密钥+不可逆加密算法" 如sha1丶sha256等有hash算法的不逆的加密算法进行加密后再存入数据库
3. 登录状态的保存
由于HTTP协议是无状态的 所以要记录用户的登录状态就要靠后台相应数据的维护来记录 我们通常是登录成功后在seesion中保存登录用户 然后将用户登录通过cookie返回到客户端 通过对比cookie和session信息来验证用户是否登录
4. 防止cookie被盗用
为了防止cookie被盗用的情况还要在cookie中添加token丶登录序列 这两个都是使用MD5进行加密的随机字符串 作用就是在每次登录验证时 同时验证token和登录序列还有ip地址 因为在每次登录验证成功的时候都会刷新token 如果token被盗用在正主使用旧cookie时出现登录序列相同 token不同而且ip地址多次变更的情况就要记录下此用户账户异常 并且删除后台session里的登录记录 并提醒用户
5. 密码找回功能
因为后台密码是加密没法提供明文密码的找回 所以可以设计通过手机短信验证或邮箱验证 验证成功后通过直接设置新密码的形式来进行 对于重置密码的url地址为了安全起见要通过加入时间戳和唯一随机数来保证这个链接只在某个事件内有效 如果在密码修改成功或者事件过期 就把这个唯一的随机数给删除 保存密码方式同上
6. 防止恶意攻击
最有效的手段就是加入验证码 同时记录某个用户在或ip在某个时段内如果尝试的失败登录次数超过一定阈值就限制其在几分钟内不能继续登录

详解: https://blog.csdn.net/qq_38779421/article/details/78243103

2)>???????????????????????????
https://blog.csdn.net/clementad/article/details/48788361

3) var reg = /^1[34578]\d{9}$/;

4) onchange阶段

5)
input focus blur change keydown keypress keyup




(五)
1)
var
1. 变量声明提升 
2. 可重复定义 
3. 全局变量挂载到window下面

let
1. 产生块级作用域
2. 不存在变量提升
3. 产生暂存性死区
4. 不可重复声明
5. let丶const 声明的全局变量不会挂在window(顶层对象)下面 

const命令有两个注意点
1. const声明之后必须马上赋值 否则会报错
2. const简单类型一旦声明就不能再更改 复杂类型(数组丶对象等)指针指向的地址不能更改 内部数据可以更改
3. 其余和let一样

2)
forEach: 循环遍历数组 不改变原数组 改变不了数组的遍历(return/break不好使)
forEach源码:
Array.prototype.myForEach = function(func) {
    for(var i = 0; i < this.length; i++) {
        func(this[i], i);
    }
}

map
区别: filter要的是ele map要的是return出来的结果 
map处理return出来的值 把值放在一个新的数组 默认返回undefined 浅拷贝 不改变原数组 
map源码:
Array.prototype.myMap = function(func) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        arr.push(func(this[i], i));
    }
    return arr;
}
深度map 
Array.prototype.myMap = function(func) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(this[i] && typeof this[i] == 'object) {
            var newObj = {};
            deepClone(newObj, this[i]);
            arr.push(func(newObj, i));
        }else {
            arr.push(func(this[i], i));
        }
    }
    return arr;
}
function deepClone(target, option) {
    if(option != null) {
        for(var prop in option) {
            var src = target[prop];
            var copy = option[prop];
            if(copy && typeof copy == 'object') {
                if(Object.prototype.toString.call(copy) == '[object Array]') {
                    src = [];
                }else {
                    src = {};
                }
                target[prop] = deepClone(src, copy);
            }else {
                target[prop] = copy;
            }
        }
    }
    return target;
}

filter: 刷选数组 刷选出新的数组 刷选的值由return来决定 会放在一个新的数组中返回 
Array.prototype.myFilter = function(func) {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(func(this[i], i)) {
            arr.push(this[i]);
        }
    }
    return arr;
}

reduce: 迭代数组 从左向右 累加器(效率高)
Array.prototype.myReduce = function(func, init) {
    var previous = init, k = 0;
    if(init === undefined) {
        previous = this[0];
        k = 1;
    }
    for(k; k < this.length; k++) {
        previous = func(previous, this[k], k);  
    }
    return previous;    
}

map与forEach的区别是 一个会返回结果 一个不会返回结果




(六)
1)
function fib(num) {
    if(num === 0 || num === 1) {
        return 1;
    }
    return fib(num - 1) + fib(num - 2);            
}
2) 
function AJAX(json) {
    return new Promise((resolve, reject) => {
        var url = json.url,
            method = json.method,
            flag = json.flag,
            data = json.data,
            xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Mircosoft.XMLHTTP');
        }
        if (method == 'get') {
            url += '?' + data + new Date().getTime();
            xhr.open('get', url, flag);
        } else {
            xhr.open('post', url, flag);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve();
                // console.log(xhr.responseText);
                }else {
                    reject();
                }
            } 
        }
        if(method == 'get') {
            xhr.send();
        } else {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }
    })
}
    
// AJAX({
// 	url: 'http://localhost/test/demo.json',
// 	method: 'get',
// 	data: '', 
// 	flag: true
// }).then(() => console.log('成功了'), () => console.log('失败了'));	

// var p1 = AJAX({
// 	url: 'http://localhost/test/demo.json',
// 	method: 'get',
// 	data: '', 
// 	flag: true
// })
// var p2 = AJAX({
// 	url: 'http://localhost/test/demo.json',
// 	method: 'get',
// 	data: '', 
// 	flag: true
// })

// Promise.all([p1, p2]).then(() => console.log('全部成功了'), () => console.log('有失败的'));
// Promise.race([p1, p2]).then(() => console.log('全部成功了'), () => console.log('有失败的'));

3)
// 两个我用Promise封的ajax，两个有一个成功算成功，两个失败算失败
Promise.all([
    AJAX({
        url: 'http://localhost/test/demo.json',
        method: 'get',
        data: '', 
        flag: true
    }).catch(() => 'err'),
    AJAX({
        url: 'http://localhost/test/demo.json',
        method: 'get',
        data: '', 
        flag: true
    }).catch(() => 'err')
]).then(res => {
    if(res.every(r => r === 'err')) {
        console.log('失败');
    }else {
        console.log('成功');
    }
})


var arr = [1, 2, 3, 4];
console.log(arr.every(function(value, index, arr) { // 当前值 当前索引值 当前数组
    return num > 0;
}));
every() 方法用于检测数组所有元素是否都符合指定条件（通过函数提供）。
every() 方法使用指定函数检测数组中的所有元素：
如果数组中检测到有一个元素不满足，则整个表达式返回 false 且剩余的元素不会再进行检测。
如果所有元素都满足条件，则返回 true。
注意： every() 不会对空数组进行检测。
注意： every() 不会改变原始数组。

详解: https://www.runoob.com/jsref/jsref-every.html

4) 
async简洁
    async函数 是Generator语法糖 通过babel编译后可以看出它就是Generator+Promise+Co递归思想实现的 配合await使用

目的: 优雅的解决异步操作的问题

异步编程会出现的问题
    回调地狱
    解决了try catch可以异步的方式捕获异常
    同步并发异步的结果

异步编程的最高境界，就是根本不用关心它是不是异步。
一句话，async 函数就是 Generator 函数的语法糖。

async函数的优点
async函数对Generator函数的改进 体现在以下三点
1. 内置执行器 Generator函数的执行必须靠执行器 所以才有了co函数库 而async函数自带执行器 也就是说 async函数的执行 与普通函数一模一样 只要一行
2. 更好的语义化 async和await 比起星号与yield 语义更清楚了 async表示函数里有异步操作 await表示紧跟在后面的表达式需要等待结果
3. 更广的适应性 co函数库约定 yield命令后面只能是Thunk函数或Promise对象 而async函数的await命令后面 可以跟Promise对象和原始类型的值(数值丶字符串丶布尔值 但这时等同于同步操作)

async 函数是非常新的语法功能，新到都不属于 ES6，而是属于 ES7。目前，它仍处于提案阶段，但是转码器 Babel 和 regenerator 都已经支持，转码后就能使用。

async函数的用法
同generator函数一样 async函数返回一个Promise对象 可以使用then方法添加回调函数 当函数执行的时候 一旦遇到await就会先返回 等到触发的时候异步操作完成 再接着执行函数体内后面的语句 

注意点
    1. await命令后面的Promise对象 运行结果可能是rejected 所以最好把await命令放在try...catch代码块中
    2. await命令只能用在async函数之中 如果用在普通函数 就会报错
    上面代码会报错 因为await用在普通函数之中了 但是 如果将forEach方法的参数改成async函数 也有问题 上面代码可能不会正常工作 原因是这时三个db.post操作将是并发执行 也就是同时执行 而不是继发执行 正确的写法是采用for循环
    3. 如果确实希望多个请求并发执行 可以使用Promise.all方法

详解: http://www.ruanyifeng.com/blog/2015/05/async.html




(七)
1) (二)(8)
什么是内存泄露?
应用程序不再需要占用内存的时候 由于某些原因 内存没有被操作系统或可用内存池回收

内存泄露的例子?
1. 在函数内未声明变量就赋值 这样会在全局对象创建一个新的变量 或者是使用this创建了全局的变量
2. 使用计时器setInterval()未清除 在老版本的IE6是无法处理循环引用的 会造成内存泄露
3. 脱离DOM的引用
4. 闭包

如何识别内存泄露?
1. Chrome查看浏览器
2. 命令行可以使用 Node 提供的process.memoryUsage方法。

解决方法?
ES6 考虑到了这一点，推出了两种新的数据结构：WeakSet 和 WeakMap。它们对于值的引用都是不计入垃圾回收机制的，所以名字里面才会有一个"Weak"，表示这是弱引用。

详解: https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/
详解: http://www.ruanyifeng.com/blog/2017/04/memory-leak.html

2) (二)(3)

3) ??????????????????????/

4)
macro-task(宏任务)：包括整体代码script，setTimeout，setInterval
micro-task(微任务)：Promise，process.nextTick promise.then 

process.nextTick(callback)类似node.js版的"setTimeout" 在事件循环的下一次循环中调用callback回调函数

详解: https://juejin.im/post/59e85eebf265da430d571f89

5) (三)(2)

6)
class Plane {
    static alive() {
        return true;
    }
    constructor(name) {
        this.name = name || '普通飞机';
        this.blood = 100;
    }
    fly() {
        console.log('fly');
    }
};
class AttackPlane extends Plane{
    constructor(name) {
        super(name);
        this.logo = 'duyi';
    }
    dan() {
        console.log('bububu');
    }
}
var oAp = new AttackPlane('攻击机');
console.log(oAp);

子类必须在constructor方法中调用super方法 否则新建实例时会报错 这是因为子类没有自己的this对象 而是继承父类的this对象 然后对其进行加工

只有调用super之后才可以使用this关键字 否则会报错 这是因为子类实例的构建 是基于对父类实例加工 只有super方法才能返回父类实例

ES5的继承实质是先创造子类的实例对象this 然后再将父类的方法添加到 this上面（Parent.call(this)）
ES6的继承机制实质是先创造父类的实例对象this（所以必须先调用 super() 方法） 然后再用子类的构造函数修改this

继承的话这样来写它主要还是去继承原型属性和静态属性 这种私有顺序怎么继承呢 construtor里的第一行写super()
静态方法继承过来也是在函数名上 而不是在你原型上的 

总结
1. 必须用new的方式来执行 
2. 通过class来定义这种类 它的原型属性不能枚举 静态属性也是不能枚举的
3. 静态属性要放到真正的函数上来 而非原型 

7) (七)(4)




(八)
1) 
京东做首屏优化的案例 
1. 通过前端缓存和异步加载js已经完美的实现了首屏快速加载 在PC端达到了秒开的级别 
2. 把需要请求的路径写在dom上(例如data-tpl="elevator_tpl") 用户滚动时 一旦该模块进入了视窗 则请求dom上对应的data-tpl地址 拿到渲染这个模块锁需要的脚本和数据 
3. 不过这之间还有一层本地缓存localstorage 如果在本地缓存中匹配到了对应的hash string内容 则直接渲染 否则请求到数据之后更新本地缓存 
4. localstorage中的version会在页面加载时候 与后端文件hash相对比 hash不变直接取localstorage中的内容(当然也可以使用cookie判断版本)
5. 请求脚本和请求数据单独分开
为啥不在返回的内容中直接把脚本也输出出来? 为了让数据充分缓存下了不少功夫 数据的变化频率高 如果数据把初始化脚本包装在一起 虽然节约了一个请求 但一旦数据变化 整个脚本都得重新加载 而将数据和脚本分离 脚本可以长时间缓存在本地 单独请求数据 这个量会小很多 直接改变上面的version版本号便可以让浏览器重新请求最新脚本
6. 从上面可以看出 任何一个模块的改动 在前端只会引起一个较小的加载变化 加上http的缓存策略 服务器的压力也是很小的 
7. css静态文件 为了求快 首页是没有css外链的 这样会再发起多次请求 那有人可能会问没有css外链 那如果一整个页面的css是否会增加页面的体积 页面切分为模块化加载 对应模块下的css交给js或jsonp请求返回
8. js文件怎么加载的
京东一次请求返回多个脚本文件 从而避免多次请求 减少了服务器交互的时间
9. js如何执行
懒执行 有交互才执行 
10. 图片如何处理
图片在其他屏(非首屏)都采用懒加载 这样既能节省流量 也能减少请求数或延迟请求数
11. 服务器需要做什么?
少量静态文件的域名 图片和iconfont均是放在同一个域下 减少DNS的解析事件 最好做到域名收敛
模块化接口的支持
首屏内容最好做到静态缓存
详解: https://www.cnblogs.com/jingh/p/6531105.html#3962455

域名收敛是什么?
PC时代为了突破浏览器的域名并发限制 有了域名发散
浏览器有并发限制 是为了防止DDOS攻击
域名收敛: 就是将静态资源放在一个域名下 减少DNS解析的开销
域名发散: 是将静态资源放在多个子域名下 就可以多线程下载 提高并行度 使客户端加载静态资源更加迅速
域名发散是PC端为了利用浏览器的多线程并行下载能力 而域名收敛多用于移动端 提高性能 因为DNS解析是从后向前迭代解析 如果域名过多性能下降 增加DNS的解析开销
详解: https://blog.csdn.net/fan2252228703/article/details/78119061

详解: https://www.barretlee.com/blog/2016/04/01/optimization-in-taobao-homepage/

2)
Promise.all()方法用于将多个实例Promise实例 包装成一个新的Promise实例 var p = Promise.all([p1, p2, p3]); 当p1p2p3的状态都是成功的时候 p的状态才是成功的 并把p1p2p3的返回值组成一个数组 传递给p的回调函数 否则只要有一个是失败的状态 那么p的状态就变成失败的 此时第一个失败的实例的返回值就会传递给p的回调函数 

Promise.race()方法同样是将多个Promise实例 包装成一个新的Promise实例 用法和all是一样的 它与Promise.all()不同的在于 Promise.race()只要有一个状态改变了 p的状态就会改变 并且变成和第一个状态改变之后的一样的状态 把那个率先改变的Promsie实例的返回值传递给p的回调函数

3) (二)(8)

4)
如何第一时间定位
1. ping命令查看连接服务器的时间和丢包情况
2. 查看同台服务器上其他网站的打开速度
3. 如果空间打开的速度时快时慢，甚至有时候打不开，那就是空间不稳定的原因。要找你的空间商解决或换空间商了；如果是在有的地方打开速度快，有的地方打开速度慢，那应该是网络线路的问题。电信线路用户访问放在联通服务器的网站，联通线路用户访问放在电信服务器上的网站，相对来说打开速度肯定是比较慢。
4. 从网站本身找原因
详解: https://www.cnblogs.com/jiangjunli/p/7654879.html




(九)
1)
function mySetInterval(fn, time) {
    function interval() {
        setTimeout(interval, time);
        fn();
    }
    setTimeout(interval, time);
}

// 更好的实现
function mySetInterval(fn, time, count) {
    function interval() {
        if(typeof count === 'undefined' ||  count-- > 0) {
            setTimeout(interval, time);
            try {
                fn();
            }catch(e) {
                    time = 0;
                    throw e.toString();
            }
        }
    }
    setTimeout(interval, time);
}

详解: https://www.cnblogs.com/pwei/p/setinterval.html




(十)
1)
1. 变量: 变量允许我们单独定义一系列通用的样式 然后在需要的时候去调用 所以在做全局样式调整的时候我们可能只需要修改几行代码就可以了 
2. 混合: 混合可以将定义好的classA轻松的引入到另一个classB中 从而简单实现classB继承classA中的所有属性 我们还带参数的调用 就像使用函数一样 
3. 嵌套: 我们可以在一个选择器中嵌套另一个选择器来实现继承 这样很大程度减少了代码量 并且代码看起来更加的清晰 
4. 函数和运算: 运算提供了加 减 乘 除操作外 我们还可以做属性值和颜色的运算 这样就可以实现属性值之间的复杂关系 Less中的函数--映射了JavaScript代码 如果你愿意的话可以操作属性值

详解: https://blog.csdn.net/qq_38719039/article/details/81070292

2) ??????????????????

3) (二)(10)

4) (五)(1)

5) ????????????




(十一)
1) (二)(9)

2) (六)(4)

3) (二)(3)

4) (二)(8)

5) (三)(2)




(十二)
1) 
var str = 'hello-world-thanks';
var reg = /-(\w)/g;
console.log(str.replace(reg, function($, $1) {
    return $1.toUpperCase();
}));

2) (二十六)(9)



(十三)
1) 
1. 浏览器默认的margin和paddding不同
解决方案是在全局加一个全局的*{margin: 0; padding: 0;}来统一
2. 双外边距浮动问题
问题出现的浏览器：IE6及其更低的版本
问题描述：任何浮动的元素上的外边距加倍，例如：如果元素设置的外边距为margin-left: 15px，在浏览器里会显示为margin-left: 30px。
解决方法：将元素的display属性设置为inline，因为元素为浮动的，所以这么设置不会影响元素在浏览器的显示。
3. 像素问题
问题出现的浏览器：IE6及其更低的版本
问题描述：两个相邻的div之间有3个像素的空隙，一个div使用了float，而另一个没有使用产生的。
解决方法: 
A. 对另一个div也使用float；
B. 给浮动的div添加属性margin-right: –3px，但是这样写，在其他浏览器又会不正常，所以我们需要添加IE6的hack，在属性margin-right前添加下划线_margin-right: –3px。（IE6以及更低版本的hack，是在属性前面添加下划线_）
4. IE6不支持min-*
问题出现的浏览器：IE6及其更低的版本
问题描述：IE6不支持min-height该属性。即使定义了元素高度，如果内容超过元素的高度，IE6在解析时，会自动延长元素的高度。
解决方法：利用IE6不识别!important，给元素设置固定高度，并且设置元素高度自动。
height: auto !important;
height: 300px;
min-height: 300px;
因为IE6不识别!important，它值识别到height: 300px，当内容超过300px时，它会自动延长高度。
IE7及其其他浏览器都识别!important，虽然定义了height: 300px，但是!important的优先级最高。所以内容超过300px时，还是会自动延长。
5. IE6不支持png-24透明图片
问题出现的浏览器：IE6及其更低的版本
问题描述：在IE6中，使用png-24透明图片，不透明。
解决方法：图片使用gif格式或者png-8格式图片。

详解: https://blog.csdn.net/oaa608868/article/details/53464517

2)
1. 确定是否真的是系统有问题 还是用户操作问题
2. 在测试环境 本地环境能否重现
3. 排查部署问题
4. 排查数据问题
5. 排查并发问题 性能问题
5. 排查网络因素 CDN 缓存 客户端兼容性等运行环境因素

详解: https://www.cnblogs.com/still-windows7/p/chulixitongwentijingyan.html

3)
1. 解决页面使用overflow:hidden在ios上滑动卡顿的问题    
首先你可能给页面的html和body增加了height: 100% 然后就可能造成IOS页面滑动的卡顿问题 解决方案是:
看是否能把Body和html的height:100%去除掉
在滚动的容器中增加:-webkit-overflow-scrolling:touch或者给body增加body{overflow-x:hidden}
2. IOS机型margin属性无效问题 
设置html/body的高度为百分比时 margin-bottom在safari里失效
直接padding代替margin
3. ios绑定点击事件不执行
添加样式cursor:pointer; 点击后消除背景闪一下的css: -webkit-tap-heighlight-color:transparent;

详解: https://segmentfault.com/a/1190000015178877

4)
什么是前端工程化?
前端工程化是根据业务特点 将前端开发流程规范话 标准化 它包括了开发流程 技术选型 代码规范 构建发布等 用于提升前端工程师的开发效率和代码质量

前端过程化体系?
Node服务层
Web应用层
前端运维层

前端工程化的好处与体现?
实现前端工程化的目的简单来说就是通过流程规范丶自动化构建工具来提升前端的开发效率丶性能丶质量丶多人协作能力以及开发体验

1. 代码规范: 保证团队所有成员以同样的规范开发代码。
2. 分支管理: 不同的开发人员开发不同的功能或组件，按照统一的流程合并到主干。
3. 模块管理: 一方面，团队引用的模块应该是规范的;另一方面，必须保证这些模块可以正确的加入到最终编译好的包文件中。（以上两点可以总结为模块化或者组件化开发。）
4. 自动化测试：为了保证和并进主干的代码达到质量标准，必须有测试，而且测试应该是自动化的，可以回归的。
5. 构建：主干更新以后，自动将代码编译为最终的目标格式，并且准备好各种静态资源，
6. 部署。 将构建好的代码部署到生产环境。

详解: https://www.jianshu.com/p/171996f5b12c
详解: https://www.cnblogs.com/ihardcoder/p/5378290.html

5)
1. 前后端逻辑混合开发模式
优点:
    用户体验好 在相同的网络条件和业务复杂度以及硬件情况下 它可以进行快速的首屏渲染 避免了Ajax请求所带来的渲染延迟 
    有利于SEO搜索引擎优化
    方便静态化 在访问高峰期可以将某些访问量大并且业务数据大部分不变的页面生成静态页面进行缓存 有利于快速渲染
缺点: 
    耦合度太高 在协作开发的时候前端的开发人员要与后端人员互相等待来完成整体的功能 而且后端开发人员需要理解前端的页面结构来填充逻辑代码 大大降低开发效率并且一旦出问题无法快速定位问题
    不易于维护 由于对于一个页面的维护需要牵扯到两端的开发人员来共同进行维护 在需求变更后容易出现bug
    对后端开发语言的强依赖 一旦这两种语言参杂一起 对于后端来讲前端是无法复用的
2. Ajax跨域请求前后端分离模式
优点: 
前后端的逻辑不需要混合在一起 两端的开发人员基本不需要参与对方的代码 大大提升了整体的开发效率 也方便定位问题
与第三种开发模式相比较 前端人员不需要关注中间服务器的代码编写 从一定程度上减少了工作量
在部署方面前后端可以分别部署 从一定程度上提升了前端的价值
缺点: 
首屏局部板块的渲染需要等到Ajax请求数据返回才能进行完全的展示 在网络比较慢的情况下表现尤为明显
在性能方面Ajax请求的暴涨 会影响渲染性能
异步请求的嵌套会让业务代码羞涩难懂
不利于搜索引擎优化
需要对请求的异常情况进行视图逻辑的处理
3. nodejs前后端分离模式
node引入用的 后端负责model和service 前端负责controller和view 前端可以自己做数据适配和选择协议
优点:
    node可以异步 读文件可以并行 真正做到哪个文件先渲染就先输出显示 前端机的文件系统越复杂 页面的组成片段越多 这种异步的提速效果就越明显
    前后返回空间大大提升 能玩的东西变多了 例如websocket 前端可以自己来玩并在controller层和model层上有更多的发挥空间 比如在node端自己做静态数据缓存等
    服务器优势 node本身内置服务器功能 几行代码就可以启动一个服务器 免去对apache wamp等服务器的依赖
    服务端分别部署 可以单独进行优化 也方便node做静态化
    可以进行首屏的渲染 目前像Vuejs react都可以在服务端渲染页面然后输出静态html代码 从而弥补了Ajax请求的不足
缺点: 
    学习成本增加    
    调试比较麻烦 没有像Java那样的远端调试机制 开发者一般通过console.log进行调试 当然也可以是debug模式启动node来进行调试

详解: https://www.cnblogs.com/wangshishuai/p/10148534.html

6)
console.time();
var arr = new Array(1000001);
var str = arr.join();
console.log(str.length);
console.timeEnd();

7)
Array.prototype.shuffte = function() {
    var array = this,
    var m = array.length,
        t, i;
    while(m) {
        i = Math.floor(Math.floor(Math.random() * m--));
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }    
    return array;
}

array.prototype.sort不是真正意义上的完全乱序 一些需求中(比如抽奖)这样的写法会出大问题

使用Array.prototype.sort会发现所有元素大概率停留在自己初始位置 因为在V8引擎源码中 可以清晰的看到 V8在处理sort方法时 使用了插入排序和快排两种方案 当目标数组长度小于10的时 使用插入排序 反之使用快排

优秀的lodash的_.shuffle方法 源码相关部分也是使用Fisher-Yates shuffle洗牌算法 

详解: https://www.zhihu.com/question/68330851/answer/266506621



(十四)
1) ????????????????????????

2)
事件委托/事件代理
利用事件冒泡和事件源对象进行处理

优点:
    1. 性能 不需要循环所有的元素一个个绑定事件
    2. 灵活 当有新的子元素时不需要重新绑定事件

事件对象
    event || window.event用于IE
事件源对象
    event.target 火狐独有的
    event.srcElement IE独有的
    这两chrome都有
兼任性写法

点哪个输出li的内容 给300个li绑定事件 打印出里面的内容?
var ul = document.getElementsByTagName('ul')[0];
ul.onclick = function(e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    if(target.tagName.toLowerCase() === 'li') { 
        console.log(target.innerText);
     
        console.log([].indexOf.call(oLi, target));
    }
}


var oLi = document.getElementsByTagName('li');
var len = oLi.length;
for(var i = 0; i < len; i++) {
    (function(j) {
        oLi[j].onclick = function(e) {
            console.log(e.target.innerText);
            
            console.log(j);
        }
    })(i)    
}


(十五)
1) 
1. Ajax短连接: 客户端每隔一秒钟发一次请求 服务器收到后立刻返回结果 不管有没有新数据
2. Ajax长连接: 客户端发送一次请求 服务端收到请求后查询有没有新数据 如果没有新数据就阻塞这个请求 直到有新数据或者超时为止 客户端每次收到请求返回结果立刻再发送一次请求
3. WebSocket: 是html5的新协议 基于TCP 在一次握手后 建立http连接实现客户端与服务端全双工通信 相比较轮询机制 节约资源 不需要频繁的请求 缺点是有些浏览器不支持 

详解: https://www.zhihu.com/question/20255036
websocket详解: https://www.cnblogs.com/jingmoxukong/p/7755643.html




(十六)
1)
事件委托

2) (十四)(2)

3) (二)(9)

4) (七)(4)

5) (七)(4)
promise属于微任务




(十七)
1)
1. 首先 右击电脑下面"网络连接"图标 选择"打开网络和共享中心"
2. 之后 点击网络连接选项 点击"属性"
3. 找到并点击"internet版本协议4"选项 并点击又下角"属性"选项
4. 最后 选择"自动获得DNS服务器地址" 点击确定 重启电脑即可

详解: https://jingyan.baidu.com/article/08b6a5916afc5614a9092274.html
https://zhidao.baidu.com/question/2205435229993587068.html

2)
js运行三部曲
1. 语法解析
2. 预编译
3. 解释执行

预编译前奏
1. imply global暗示全局变量: 即任何变量 如果变量未经声明就赋值 此变量就为全局对象所有
2。 一切声明的全局变量 全是window的属性

预编译四部曲
1. 创建AO对象
2. 找形参和变量声明 将变量和形参名作为AO属性名 值为undefined
3. 将实参值和形参统一
4. 在函数体里面找函数声明 值赋予函数体

3) 
模块化

什么是模块化?
模块化是将一个复杂的系统分解成多个模块 方便解码

我们要用模块化?
降低复杂度 降低代码耦合度 部署方便 提高效率 

模块化的好处?
降低命名冲突 减少变量污染空间
更好的分离代码 按需加载
更高的复用性
更高的可维护性

模块化的实现?
1. 函数的形式
2. 命名空间的形式
3. 立即执行函数
4. 模式增强

模块化规范?
CommonJS
AMD
CMD
ES6

ComonJS-------------
据CommonJs规范规定每个JS文件都可以看作一个模块 其内部定义的变量是属于这个模块的 不会对外暴漏 也就是说不会污染全局变量 该规范最初用在服务器端的node环境中

CommonJS采用同步加载不同模块文件 适用于服务器端的 因为模块文件都存在服务器端的各种硬盘上 读取加载时间快 适合服务器端 不适应浏览器

浏览器不兼容CommonJS 原因是浏览器缺少module丶export丶require丶global四个环境变量 如要使用需要工具转换

CommonJS的核心思想是想通过require方法来同步加载所要依赖的其他命模块 然后通过exports或者module.exports来导出需要暴漏的接口

暴漏接口方式
module.exports = value;
exports.xxx = value;

暴漏的模块是什么(exports的本质是什么)?
exports本质是一个空对象

引入模块 require(xxx)

CommonJS为服务器端而生 采用的同步加载方式 因此不适合浏览器 因为浏览器需要到服务器加载文件 请求时间远大于本机读取的时间 倘若文件较多 网络迟缓就会导致页面瘫痪 所以浏览器更希望能够时间异步加载的方式

AMD规范------------
AMD规范是异步加载模块 允许指定回调函数 等模块异步加载完成后即可调用回调函数 

AMD得意的产出就是require.js

AMD的核心思想就是通过defien来定义一个模块 然后使用require来加载一个模块

AMD规范的使用依赖于require.js

define(moduleId, ['module1', 'module2'], function(m1, m2) {...});

<!-- index.html -->
<script src="./js/require.js" data-main="./js/main.js"></script>

CMD规范-------
CMD异步加载 跟AMD的主要区别在于 AMD依赖前置 提前加载依赖 而CMD就近加载 按需加载

产物seaJS 跟requireJS使用有些相似

CMD的核心思想就是通过define来定义一个模块 然后使用require来加载一个模块
// index.html
<script src="./js/sea.js"></script>
<script>
   seajs.use('main.js');
</script>
// module1.js
define(function(require, exports, module) {
    var arr = [1, 2, 3];
    exports.module1 = arr;
})
// main.js
define(function(require, exports, module) {
    var module1 = require('module1.js');
    console.log(module);
})

ES6--------
ES6自带模块化 可以通过import关键字引入模块 通过export关键字导出模块 功能较之于前几个方案更为强大 也是我们推崇的 但是由于ES6目前无法在浏览器中执行 所以 我们只能通过babel将不被支持的import编译成当前广泛支持的require

AMD/CMD/UMD(了解)
ES modules(推荐的)
webpack3版本以上支持其语法 不需要插件转换
CommonJS webpack是基于NodeJS

4)
JWT(JSON WEB TOKEN)
JWT是Auth0提出的通过对JSON进行加密签名来实现授权验证的方案 就是登录登录成功后将相关信息组成json对象 然后对这个对象进行某种方式的加密 返回给客户端 客户端在下次请求时带上这个token 服务端再收到请求时校验token合法性 其实也就是在校验请求的合法性

JWT对象通常由三个部分构成的
1. Headers(请求头): 包括类别(typ) 加密算法(alg)
2. Playload(携带的用户信息): 包括需要传递的用户信息
3. Signature(加密后生成的签名): 根据alg算法与私有秘银进行加密得到的签名子串 这一段是最重要的敏感信息 只能在服务端解密

为什么需要接口鉴权呢? 怎样的业务场景下需要使用鉴权功能?
1. 客户端登录后可操作内容鉴权: 打个比方 评论是很常见的业务功能 那么在评论之前客户端需校验用户是否登录 这个时候我们就可以使用JWT产生的token来判断用户的登录状态 登陆后才会返回token 客户端请求 服务端校验
2. 登录状态过期校验: 当然有了登录之后也得有登录过期 JWT可以很简便的设置token expire时间 服务端配置每次都自动校验token是否过期  如果过期就直接抛出异常 客户端需要重新登录申请token
3. Restful Api的身份验证: 业务接口必须要使用身份验证才允许访问

过程?
1. 导入JWT的maven依赖
2. 新建JwtHelper类
3. 添加JwtFilter过滤器校验token
4. JwtConfig用来定义需过滤的那些接口 本文定义过滤后缀为'.auth'的接口
5. 获取token 登录成功后调用createJWT方法传入对应参数及失效时间(毫秒) 即可生成token返回给客户端
6. 接口路由定义事例: @GetMapping("/getUserInfo/{id}.auth"); 所有后缀是.auth的接口都会走filter校验流程
7. 前端如何传递token? 前端获取到token后只需要在接口请求header中加入token属性 值为'border; + token'

友情提示: JWT虽好 但是相对可能存在token被盗用的风险 所以尽量减少使用HTTP协议明码传输 要使用HTTPS协议传输

正常业务逻辑中 我们需要一个用户只能在一个地方登录 也就是在登录状态未失效的情况下 下一次登录必须踢掉上一次登录 然而JWT并没有实现手动token过期功能 那么我们在项目要如何实现这一功能呢?
1. 使用redis 我们可以将用户每次登录后产生的token存入redis中 key中加入用户id来识别
2. 如何判断上一次的登录已失效? 其实很简单 我们虽然做不到token真正过期 但是我们能进行新旧token对比来保证token无权限调用接口 从而达到限制单处登录功能
3. 可能会有人发现token在未过期的时间段里无法怎样登录都是一模一样的 从而无法实现新旧token对比 其实只需要在创建token的时候在claim里加上一个随机字符串即可 例: uuid
4. 在过滤器中通过解析当前传入的token拿到用户id 然后从redis取出该用户所记录的token作对比
5. ..............................

详解:https://blog.csdn.net/qq_38306688/article/details/88643545
详解: https://blog.csdn.net/qq_38306688/article/details/88647353
详解: https://blog.csdn.net/wang839305939/article/details/78713124/




(十八)
1)
懒加载的实现步骤    
    1. 刚打开首页进来就请求一次的数据 请求数据url后面加个时间戳防止再次请求访问同一个url的时候拿是浏览器缓存的值  然后加个锁设置为false防止它再次请求
    2. 用forEach循环数据 动态创建img标签  把数据中图片的地址赋予img的src 并把数据中图片的宽按比例给img设置上宽高 然后调用一个函数for循环判断哪一列的高度最低就插入图片 全部插入完毕后此时锁为true
    3. 根据滚动轮的document.documentElement/body.scrollTop值加上document.documentElement/body.clientHeight的值是否大于大于最短的一列的高度 如果大于的话 再次请求数据
懒加载的原理
    用forEach循环数据 动态创建img标签  把数据中图片的地址赋予img的src 并把数据中图片的宽按比例给img设置上宽高 然后调用一个函数for循环判断哪一列的高度最低就插入图片
    根据滚动轮的document.documentElement/body.scrollTop值加上document.documentElement/body.clientHeight的值是否大于大于最短的一列的高度 如果大于的话 再次请求数据
懒加载使用场景
    很多页面，内容很丰富，页面很长，图片较多。比如说各种商城页面。这些页面图片数量多，而且比较大，少说百来K，多则上兆。要是页面载入就一次性加载完毕。估计大家都会等到黄花变成黄花菜了
懒加载的好处
    页面加载速度快、可以减轻服务器的压力、节约了流量,用户体验好
懒加载的实现方式
    1. 第一种是纯粹的延迟加载 使用setTimeout或setInterval进行加载延迟
    2. 第二种是条件加载 符合某些条件或触发了某种事件才才开始异步下载
    3. 第三种是可视区加载 即仅加载用户可以看到的区域 这个由监控滚动条来实现 一般会在距用户看到某图片前一定距离开始加载 这样保证用户拉下时正好能看到图片
会遇到的问题--------
图片请求失败了?
    在chrome中给图片默认添加个小框框 里面有个裂开的小图标 这个小框框哪怕你给它border设置成0也不好使 你可以让当前的这个img用一个div把它包裹起来 比如div的宽度写死为200px 然后把图片的像素可以上下左右往外扩1像素 就是宽度为202px了 这个div设置一个属性overflow: hidden就可以把border隐藏起来了  
怎么插入图片?
    调用一个函数用for循环判断哪一列的高度最低就插入图片 
在瀑布流中怎么解决由于图片的动态的延迟加载出现高度不确定的问题
    1. 可把图片宽高存起来，显示的时候就按宽高比缩放。
    2. 预加载图片，动态加载得到图片URL，js拿到url后先把图片加载到本地，等所有图片加载完，再插入页面中
什么时候去请求数据加载?
    看到最短LI的立马加载好,防止用户看到空白的时间过长
为什么GET请求要把时间戳的值拼接到url后面?   
    GET请求会有浏览器的缓存  为了保证GET请求不用浏览器的缓存 在后面添加时间戳 添加时间戳的原理让当前的URL跟每次的URL都不相同
    至于为什么会有缓存?
        第一次请求 服务器会把资源放在浏览器上帮你缓存起来 第二次再访问同一个URL会拿缓存的资源 不同URL没有缓存 可以传一些无关的参数(时间戳 返回的毫秒数不会相同, 随机数小概率相同)
为什么把数据拿出来(为什么要用假数据)?
    服务器都有安全限制  它会允许你在某个时间内请求多少次 在某个间内请求的次数太多就给你限制住了 不让你请求数据 开发的时候把数据拿出来 模拟一个假数据 数据还没遭出来 模拟假数据 接口文档(请求方式 请求地址 请求参数)    

传统的实现方法是 监听scroll事件 这种方法的缺点是 由于scroll事件的密集发生 计算量很大 容易造成性能问题
目前有一个新的IntersectionObserve API 可以自动"观察"元素是否可见 Chrome51+已经支持 本质是目标元素与视口产生一个交叉区 所以这个API叫做"交叉观察器"
var io = new IntersectionObserver(callback, option);
注意点/缺点
intersectionObserver API是异步的 不随着目标元素的滚动同步触发 规格写明 即只有线程空闲下拉 才会执行观察器 这意味着 这个观察器的优先级非常低 只有在其他任务执行完 浏览器有了空闲才会执行
详解: http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

什么是预加载?
    提前加载图片 当用户需要查看时可直接从本地缓存中渲染
为什么要用到懒加载?
    图片预先加载到浏览器 访问者便可顺利地在你的网站上冲浪 并享受极快的加载速度 这对图片画廊及图片占据很大比例的网站来说是十分有利的 它保证了图片快速丶无缝地发布 也可帮助用户在浏览你网站内容时获得更好的用户体验
实现预加载的方法有哪些?
    1. 用CSS和JavaScript实现预加载
    2. 仅用JavaScript实现预加载
    3. 使用Ajax实现预加载
    常用的是new Image(); 设置其src来实现预载 再使用onload方法回调预载完成事件 只要浏览器把图片下载到本地 同样的src就会使用缓存 这是最基本也是最实用的预加载方法 当Image下载完图片后 会得到宽和高 会得到宽和高，因此可以在预载前得到图片的大小(方法是用记时器轮循宽高变化)。

懒加载和预加载的区别?
    本质是懒加载对服务端前端有一定的缓解的作用 预加载则会增加服务端前端压力

详解: https://www.jianshu.com/p/4876a4fe7731
详解: http://web.jobbole.com/86785/

2) (一)(2)

3)
1. 设置总时长为1小时倒计时 使用setInterval()每隔1秒执行一个函数 函数每次调用都减去一秒
2. 设置总时长为1小时倒计时 先调用一个函数 这个函数调用里面会都会减去1秒 在函数的最下面写这setTimout(fn, 1000)隔1秒后再次调用这个函数

详解: https://www.cnblogs.com/heizai002/p/6862418.html

4) (一)(10)

5) (七)(6) (三)(2)


6)  
1. Generator + Promise + Co库  
   缺点: co模块其实就是将两种自动执行器（Thunk函数和Promise对象）包装成一个模块 使用co的前提条件是，Generator函数的yield命令后面 只能是Thunk函数或Promise对象
2. Generator + Thunk函数 + 执行器
   缺点: 有了这个执行器 执行Generator函数方便多了 不管有多少个异步操作 直接传入run函数即可 当然，前提是每一个异步操作 都要是Thunk函数 也就是说 跟在yield命令后面的必须是Thunk函数。
3. 基于async函数和await的异步处理
  (六)(4)

Co函数库的原理
    为什么co可以自动执行Generator函数
        Generator函数就是一个异步操作的容器 它的自动执行需要一种机制 当异步操作有了结果 能够自动交回执行权
    两种方法可以做到这一点
        回调函数 将异步操作包装成Thunk函数 在回调函数里面交回执行权
        Promise对象 将异步操作包装成Promise对象 用then方法交回执行权
    co函数库其实就是把两种自动执行器(Thunk函数和Promise对象) 包装成一个库 使用co的其他条件是 Generator函数的yeild命令后面 只能是Thunk函数或Promise对象

详解: http://www.ruanyifeng.com/blog/2015/05/co.html          


Thunk 函数的含义和用法
传值调用和传名调用，哪一种比较好？回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

这就是 Thunk 函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式。

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。

http://www.ruanyifeng.com/blog/2015/05/thunk.html




以前异步编程的方式
1. 回调函数(异步编程最基本的方法) 
     优点: 简单丶容易理解和部署
     缺点: 不利于代码的阅读和维护 各部分之间高度耦合 流程会很混乱 每个任务只能指定一个回调函数
2. 时间监听(采用事件驱动模式 任务的执行不取决于代码的顺序 而取决于某个事件是否发生) 
     优点: 比较容易理解 可以绑定多个事件 每个事件可以绑定多个回调函数 而且可以去耦合 有利于实现模块化 
     缺点: 整个程序都要变成事件驱动型 运行流程会变得很不清晰
3. 发布/订阅(我们假定 存在一个"信号中心" 某个任务执行完成 就向信号中心"发布"一个信号 其他任务可以向信号中心"订阅"这个信号 从而知道什么时候自己可以开始执行 这就叫做"发布/订阅模式" 又称"观察者模式")
    优点: 这种方法的性质与"事件监听"类似 但是明显优于后者 因为我们可以通过查看"消息中心" 了解存在多少信号丶每个信号有多少订阅者 从而监控程序的运行
4. Promise对象(它的思想是 每个异步任务返回一个Promise对象 该对象有一个then方法 允许指定回调函数)
    优点: 回调函数变成了链式写法 流程可以看的很清楚 而且有一整套的配套方法 可以实现许多强大的功能 比如 可以指定多个回调函数 再比如 指定发生错误时的回调函数 而且 它还有一个前面三种方法都没有的好处: 如果一个任务已经完成 再添加回调函数 该回调函数会立即执行 所以 你不用担心是否错过了某个事件或信号 
    缺点: 编写和理解 都相对困难

详解: http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html

7) (三)(4)

8) (二)(1) (二)(3)




(十九)
1) (一)(2)

2) (三)(2)

3) (五)(1)

4) (二)(9) (六)(2)

5)
1. 创建/更新DOM树和请求css/image/js:  浏览器请求HTML代码后 在生成DOM树最开始的阶段(字节 -> 字符) 并行发起css/image/js请求
2. 创建/更新 CSSOM树:  CSS文件下载 开始构建CSSOM树
3. 创建/更新 渲染树:  所有CSS文件下载完成后 CSSOM树构建结束和DOM树一起生成渲染树
4. 布局:  通过渲染树 浏览器已经知道网页有哪些节点 各个节点CSS定义以及它们的从属关系 计算出每个节点在屏幕中的位置
5. 绘画:  根据布局 按照算出来的规则 通过显卡 把内容画到屏幕上

以上五个步骤 前三步都有创建/更新是因为DOM/CSSOM/渲染树可能在第一次绘画后多次更新 比如JS修改了DOM/CSS 布局和绘画也会被重复执行 除了DOM/CSSOM更新原因外 图片下载完成后也需要调用布局和绘画来更新网页
	   



(二十)
1) (八)(1)




(二十一)
1) Promise源码???????????????




(二十二)
1)
Generator简介:
    生成器 本身是函数 执行后返回迭代对象 函数内部要配合yeild使用Generator函数会分段执行 遇到yeild即暂停

特点
   function和函数名之间需要带*
   函数体内部yield表达式 产出不同的内部状态(值)

Generator作用
    配合Promise简洁回调地狱问题

配合库
    co

使用场景
    可以在任意对象上部署Iterator接口 配合Promise和Co库解决回调地狱的问题    

详解: http://www.ruanyifeng.com/blog/2015/04/generator.html

2)
this绑定情况
1. 函数预编译过程this --> window
2. 全局作用域this --> window
3. call/applay可以改变函数运行时this指向
4. obj.func(); func()里面的this指向obj
5. 箭头函数里的this 内部arguments和this 由定义时外围最接近一层的非箭头函数的arguments和this决定其值

3) (二)(10)

4) (二)(8)

5) (一)(9)

6) 
判断数组还是对象的五种方法

1. instanceof
A instanceof B
    A对象是不是B构造函数出来的实例(看A对象的原型链上有没有B的原型)
缺点:   
    不能跨页面判断(就是在多窗口和多框架的web页面中兼容不好)
2. constructor
定义: 返回实例的构造函数 即返回创建此对象的函数引用
缺点: 
    不能跨页面判断(就是在多窗口和多框架的web页面中兼容不好)
    在一些跨框架的页面中的数组 使用该方法可能不会那么顺利 原因是在不同的框架中创建的数组不会相互共享其prototype属性
3. Object.prototype.toString.call()
4. Array.isArray(arr) 
   缺点:
       兼容问题(大部分浏览器内置Array内部实现了isArray判断数组的方法 少数低版本浏览器没有 比如IE8及以下版本)
5. Array.prototype.isPrototypeOf()
定义: 判断Array是否在它的原型链中


自己封装的判断是否是数组的方法
function myIsArray(value){
    if(Array.isArray){
        return Array.isArray(value);
    }else{
        return Object.prototype.toString.call(value) === '[object Array]';
    }
}

详解: https://blog.csdn.net/qq_33769914/article/details/82752481
详解: https://www.cnblogs.com/leaf930814/p/6659996.html

6) 
改写原型




(二十三)
1)
undefined

上面代码中 printName方法中的this 默认指向Logger类的实例 但是 如果将这个方法提取出来单独使用 this会指向该方法运行时所在的环境（由于 class内部是严格模式 所以 this实际指向的是undefined） 从而导致找不到print方法而报错

解决方法
1. 一个比较简单的解决方法是 在构造方法中绑定this 这样就不会找不到print方法了
2. 另一种解决方法是使用箭头函数
3. 还有一种解决方法是使用Proxy 获取方法的时候 自动绑定this 

详解: https://blog.csdn.net/zhjzls/article/details/80038353
详解: http://es6.ruanyifeng.com/#docs/promise#Promise-all

2) (二)(9)

3)
// 1 2 3
// 4 5 6
// 7 8 9

// 1             [0, 0]                  0
// 2 4           [0, 1] [1, 0]           1
// 3 5 7         [0, 2] [1, 1] [2, 0]    2
// 6 8           [1, 2] [2, 1]           3
// 9             [2, 2]                  4
var arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
function print(arr) {
    //总循环次数，要求性能最高，数组多少个数就循环多少次
    var allcount = 0;
    //大体上打印多 少行，也就是上图的斜线条数
    var allLen = arr.length + arr[0].length - 1;
    //二维数组的列数
    var colLen = arr[0].length;
    var rowLen = arr.length;
    //j开始的下标
    var jstart = 0;
    //j结束的下标
    var jend = 0;
    for (var i = 0; i < allLen; i++) {       
        var x = (i > (colLen - 1)) ? (i - colLen + 1) : 0;
        //控制循环次数和数组的y坐标
        jstart = (i > colLen - 1) ? colLen - 1 : i;
        jend = (colLen + i - allLen < 0) ? 0 : colLen + i - allLen;
        //打印每一行
        for (var j = jstart; j >= jend ; j--) {
            console.log(arr[x][j]);
            x++;
            allcount++;
        }
    }
}
print(arr);

算法

详解: https://blog.csdn.net/qq_36186690/article/details/81145085

4)??????????????????????????????/

算法

详解: https://blog.csdn.net/forever______/article/details/85108089

5)
????????????????????????????????????????????????/
详解: https://blog.csdn.net/qq_32657025/article/details/79599954




(二十四)
1) (二)(10)

2) (六)(4)

3)
var obj = {
    0: "a",
    1: "b",
    length: 2
}

1. Array.from(obj);

2. Array.prototype.slice.call(obj);
   [].slice.call(obj);

3. [...obj] // 用拓展运算符转化为字符串

4. 
function changeArray(obj) {
    var len = obj.length;
    var arr = [];
    for(var i = 0; i < len; i++) {
        arr.push(obj[i]);
    }
    return arr;
}

slice与splice的区别是:
    slice是不改变原数组
    splice改变原数组

详解: https://juejin.im/post/5c7a405851882578860c38ed
详解: https://blog.csdn.net/xiaoqingpang/article/details/79108005

4) (七)(4)

5)
深度遍历
function deepPrint(arr) {
    var newArr = [];
    function mainFun(arr) {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            if (typeof arr[i] === 'object') {
                mainFun(arr[i]);
            } else {
                newArr.push(arr[i]);
            }
        }

    }
    mainFun(arr);
    return newArr;
}

广度遍历
思路: 使用队列的方式 先进先出
function breadPrint(arr) {
    var res = [];
    while(arr.length) {
        if(typeof arr[0] === 'object') {
            var temp = arr.shift();
            [].push.apply(arr, temp);
        }else {
            res.push(arr[0]);
            arr.shift();
        }	
    }
    return res;
}




(二十五)
1)
1. for循环
      使用临时变量 将长度缓存起来 避免重复获取数组长度 当数组较大时优化效果才会明显
2. forEach循环 
      变量数组中的每一项 没有返回值 对原数组没有影响 不支持IE
3. map循环
      有返回值，可以return出来
      map的回调函数中支持return返回值；return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）
4. for of循环
      可以正确响应break、continue和return语句
5. filter遍历
      不会改变原始数组,返回新数组
6. every遍历
      every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true,则返回true。
7. some遍历
    some()是对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true。

详解: https://www.cnblogs.com/woshidouzia/p/9304603.html

2)
arr
类数组 nodeList
argument
Set
Map

3) 
Set
简介:
    Set是ES6提供给我们的构造函数 能够造出一种新的存储数据的结构 
特点:
    只有属性值 成员值唯一(不重复)
用途: 
    可以转化为数组 其本身具备去重 交集 并集 差集的作用等

并集
let oS = new Set([...arr1, ...arr2]);
交集
let newArr = [...oS1].filter(ele => {
    return oS2.has(ele);
});
差集
let oS1 = new Set(arr1);
let oS2 = new Set(arr2);
let newArr1 = [...oS1].filter(ele => !oS2.has(ele));
let newArr2 = [...oS2].filter(ele => !oS1.has(ele));
console.log([...newArr1, ...newArr2]); 

Map 
简洁: 
    Map是ES6提供给我们的构造函数 能够造出一种新的存储数据的结构 本质上是键值对的集合
特点:
    key对应value key和value唯一 任何值都可以当属性
用途: 
    可以让对象当属性 去重等
原理实现:
        链接列表 hash算法 桶 

源码实现
function myMap() {
    this.bucketLength = 8;
    this.init();
}        
myMap.prototype.init = function() {
    // 初始化桶 桶 8
    this.bucket = new Array(this.bucketLength);
    for(var i = 0; i < this.bucket.length; i++) {
        this.bucket[i] = {
            type: 'bucket_' + i,
            next: null
        }
    }
}
// 1. [0, 8)
// 2. 
myMap.prototype.makeHash = function(key) {
    let hash = 0;
    // string number boolean null undefined NaN {} [] function(){}
    if(typeof key !== 'string') { // 保证不同的类型不同的hash   这种方式存的值过多 增加桶的长度
        if(typeof key === 'number') {
            // number   typeof NaN === number 
            hash = Object.is(key, NaN) ? 0 : key;
        }else if(typeof key === 'object') {
            // null {} []
            hash = 1;
        }else if(typeof key === 'boolean') {
            // true false boolean
            hash = Number(key);
        }else {
            // undefiend fucntion() {}
            hash = 2;
        }
    }else {
        // string
        // 'a' 'ab' 'anjkwbkjdwejk'
        // 长度大于等于3了 前三个字符 ascii 累加
        for(let i = 0; i < 3; i++) {
            hash += key[i] ? key[i].charCodeAt(0) : 0;
        }
    }
    return hash % 8 ;
}
myMap.prototype.set = function(key, value) {
    let hash = this.makeHash(key);
    let oTempBucket = this.bucket[hash];
    while(oTempBucket.next) {
        if(oTempBucket.next.key == key) {
            oTempBucket.next.value = value;
            return;
        }else {
            oTempBucket = oTempBucket.next;
        }
    };
    oTempBucket.next = {
        key: key,
        value: value,
        next: null
    };
}
myMap.prototype.get = function(key) {
    let hash = this.makeHash(key);
    let oTempBucket = this.bucket[hash];
    while(oTempBucket) {
        if(oTempBucket.key === key) {
            return oTempBucket.value;
        }else {
            oTempBucket = oTempBucket.next;
        }
    }
    return undefined;
}
myMap.prototype.delete = function() {
    let hash = this.makeHash(key);
    let oTempBucket = this.bucket[hash];
    while(oTempBucket.next) {
        if(oTempBucket.next.key === key) {
            oTempBucket.next = oTempBucket.next.next;
            return true;
        }else {
            oTempBucket = oTempBucket.next;
        }
    }
    return false;
}
myMap.prototype.has = function() {
    let hash = this.makeHash(key);
    let oTempBucket = this.bucket[hash];
    while(oTempBucket) {
        if(oTempBucket.next && oTempBucket.next.key == key) {
            return true;
        }else {
            oTempBucket = oTempBucket.next;
        }
    }
    return false;
}
myMap.prototype.clear = function() {
    this.init();
}
let oMp = new myMap();
let obj1 = {
    name: '++++++++++='
}
oMp.set('name1', 'hehe');
oMp.set('name2', 'haha');
oMp.set(obj1, '+++++');
oMp.set(obj1, '-----');
oMp.set({}, '---');
oMp.set(function() {}, true);

4) 
WeakMap和Map的区别?
1. WeakMap只接受对象为键名(null除外) 不接受其他类型的值作为键名
2. WeakMap的键名所指向的对象 不计入垃圾回收机制
3. WeakMap最大的好处是避免n内存泄露 一个仅被WeakMap作为key而引用的对象 会被垃圾回收器回收掉
4. WeakMap拥有和Map类似的set get has delete方法 但是没有任何与迭代有关的属性和方法

详解: https://juejin.im/post/5ab0da85f265da23866fb9b7#heading-24


WeakMap特点?
1. WeakMap只接受对象为键名
2. WeakMap的键名所引用的对象是弱引用

使用场景?
它的键所对应的对象 可能会在将来消失 WeakMap结构有助于防止内存泄露


JavaScript垃圾回收机制?(GC: Garbage Collection)
JavaScript垃圾回收是一种内存管理技术 在这种技术中 不再被引用的对象被自动删除 而与其相关资源也会被一同回收 

Map和Set对象的引用都是强类型化的 并不会允许垃圾回收 这样一来 如果Map和Set中引用了不再需要的大型对象 如已经从DOM树中删除的DOM元素 那么其回收代价是昂贵的
为了解决这个问题 ES6还引入了WeakMap和WeakSet 这个集合之所以是"弱的" 是因为他们允许从内存中删除不再需要的被这些集合所引用的对象

详解: https://www.cnblogs.com/knyel/p/7852127.html  

垃圾回收原理浅析?
现在各个浏览器通常采用的垃圾回收有两种方法: 标记清除 引用计数

减少JavaScript中的垃圾回收?
。。。。。。。。。。。。。。。

详解: https://www.cnblogs.com/zhwl/p/4664604.html

5)
下拉刷新-----------
实现下拉刷新主要分为三步
    1. 监听原生touchstart事件 记录其初始位置的值 e.touches[0].pageY
    2. 监听原生touchmove事件 记录并就是当前滑动值与初始值的差值 大于0表示向下拉动 并借助CSS3的translateY属性使元素跟随手势向下滑动对应的差值 同时也应设置一个允许滑动的最大值
    3. 监听原生touchend事件 若此时元素滑动达到最大值 则触发callback 同时将translateY出设为0 元素回到初始位置

从下拉到松手的过程中 经历了三个状态 
    1. 当前手势滑动位置与初始位置差值大于0时 提示正在进行下拉刷新操作
    2. 下拉到一定值时 显示松手释放后的提示操作 
    3. 下拉到达设定最大值松手时 执行回调 提示正在进行更新操作

上拉加载------------
    上拉加载更多数据是在页面滚动时触发的动作 一般是页面
滚到底部触发 也可以选择滚动到一定位置的时候触发 

以页面滚动到底部为例 实现原理是分别获得当前滚动条的scrollTop值 当前可视范围的高度值clientHeight以及文档的总高度scrollHeight 当scrollTop和clientHeight的值之和大于大于scrollHeight时 触发callback

页面绑定onscroll事件时加入了jie节流函数 其作用是忽略滚动条300毫秒内的连续多次触发

小结: 上拉刷新的实现主要依靠的是touch事件的三个阶段 以及借助CSS3动画的效果 下拉加载主要依靠页面的onscroll事件 需要注意的是页面滚动时可能要考虑函数节流

详解: https://www.cnblogs.com/zuobaiquan01/p/8874305.html#autoid-2-1-0

6)
事件 --- 交互体验的核心功能

如何绑定事件/注册事件
1. ele.onxxx = function(event) {}
   兼容性很好 但是一个元素只能绑定事件处理程序
   基本等同于写在HTML行间上
   程序this转向的是dom元素本身
2. obj.addEventListener(type, fn, false); 
// 指定事件名, 指定要事件触发时执行的函数, 布尔值 指定事件是否在捕获或冒泡阶段执行(true:事件句柄在捕获阶段执行 false: false- 默认 事件句柄在冒泡阶段执行)

   IE9以下不兼容 可以为一个事件绑定多个处理程序
   程序this指向的是dom元素本身
3. obj.attachEvent('on' + type, fn);
   IE独有 一个事件同样可以绑定多个事件处理程序
   程序this指向window

解除事件处理程序/注销事件
ele.onclick = false/''/null;
ele.removeEventListener(type, fn, false);
ele.detachEvent('on' + type, fn);
注: 若绑定匿名函数 则无法解除

function addEvent(elem, type, handle) {
    if(elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    }else if(elem.attachEvent) {
        elem.attachEvent('on' + type, function() {
            handle.call(elem);
        })
    }else {
        elem['on' + type] = handle;
    }
}

7) (十四)(2)

8) (一)(2)

9)
弹窗又称为对话框 分为模态弹窗和非模态弹窗 两者的区别在于需不需要用户对其进行回应

模态弹窗会打断用户的正常操作 要求用户必须对其进行回应 否则不能继续其他的操作
非模态弹窗则不会影响用户的操作 用户可以不对其进行回应 非模态弹窗通常都有时间限制 出现一段时间后就会自动消失(只告诉内容)

Dialog 对话框
使用场景: 用于信息的提示以及对操作的二级确认
Actionbar 功能框(与对话框一样属于模态弹窗)
使用场景: 展示多个功能选择按钮 展示形式有纯文字丶图标加文字
Toast 提示框(非模态弹窗)
使用场景: 提示消息 内容更新 操作完成状态
提示对话框(非模态弹窗)
特点: 同时拥有提示框和对话框的特点 不会打断用户正常的操作流程 它除了可以告诉用户信息内容 还可以于用户进行对话交互 用户可以点击功能按钮进行回应 比如我知道了

详解: https://www.jianshu.com/p/645424c9840d?utm_campaign=haruki&utm_content=note&utm_medium=reader_share&utm_source=qq

1. alert("呵呵");
作用: 提示功能
2. comfirm('确定');
作用: 判断是否进行某一个操作 
3. prompt("请输入");
作用: 用于输入文本框




(二十六)
1)
Number String Boolean Object null undefined 
Symbol(特点: 唯一 可作为对象的属性 有静态属性Symbol.iterator)

基本类型: Number String Boolean undefined null 
引用类型: Object 

基本类型的特点
1. 基本类型的值是不可变的
2. 基本类型的比较是值的比较
3. 基本类型的变量是存放在栈区的(栈区指内存里的栈内存)

引用类型的特点
1. 引用类型的值是可变的
2. 引用类型的值是同时保存在栈内存和堆内存中的对象
3. 引用类型的比较是引用的比较

详解: https://www.cnblogs.com/focusxxxxy/p/6390536.html

2) (一)(2)

3)
1. 对节点的增删改查
   查
       查看元素节点
           document代表整个文档
           document.getElementById() // 元素id在ie8以下的浏览器 不区分id大小写 而且也返回匹配name属性的元素
           document.getElementsByTagName(); // 标签名
           document.getElementByName(); // IE不支持需注意 只要部分标签name可失效(表单 表单元素 img iframe)
           document.getElementByClassName(); // 类名 -> ie8和ie8以下的ie版本中没有 可以多个class一起
           querySelector(); // css选择器 在ie7和ie7以下的版本中没有 
           querySelector(); // css选择器 在ie7和ie7以下的版本中没有
       遍历节点树
           parentNode -> 父节点(最顶端的parentNode为#document)
           childNodes -> 子节点们
           firstChild -> 第一个子节点
           lastChild -> 最后一个子节点
           nextSibling -> 后一个兄弟节点
           previousSibling -> 前一个兄弟节点
      基于元素节点数的遍历
           parentElement -> 返回当前元素的父元素节点(IE不兼容)
           children -> 只返回当前元素的子节点
           node.childElementCount === node.children.length当前元素节点的子元素节点个数(IE不兼容)
           firstElementChild -> 返回第一个元素节点(IE不兼容)
           lastElementChild -> 返回的是最后一个元素节点(IE不兼容)
           nextElementSibling / presviousElementSibling -> 返回后一个 / 前一个兄弟元素节点(IE不兼容)
      节点的类型 
          元素节点 -- 1
          属性节点 -- 2
          文本节点 -- 3
          注释节点 -- 8
          document -- 9
          DocumentFragment -- 11
       获取节点类型 nodeType
       节点的四个属性
           nodeName 
              元素的标签名 以大写形式表示 只读
           nodeValue
              Text节点或Comment节点的文本内容 可读写          
           nodeType
              该节点的类型 只读
           attributes
              Element节点的属性集合
        节点的一个方法 Node.hasChildNodes();            

库: 
  1. jQuery
  2. zBase

4)？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
1. cookie
什么是cookie?---
Cookie是由服务端生成的 发送给User-Agent(一般是浏览器) (服务器告诉浏览器设置一下cookie) 浏览器会将cookie以key/value保存到某个目录下的文本文件内 下次请求同一网站时就发送该cookie给服务器(前提是浏览器设置为启动cookie)
cookie就是一个小型文件(浏览器对cookie的内存大小是有限制的 --- 用来设置一些信息)
为什么会有cookie?---
Web应用程序是使用HTTP协议传输数据的
HTTP协议是无状态的协议 一旦数据交换完毕 客户端和服务端的连接就会关闭 再次交换数据需要建立新的连接 这就意味着服务器无法从连接上跟踪会话
cookie的特点?---
cookie有保质期
满足同源策略 (不同域的话可以在服务端设置document.domain或path来实现共享)
cookie内存大小受限制(cookie有个数和大小的限制 大小一般是4K)
注意?---
cookie在本地 可以被更改的文件 敏感数据不要放在cookiel里

var manageCookie = {
    setCookie: function(name, value, time) {
        document.cookie = name + '=' + value + ';max-age' + time;
        return this;
    },
    removeCookie: function(name) {
        return this.setCookie(name, '', -1);
    },
    getCookie: function(name, callback) {
        var allCookieArr = document.cookie.split('; ');
        for(var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if(itemCookieArr[0] === name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}

2. http缓存
http缓存是基于HTTP协议的浏览器文件级缓存机制 即针对文件的重复请求情况下 浏览器可以根据协议头判断从服务器端请求文件还是从本地读取文件 chrome控制台下的Frames即展示的是浏览器的http文件级缓存 以下是浏览器缓存的这个机制流程 主要针对重复的http请求 在有缓存的情况下判断过程主要分为3步 
判断expires 如果未过期 直接读取http缓存文件 不发http请求 否则进入下一步 
判断是否含有etag 有则带上if-none-match发送请求 未修改返回304 返回200 否则进入下一步 
判断是否含有last-modified 有则带上if-modifined-since发送请求 无效返回200 有效返回304 否则直接向服务器请求

如果通过etag和last-modifined判断 即使返回304有至少有一次http请求 只不过返回的是304的返回内容 而不是文件内容 所以合理设置实现expires参数可以减少较多的浏览器请求

3. localstorage
localStorage是HTML5的一种新的本地缓存方案 目前用的比较多 一般用来存储Ajax返回的数据 加快下次页面打开时的渲染速度

localStorage.setItem(key, value); // 设置记录
localStorage.getItem(key); // 获得记录
localStorage.removeItem(key); // 删除该域名下单条记录
localStorage.clear(); // 删除该域名下所有记录

注意: localStorage大小有限制 不适合存放过多的数据 如果数据存放超过最大限制会报错 并移除最先保存的数据



4. sesstionStorage
sesssionStorage和localStorage类似 但是浏览器关闭则会全部关闭 api和localStorage相同

详解: https://my.oschina.net/zhangstephen/blog/591575

5)????????????????????

6)
作用域定义: 变量(变量作用于又称上下文)和函数生效(能被访问)的区域

[[scope]]: 每个JavaScript函数都是一个对象 对象中有些属性我们可以访问 但有些不可以 这些属性仅供JavaScript引擎存取 [[scope]]就是其中一个 [[scope]]指的就是我们所说的作用域 其中存储了运行期上下文的集合
作用域链: [[scope]]中所存储的执行期上下文对象的集合 这个集合呈链式链接 我们把这种链式链接叫做作用域链

运行期上下文: 当函数执行时 会创建一个称为执行期上下文的内部对象 一个执行期上下文定义了一个函数执行时的环境 函数每次执行时对应的执行上下文都是独一无二的 所以多次调用一个函数会导致创建多个执行上下文 当函数执行完毕 执行上下文被销毁 

查找变量: 从作用域链的顶端依次向下查找

7) (二十六)(6)
执行上下文: 每次代码执行和函数调用都会产生一个执行环境 称为执行上下文
执行上下文栈: 多个执行上下文会形成执行上下文栈

详解: https://www.cnblogs.com/wangfupeng1988/p/3989357.html

8) (二)(8)

9)
JS事件执行机制(JS事件循环机制 / event loop / 事件轮询机制)?
1. 同步任务和异步任务分别进入不同的执行"场所" 同步任务的进入主线程 异步的进入Event Table并注册函数 
2. 当指定的事情完成时 Event Table会将这个函数移入Event Queue
3. 主线程内的任务执行完毕为空 会去Event Queue读取对应的函数 进入主线程
4. 上述过程会不断重复 也就是常说的Event Loop(事件循环)

macro-task(宏任务): 包括整体代码script setTimeout setInetrval
micro-task(微任务): Promise process.nextTick promise.then

JS事件循环的顺序/任务执行顺序?
当前执行栈执行完毕时会立即先处理所有微任务队列中的事件 然后再去宏任务队列取出一个事件 同一次事件循环中 微任务永远在宏任务之前执行

详解: https://juejin.im/post/59e85eebf265da430d571f89#heading-7

10) (一)(6)

脚本位置
延迟加载

11) 
1. 当脚本要调用一个函数时 解析器把该函数添加到栈中并且执行这个函数 并形成一个栈帧
2. 任何被这个函数调用的函数会进一步添加到调用栈中 形成另一个栈帧 并且运行到他们被上个程序调用的位置
3. 当执行完这个函数后 如果它没有调用其他函数 则它会从调用栈推出 然后调用栈继续运行其他部门
4. 异步函数的回调函数一般都会被添加到运行队列里面 如setTimeout会在响应的时候后把回调函数放到队列中 队列里的函数需要等栈为空时才会被推入栈中执行 如果队列有其他函数 需要等队列前面的函数被堆入调用栈中才会运行

栈: 
特点: 先进后出
调用栈: 函数或者子例程像堆积木一样存放 以实现层层调用 
自动分配内存空间 会自动释放 存放基本类型 简单的数据段 占据固定大小的空间
基本类型: String Number Boolean Null undefined

堆
定义: 一种存放复杂或者引用类型的内存区域
特点: 
    动态分配的内存 大小不定 不会主动释放 存放引用类型 包括引用类型的变量 实际上保存的不是变量本身 而是指向改对象的指针

栈与堆的区别
栈: 所有在方法定义的变量都是存放在栈中的 随着方法的执行结束 这个方法的内存栈也自然销毁 存储速度块
堆: 堆内存中的对象不会随着方法的结束而销毁 即便方法结束 这个对象可能被另一个引用变量所引用 创建对象是为了反复利用 这个对象将被保存到运行时数据区域

详解: https://segmentfault.com/a/1190000010360316
详解: https://blog.csdn.net/github_35549695/article/details/82355428

12) 
js时间线
1.创建Document对象,开始解析web页面。解析HTML元素和
    他们的文本内容后添加Element对象和Text节点到文档中。
    这个阶段的document.readyState = 'loading';
2.遇到link外部的css,创建线程加载,并继续解析文档  
3.遇到script外部的js,并且没有设置async,defere,浏览
    器加载,并阻塞,等待js加载完成并执行该脚本,然后继续
    解析文档
4.遇到script外部的js,并且设置async,defere,浏览器创建线
    程加载,并继续解析文档。对于async属性的脚本,脚本加载完
    成后立即执行。(异步禁止使用document.write())
5.遇到img等,先正常解析dom结构,然后浏览器异步加载
    src,并继续解析文档。
6.当文档解析完成后,document.readyState = 'interactive'   // domTree刚建立
7.文档解析完成后,所以设置有defere的脚本会按照顺序执行
    (注意于async的不同,但同样禁止使用document.write())
8.document对象触发DOMContentLoaded事件,这也标志着程序
    执行从同步脚本执行阶段,转化为事件驱动阶段         // 可以监听用户的输入事件/监听事件
9.当所以的async的脚本加载完成并执行后,img等加载完成后
    document.readyState = 'complete',window对象触发Load事件
10.从此,以异步响应方式处理用户输入,网络事件等    
分三步
1.创建Document对象
2.解析文档
3.文档加载完并执行完

详解: https://blog.csdn.net/riddle1981/article/details/78681191

13)
加载JS会阻塞浏览器渲染 加载CSS不会阻塞浏览器渲染

下载JS和CSS不会阻塞浏览器渲染
加载有个下载和解析的过程 而下载只是下载这个文件 不会读取里面的内容 


详解: https://zhidao.baidu.com/question/541047650.html


js会阻塞dom的解析 但js不会阻塞dom的渲染 因为此时js代码已经全部执行完成了

1. 整个页面只引入一个外部css文件
   css是不阻塞dom解析的 但是css会阻塞dom渲染的
2. css页面后面还有外部js文件
   css是阻塞了dom的解析的 这是主要是因为css后面还有js 考虑到js可能会改变css属性 所有必须等到它前面的css执行完毕

详解: https://blog.csdn.net/Lonely_Devil/article/details/81153443
详解：https://juejin.im/post/5b88ddca6fb9a019c7717096#heading-5

14) (十九)(5)

15) 
浏览器渲染页面前需要先构建DOM和CSSOM树 我们需要确保尽快将HTML和CSS都提供给浏览器

详解: https://www.jianshu.com/p/61b3409bc3a4

16)??????????????????????????????

17)
为页面上的任何对象计算最后一组样式时 浏览器都会先从适用于该节点的最通用规则开始(例如 如果该节点是body元素的子项 则应用所有body样式) 然后通过应用更具体的规则(即规则"向下级联") 以递归方式优化计算的样式

详解: https://www.jianshu.com/p/61b3409bc3a4

18) (二十六)(13)

19)
1. 虚拟DOM不会进行排版和重绘操作
2. 虚拟DOM进行频繁操作 然后一次性比较修改真实DOM中需要改的部分 最后并在真实DOM中进行排版与重绘 减少过多DOM节点排版和重绘消耗
3. 真实DOM频繁排版和重绘的效率是相当低的
4. 虚拟DOM有效降低大面积(真实DOM节点)的重排和排版 因为最终与真实DOM比较差异 可以只渲染局部

使用虚拟DOM的损耗计算 
总损耗 = 虚拟DOM增删改 + (与Diff算法效率有关)真实DOM差异增删改 + (较少的节点)排版与重绘

直接使用真实DOM的损耗计算
总损耗 = 真实DOM完全增删改 + (可能较多的节点)排版与重绘

什么是虚拟DOM?
可以看作是一个使用JavaScript模拟了DOM结构的树形结构 这个树结构包含整个DOM结构

为什么使用虚拟DOM?
1.  之前使用原生js或者jQuery写页面的时候会发现操作DOM是一件非常麻烦的事情 往往是DOM标签和js逻辑同时写在js文件里 数据交互时不时还要写很多的input隐藏域 如果没有好的代码规范的话会显的代码非常冗余混乱 耦合性高并且难以维护
2. 另一个方面在浏览器一遍又一遍的渲染DOM是非常非常消耗性能的 常常会出现页面卡死的情况 所以尽量减少堆DOM的操作成为了优化前端性能的必要手段 vdom就是将DOM的对比放在了js层 通过对比不同之处来选择新渲染DOM节点 从而提高渲染效率

详解: https://segmentfault.com/q/1010000010303981/a-1020000010304010
详解: www.cnblogs.com/gaosong-shuhong/p/9253959.html

20)
1. 110秒
2. 应该很快就能加载 可能不需要时间 因为都缓存了 除非那个JS里面有大量的运算




(二十七)    
1) (二)(9)

2) (二十六)(9)

3)

function sum() {
    var _args = [].slice.call(arguments);
    function add() {
        [].push.apply(_args, [].slice.call(arguments));
        return arguments.callee;   
    }
    add.valueOf = function() {
        return _args.reduce(function(a, b) {
            return a + b;
        })
    }
    return add;
}  

[].push.apply(a, b)是什么意思?
apply的作用在这里有两个：
    将操作对象换成对象a
    将b作为push()函数的参数 这句话的意思就是：将b追加到a里面，如果a为数组，也可以写成a.push(b)或者Array.prototype.push.apply(a, b) 如果此时a的值为null, undefined, Function时，会报错，如果为number, string, boolean, 不会报错，但是也没有任何意义。如果为数组或者一般对象，则会将b追加到a中。a自身的长度也会发生变化。
详解: https://blog.csdn.net/qq_29055201/article/details/84972285


柯里化的定义?
在数学和计算机数学中 柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

柯里化的优点?   
1. 就是降低代码的重复 提高代码的适应性
2. 前端使用柯里化的用途主要就应该是简化代码结构 提高系统的维护性 一个方法 只有一个参数 强制了功能的单一性 很自然就做到了功能内聚 降低耦合

柯里化的缺点?
1. 创建大量嵌套作用域和闭包函数会带来花销 无论在内存还是速度上
2. 使用fn.apply()和fn.call()通常比直接调用fn(...)稍微慢
3. 存取arguments对象通常比存取命名参数要慢一些
4. 一些老版本的浏览器在arguments.length的实现上相当慢的

使用场景?
1. 减少重复传递不变的部分参数
function curry(fn) {
    var _args = [].slice.call(arguments, 1);
    return function() {
        var newArgs = _args.concat([].slice.call(arguments));
        return fn.apply(null, newArgs);
    }
}
function ajax(type, url, data) {
    console.log(type, url, data);
}
// 重复调用的时候参数冗余
ajax('POST', 'www.test.com', 'name=hehe');
ajax('POST', 'www.test2.com', 'name=hehe');
ajax('POST', 'www.test3.com', 'name=hehe');
// 利用柯里化减少重复
var ajaxCurry = curry(ajax);
var post = ajaxCurry('POST');
post('www.test.com', 'name=hehe');
post('www.test2.com', 'name=hehe');
post('www.test3.com', 'name=hehe');

详解: https://www.jianshu.com/p/2975c25e4d71
详解: https://segmentfault.com/a/1190000015281061?utm_source=tag-newest

4) (三)(2)




(二十八)
1) (二十六)(1) (一)(9)

2) (一)(10)

3) (十八)(6)

4) (三)(4) (三十一)(6)




(二十九)
1) (二)(8)
2) (一)(10)
3) (二)(9)
4) (七)(1)




(三十)
1) (二十六)(9)
2)
undefined 
20
10
20
20




(三十一)
1) (二)(1) (二)(3)
2) (二)(8)
3) (二十二)(2)
4) 
1. 函数方法
    value.toString();
   缺点: 不能把undefined和null转化成字符串 
2. 弱类型转化
    '' + value;
3. 强类型转化
    String(value);

详解: https://www.cnblogs.com/fozero/p/6959896.html

5)????????????????

6)
数组打平/数组扁平化

对象扁平化是指深度很深的对象经过扁平化变成一层 也就是深度为1的对象
数组扁平化是降维过程 是多维数组经过扁平化变成一维的数组

扁平化作用?
    顾名思义就是减少复杂性装饰 使其事务更简洁丶简单丶突出主题

1. 
function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
}
function flatten(arr) {
    var arr = arr || [],
        resArr = [],
        len = arr.length;
    for(var i = 0; i < len; i++) {
        if(isArray(arr[i])) {
            resArr = resArr.concat(flatten(arr[i]));
        }else {
            resArr.push(arr[i]);
        }
    }    
    return resArr;
}
缺点: 把数组暴漏在外面

2. 
Array.prototype.flatten = function() {
    var resArr = [];
    this.forEach(function(item) {
        Object.prototype.toString.call(item) === '[object Array]' ? resArr = resArr.concat(item.flatten()) : resArr.push(item);
    })
    return resArr;
}

3. 
function flatten(arr) {
    var arr = arr || [];
    return arr.reduce(function(prev, next) {
        return Object.prototype.toString.call(next) === '[object Array]' ? prev.concat(flatten(next)) : prev.concat(next);
    }, [])
}

4. 
const flatten = arr.reduce((prev, next) => Object.prototype.call(next) === '[object Array]') ? prev.concat(flatten(next)) : prev.concat(next, []);

5.
[].flat();
缺点： 低版本的浏览器不支持 




(三十二)
1) (二)(8)

2) ??????????

3) 
1. 登录方式
2. 对应的提示信息是什么
3. 有可能是后端服务器挂了 也可能是账号密码错误 还有可能是token相关的问题 可以让后端抓包发过去的是啥 总之就是要判断网络传输问题 还是鉴权问题 还是其他问题

后台抓包 就是使用比如fiddler之类的抓取http信息进行调试
??????????????????????????????????//

4) (二)(8) 

5) (一)(10)

6) 
解题思路?
    小学生乘法公式一样计算 一位一位的乘 逢10进1 数组取反返回 是为了方便从左到右的遍历修改

let multiply = function(num1, num2) {
    if(num1 === '0' || num2 === '0') {
        return '0'
    }
    let arr1 = num1.split('').reverse();
    let arr2 = num2.split('').reverse();
    let len1 = arr1.length;
    let len2 = arr2.length;
    let arr = [];
    for(var i = 0; i < len1; i++) {
        for(var j = 0; j < len2; j++) {
            if(arr[i + j] == undefined) {
                arr[i + j] = arr1[i] * arr2[j]
            }else {
                arr[i + j] += arr1[i] * arr2[j];
            }
            if(arr[i + j] > 9) {
                if(arr[i + j + 1] == undefined) {
                    arr[i + j + 1] = Math.floor(arr[i + j] / 10);
                }else {
                    arr[i + j + 1] += Math.floor(arr[i + j] / 10);
                }
                arr[i + j] = arr[i + j] % 10;
            }
        }
    }
    return arr.reverse().join('');
};    

详解: https://blog.csdn.net/hanzhijun527/article/details/80474488
详解: https://www.cnblogs.com/wmx24/p/9064134.html

7) 
秒杀架构设计理念
1. 限流 点击提交按钮后按点击提交按钮后按钮置灰 显示为正在排队中 能处理结束后或若干秒后 才允许用户点击
2. 削峰: 对于秒杀系统瞬时会有大量用户涌入，所以在抢购一开始会有很高的瞬间峰值。高峰值流量是压垮系统很重要的原因，所以如何把瞬间的高流量变成一段时间平稳的流量也是设计秒杀系统很重要的思路。实现削峰的常用的方法有利用缓存和消息中间件等技术
异步处理：秒杀系统是一个高并发系统，采用异步处理模式可以极大地提高系统并发量，其实异步处理就是削峰的一种实现方式。
3. 内存缓存：秒杀系统最大的瓶颈一般都是数据库读写，由于数据库读写属于磁盘IO，性能很低，如果能够把部分数据或业务逻辑转移到内存缓存，效率会有极大地提升。
4. 可拓展：当然如果我们想支持更多用户，更大的并发，最好就将系统设计成弹性可拓展的，如果流量来了，拓展机器就好了。像淘宝、京东等双十一活动时会增加大量机器应对交易高峰。

前端方案-----
浏览器端(js)：
1. 页面静态化: 将活动页面上的所有可以静态的元素全部静态化，并尽量减少动态元素。通过CDN来抗峰值。 
2. 禁止重复提交：用户提交之后按钮置灰，禁止重复提交 
3. 用户限流：在某一时间段内只允许用户提交一次请求，比如可以采取IP限流
后端方案-----
服务端控制器层(网关层)
1. 限制uid（UserID）访问频率：我们上面拦截了浏览器访问的请求，但针对某些恶意攻击或其它插件，在服务端控制层需要针对同一个访问uid，限制访问频率。

服务层
上面只拦截了一部分访问请求，当秒杀的用户量很大时，即使每个用户只有一个请求，到服务层的请求数量还是很大。比如我们有100W用户同时抢100台手机，服务层并发请求压力至少为100W。
1. 采用消息队列缓存请求：既然服务层知道库存只有100台手机，那完全没有必要把100W个请求都传递到数据库啊，那么可以先把这些请求都写到消息队列缓存一下，数据库层订阅消息减库存，减库存成功的请求返回秒杀成功，失败的返回秒杀结束。
2. 利用缓存应对读请求：对类似于12306等购票业务，是典型的读多写少业务，大部分请求是查询请求，所以可以利用缓存分担数据库压力。
3. 利用缓存应对写请求：缓存也是可以应对写请求的，比如我们就可以把数据库中的库存数据转移到Redis缓存中，所有减库存操作都在Redis中进行，然后再通过后台进程把Redis中的用户秒杀请求同步到数据库中。
数据库层---
数据库层是最脆弱的一层，一般在应用设计时在上游就需要把请求拦截掉，数据库层只承担“能力范围内”的访问请求。所以，上面通过在服务层引入队列和缓存，让最底层的数据库高枕无忧。

高并发.........方面的知识
秒杀系统的场景

详解: https://www.cnblogs.com/liucldq/p/9638623.html




(三十三)
1) (十四)(2)
事件流: 描述的是从页面中接受事件的顺序 也可以理解为事件在页面中传播的顺序 
事件: 就是用户或浏览器自身执行的某种动作 诸如click(点击) load(加载) 
事件处理程序: 响应某个事件的函数就叫事件处理程序(或事件监听器)

两种处理事件流的不同的机制/两种事件模型: 事件冒泡和事件捕获

1. IE的事件流叫事件冒泡 即事件开始时由最具体的元素(文档中嵌套层次最深的节点)接受 然后逐级向上传播到较为不具体的节点(参数为false)

2. Netscape团队提出的另一种事件流叫做事件捕获 事件捕获的思想是不太具体的节点应该更早接受到事件 而最具体的节点应该最后接受到事件(参数为true)

3. DOM事件流 "DOM2级事件"规定事件流包括三个阶段: 事件捕获阶段 ==》 处于目标阶段 ==》 事件冒泡阶段 首先发生的是事件捕获阶段 为截取事件提供了机会 如果是实际的目标接受事件 最后一个阶段是冒泡阶段

事件流的应用场景
1. 事件代理 

详解: https://segmentfault.com/a/1190000003497939
详解: https://www.cnblogs.com/starof/p/4066381.html

2) (二)(10)

3)
Promise.all();

function say() {
    var value = 'hehe';
    return new Promise((resolve, reject) => {
        setTimeout(resolve(value), 1000);
    })
}
function say1() {
    var value = 'haha';
    return new Promise((resolve, reject) => {
        resolve(value);
    })
}
Promise.all([say(), say1()]).then(value => console.log(value)).then(() => console.log('完成'));

详解: https://chenhuichao.com/2016/12/25/es6/promise-all/

4) (五)(1)

5) (三)(2)

6) (三)(4)

7)
后面多一个?表示懒惰模式 必须跟在*或者+后面使用
.表示除\n之外的任意字符
*表示匹配0-无穷




(三十四)
1) (一)(3)

2) (二十二)(2)

3) (二十六)(9)

4) (二十六)(11)

5) (二)(2)




(三十五)
1) (一)(9)

2) (二)(8)

3) (三)(2)

4) (五)(1) (二)(10) (二)(9)

5)?????????????????????????

6)
插件
Yslow: 是雅虎开发的基于网页性能分析浏览器插件，
FireBug: 它可以对页面进行调试, 可以记录所有网页的访问耗时, 下载的资源等
Speed Tracer: 这个是web前端页的性能记录和分析工具, 同时还提供一个规则和建议的评测

详解: https://blog.csdn.net/liaozhongping/article/details/51029250  
详解: https://blog.csdn.net/lipc_/article/details/52853095

7)
chrome断点调试

详解: https://www.cnblogs.com/zhuzhenwei918/p/6132531.html

8) (一)(10)

9)
1. 结构样式行为相互分离的原则
2. 开发规范 
3. 技术选型
4. 构建工具
5. 开发效率
6. 风险

详解: https://yanhaijing.com/program/2016/04/14/how-to-reconstruct-a-large-historical-project/

10)
1. 命名规范
       变量
           小驼峰式命名法
       函数
           小驼峰式命名法
       常量 
           全部大写
       构造函数
           大驼峰式命名法    
       类
         公共属性和方法 跟变量和函数的命名一样
         私有属性和方法 前缀为_(下划线) 后面跟公共属性和方法一样的命名方式            
2. 注释规范
       单行注释
           // 
       多行注释
           /* */
           /**
           * 函数说明
           */
3. 框架开发
      命名空间
      
    详解: https://www.cnblogs.com/polk6/p/4660195.html#Menu1-NameStyle

11) (三)(4)

12)
hello

13) (二十二)(2)
// prop
// window 
// prop
// 报错

es5严格模式
"use strict"
不再兼容ES3的一些不规则语法 使用全新的ES5规范
两种用法
   全局严格模式
   局部函数严格模式
就是一行字符串 不会对不兼容严格模式的浏览器产生影响
不支持width argument.callee func.caller 变量赋值前必须声明 局部this必须被赋值(Person.call(null/undefined)赋值什么就是什么) 拒绝重复属性和参数   全局的this还是指向window




(三十六)
1) (二十六)(1)

2) (二)(1) (二)(3)

3) 
for in能遍历出原型链上的属性
Obj.prototype.father = 'haha';
function Obj() {
    this.name = 'hehe';
    this.age = 18;
}
var obj = new Obj();
for (prop in obj) {
    console.log(prop);
}

4) (二十六)(6)

5) (二)(8)

6)???????????????????????????????????

7) 
高阶函数是对其他函数进行操作的函数 可以将他们作为参数或返回他们 简单来说 高阶函数是一个函数 它接受函数作为参数或将函数作为输出返回

例如 Array.prototype.map Arrat.prototype.filter和Array.prototype.reduce就是语言中内置的一些高阶函数

高阶函数应用场景
    函数柯里化(currying)

详解: https://baijiahao.baidu.com/s?id=1616366107595017691&wfr=spider&for=pc




(三十七)
1)???????????????????????????????

2)?????????????????????????????????

3)
JavaScript的最初版本是这样区分的: null是一个表示"无"的对象 转化为数值时为0 undefined是一个表示"无"的原始值 转为数值为NaN
Number(undefined); // NaN
Number(null); // 0

目前的用法
null表示"没有对象" 即该处不应该有值 典型用法是:
1. 作为函数的参数 表示该函数的参数不是对象
2. 作为对象原型链的终点
undefiend表示"缺少值" 就是此处应该有一个值 但是还没有定义 典型用法是
1. 变量被声明了 但还没有赋值时 就等于undefined
2. 调用函数 应该提供的参数没有提供 该参数等于undefined
3. 对象没有赋值的属性 该属性的值为undefied
4. 函数没有返回值时 默认返回undefined

详解: http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html

4)
null >= 0    // true
null <= 0    // true
null == 0    // false

undefined >= 0  // false
undefined <= 0  // false
undefined == 0  // false

undefied == null  // true

5)
for of

6)
var arr = [1, 2, 3, 4];
for(let prop of arr) {
    console.log(prop);
}

7) (二)(10)

8) 
对象有属性__proto__ 指向该对象的构造函数的原型对象
方法(函数)除了有属性__proto__ 还有属性prototype prototype指向该方法的原型对象




(三十八)

1)
作用: 修改函数在执行时的this指向 它修改不是函数的本身 而是在执行的时候返回一个新的函数 新的函数在执行的时候执行的是这个函数的功能 但里面的this被里面的bind所修改了

总结: 
    1. 函数A调用bind方法时 需要传递的参数o, x, y, z....
    2. 返回新的函数B
    3. 函数B在执行的时候 具体的功能实际上还是使用的A 只不过this指向变成了o 不传是window
    4. 函数B在执行的时候 你传递参数 会拼接到x, y, z的后面 一并在内部传递给A执行
    5. 当你以new B()  构造函数依旧是A 而且obj这个参数不会起到任何操作

Function.prototype.newBind = function(target) {
    var self = this;
    var args = [].slice.call(arguments, 1);
    var temp = function() {};
    var f = function() {
        var _args = [].slice.call(arguments, 0);
        return self.apply(this instanceof temp ? this : (target || window), args.concat(_args));
    }
    temp.prototype = self.prototype;
    f.prototype = new temp();
    return f;
}

call/apply bind区别?
call/apply是你直接去使用 在当前函数执行的时候直接调用它 
bind是你返回某个函数 等待某个状态触发再执行

    1. 都是用来改变函数的this对象的指向的
    2. 第一个参数都是this要指向的对象
    3. 都可以利用后续参数传参
    4. bind是返回对应函数 便于稍后调用 apply、call是立即调用


2) (十八)(6) 

3) (二十六)(9)

4) 
同步方式处理文件 不带缓冲的I/O  将数据写入磁盘的过程是: 数据-》内核缓冲区-》磁盘
流处理文件 带缓冲的I/O 将数据写入磁盘的过程是: 数据-》缓流冲区-》内核缓冲区-》磁盘   (流操作函数对象不是文件符 而是一个缓冲区)

详解: https://blog.csdn.net/u011000290/article/details/48940371
详解: https://blog.csdn.net/ghevinn/article/details/8525818

5) (二)(9)

6) (二十六)(9)

7) (一)(9)

8) (五)(1)

9) (二)(10)

10)??????????????

11) 
0.30000000000000004

原因: JS精度不准确

解决方法: 将浮点数转化为整数计算 因为整数都是可以精度表示的
0.1 + 0.2  ==>  (0.1 * 10 + 0.2 * 10) / 10

12) (三)(2)

13) (十八)(6)

14) (二十六)(9)

15) (五)(1)

16) (二)(10)

17)
1. 把数字转化为字符串 这样就不会出现精度损失的情况出现
2. big-integer插件
3. bignumber插件

详解: https://blog.csdn.net/qq_26769677/article/details/83273964

18)
var arr = [1, 2, 3];
var arr2 = [2, 3, 4];
var newArr = [];
for(var i = 0; i < arr.length; i++) {
    for(var j = 0; j < arr2.length; j++) {
        if(arr[i] === arr2[j]) {
            newArr.push(arr2[j]);
        }
    }
}
// 时间复杂度
//     O(n2)
// 空间复杂度
//     O(N2)

var oS1 = new Set(arr);
var oS2 = new Set(arr2);
let newArr = [...oS1].filter(ele => {
    return oS2.has(ele);
});

详解: https://blog.csdn.net/jsjwk/article/details/84315770

19)
导致栈堆溢出

详解: https://blog.csdn.net/u010590166/article/details/22294291




(三十九)
1) (五)(1)
2) (五)(2)
3)
// 反向引用
\1表示引用第一个子表达式的内容
子表达式()会记录里面匹配的内容  记录之后我们可以用一个东西反向引用
var str = 'aabb';
var reg = /(\w)\1(\w)\2/g;
console.log(reg.test(str));

// 千分位
var str = '100000000000';
var reg = /\B(?=((\w){3})+$)/g;
console.log(str.replace(reg, '.'));

n+     匹配任何包含至少一个n的字符串
n$     匹配任何结尾为n的字符串
?=n    匹配任何其后紧接指定字符串n的字符串
\B     匹配非单词边界

4) (二)(9)

5) (三十二)(8)

详解: https://blog.csdn.net/qq_37268201/article/details/70918506

6) (二)(8)

7) (五)(1)
使用let/const就不会发生变量提升的

8) (五)(1) (二)(10) (二)(9)

解构赋值
var obj = {name: 'hehe', age: 18};
let {name, age} = obj;
console.log(name, age);

let a = 1;
let b = 2;
[a, b] = [b, a]; 
它的原理是什么  0x000  1 a    0x001  2 b   a和b怎么进行交换 本来是原始值的 原始值的话 无论是引用值还是原始值 只要你对它重新赋值
它都重新开辟一块内存空间 0x002  a b     0x002  b a     位置对应 解构赋值 进行这样的交换


解构赋值目的在于把等号左右长的相似的来个东西内部的值取出来

对象和数组都可以参与解构

作用: 简化书写长度 提高开发效率

9) (三十七)(8)
函数也是特殊的对象

10)

function AJAX(json) {
    var url = json.url,
        method = json.method,
        flag = json.flag,
        data = json.data,
        callBack = json.callBack,
        xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Mircosoft.XMLHTTP');
    }            
    if(method == 'get') {
                url += '?' + data + new Date().getTime(); 
        xhr.open('get', url, flag);
    }else {
        xhr.open('post', url, flag);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 数据已经可用了
            callBack(xhr.responseText);
        }
    }
    if(method == 'get') {
        xhr.send();
    }else {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }    
}
function callBack(res) {
    console.log(res);
}
AJAX({
    url: 'http://localhost/test/demo.json',
    method: 'get',
    flag: true, // true异步 false同步
    callBack: callBack
})

详解: https://www.cnblogs.com/zhangyongl/p/6399955.html




(四十)
1) (十四)(2)




(四十一)
1)
function DOM2JSON(node) {
    var obj = {};
    var child = node.children,
        len = child.length;
    obj = {
        'tag': node.nodeName,
        'children': [],
    }	
    if(!child) {
        return;
    }	
    
    for(var i = 0; i < len; i++) {
        obj.children.push(DOM2JSON(child[i]));
    }
    return obj;
}
var oDiv = document.getElementsByTagName('div')[0];
console.log( DOM2JSON(oDiv) );

2)
function repeat(func, times, wait) { 
    return function(name) {
        for(var i = 0; i < times; i++) {
            setTimeout(function() {
                alert(name);
            }, wait * i);
        }
    }		
}
const repeatFunc = repeat(alert, 4, 3000);
repeatFunc("hellworld");
repeatFunc("hellworld"); // 会alert4次 helloworld，每次间隔3秒

3)
详解: https://blog.csdn.net/nb10010/article/details/82843342




(四十二)
1) (二)(3)

2) (十四)(2)

3) (五)(1) 

4) (八)(2)




(四十三)
1) (一)(6)

2)
从堆栈的角度看待js函数?
基本变量的值一般都是存在栈内存中 而对象类型的变量的值存储在堆内存中 栈内存存储对应空间地址 基本的数据类型: Number 、Boolean、Undefined、String、Null。

栈是一种先进后出的数据结构

详解: https://www.jianshu.com/p/26c81fde22fb

3)
队列 先进先出
Queue.prototype.enqueue = function(node) {
    this.arr.push(node);
}
Queue.prototype.dequeue = function(node) {
    this.arr.shift(node);
}
function Queue() {
    this.arr = [];
}

详解: https://blog.csdn.net/maomaolaoshi/article/details/74602925

// 栈 先进后出
Stack.prototype.inStack = function() {
    this.arr.push();
}
Stack.prototype.outStack = function() {
    this.arr.pop();
}
function Stack () {
    var arr = [];
}

详解https://blog.csdn.net/qq_34305040/article/details/80256486

4)
1. 查看元素节点
document代表整个文档
document.getElementById() // 元素id 在Ie8以下的浏览器 不区分id大小写 而且也返回匹配name属性的元素
document.getElementsByTagName() // 标签名
document.getElementsByName(); // IE不支持需注意 只有部分标签name可生效（表单 表单元素 img iframe）
document.getElementsByClassName() // 类名 -> ie8和ie8以下的ie版本中没有，可以多个class一起
document.querySelector() // css选择器   在ie7和ie7以下的版本中没有
document.querySelectorAll() // css选择器 在ie7和ie7以下的版本中没有
2. 增
document.createElement();
document.createTextNode();
document.createComment();
document.createDocumentFragment();
parentNode.appendChild();
parentNode.insertBefore(a, b);
3. 删
parent.removeChild();
4. 改
parent.replaceChild(new, old);

5) (十四)(2)

6)
取消冒泡
W3C标准 event.stopPropagation(); 但不支持ie9以下版本
IE独有 event.cancelBubble = true;
封装取消冒泡的函数 stopBubble(event);

function stopBubble(event) {
    if(event.stopPropagation) {
        event.stopPropagation();
    }else {
        event.cancelBubble = true;
    }
}

阻止默认事件
默认 -- 表单提交 a标签跳转 右键菜单等
1. return false; 以对象属性的方式注册的事件才生效
2. event.preventDefault; W3C标注 IE9以下不兼容
3. event.returnValue = false; 兼容IE
封装阻止默认的函数 cancelHander(event)

function cancelHander(event) {
    if(event.preventDefault) {
        event.preventDefault();
    }else {
        event.returnValue = false;
    }
}

7) (二)(3)

构造函数内部原理
1. 在函数最前面隐式的加上this = {}
2. 执行this.xxx = xxx;
3. 隐式的返回this

8)
对象的创建方式
1. 字面量
2. 构造函数
       系统自带的 new Object();/Array();/Number();/Boolean();/Date();
       自定义的
3. Object.create(原型)方法

var obj = Object.create(Object.prototype);

9) (三)(4)

10) (一)(9)

11)
1. Object.is(); (ES6)
判断两个值是否相等
特例
   NaN === NaN; // false;
   Object.is(NaN, NaN); // true
   0 === +0; // true
   Object.is(0, +0); // false
   Object.is(NaN, 0/0); // true
2. Object.assign(target, source1, source2, ....);
该方法主要用于对象的合并 将源对象source的所有可枚举属性合并到目标对象target上 此方法只拷贝自身上的属性 不拷贝继承的属性
Object.assign()方法实行的是浅拷贝 而不是深拷贝 也就是说 如果源对象某个属性的值是对象 那么拷贝到的是这个对象的引用 同名属性会替换
Object.assign()只能进行值的复制 如果要复制的值是一个取值函数 那么将求值后再复制
Object.assign()可以用来处理数组 但是会把数组视为对象
3. Object.create(prototype, [propertiesObject])
使用指定的原型对象及其属性去创建一个新的对象
var parent = {
    x : 1,
    y : 1
}
var child = Object.create(parent,{
    z : {           
        value: "newAdd"                 // z会成为创建对象的属性
        writable:true, // 是否可以被修改 obj.name='hh' 
        enumerable: true, // 可枚举 for in循环
        configurable:true, // 可配置 delete child.z 
    }
});
console.log(child);
4. Object.defineProperty(obj, prop, descriptor)
在一个对象上定义一个新属性  或者修改一个对象的现有属性 并返回 这个对象
注意: value/writeable不能和get/set设置在一起    
var obj = {};
Object.defineProperty(obj, 'name', {
    value: 'hehe',
    writable: true, // 是否可以被修改 obj.name='hh' 	
    configurable: false, // 是否配置 delete
    enumerable: false // 是否枚举 for in 
})

var obj = {};
6.var tempValue = '';
Object.defineProperty(obj, 'name', {
    // value: 'hehe',
    // writable: true, // 是否可以被修改 obj.name='hh' 	
    configurable: false, // 是否配置 delete
    enumerable: false, // 是否枚举 for in

    get: function() {
        return tempValue;
    },
    set: function(newValue) {
        tempValue = newValue;
    } 
})
5. Object.keys(obj);
返回一个由一个给定对象的自身可枚举属性组成的数组
6. Object.values(obj);
方法返回一个给定对象自己的所有可枚举属性值的数组
Object.values会过滤属性名为 Symbol 值的属性。
Object.values({ [Symbol()]: 123, foo: 'abc' });
7. Object.entries();
返回一个给定对象自身可枚举属性的键值对数组
8. hasOwnProperty();
判断对象自身属性中是否具有指定的属性
...
详解: https://www.cnblogs.com/mopagunda/p/8328084.html




(四十四)
1)
Window: 浏览器窗口
History: 包含用户在浏览器窗口中访问的URL
Navigator: 包含有关浏览器的信息
Screen: 包含有关客户端显示屏幕的信息

2) (一)(9)

3) 
结果返回六种数据类型 number string boolean object function undefined

4) (二十六)(9)

5) (五)(1)

6) (二)(10)

7) (一)(11)
false




(四十五)
1)
try{} catch(e) finally{}
    缺点: 捕获不到异步的错误

Error.name的六种值对应的信息
    EvalError: eval()的使用与定义不一致
    RangeError: 数值越界
    ReferenceError: 非法或不能识别的引用数值
    SyntaxError: 发生语法解析错误
    TypeError: 操作数类型错误
    URLError: URL处理函数使用不当

2)
进程主要由程序 数据 PCB三部分组成的 其中PCB是进程存在的唯一标识 而数据部分也可以为其他进程共享

详解: https://www.nowcoder.com/questionTerminal/26f76b7750b14861a9e501212611f4ee?orderByHotValue=1&mutiTagIds=643&page=1&onlyReference=false    

3) (二十五)(4)

4) (十八)(6)

5) ?????????????????????????????




(四十六)
1) (三)(2)

2) (四)(3) 
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/ 

3) (四十三)(6)

4)  (五)(1) (二)(10) (二)(9)




(四十七)
1) (五)(1) (二)(10) (二)(9)

2) 
forEach:
1. 遍历数组
2. 但不能使用break、continue和return语句

for…in
1. 遍历数组索引、对象的属性 使用for…in遍历时，原型链上的所有属性都将被访问
2. 解决方法：使用hasOwnProperty()
hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中。这个方法只在给定属性存在于对象实例中时，才会返回true。

for…of: 
1. 不同于forEach 可以使用break、continue和return语句
2. for-of (只要对象身上有Symbol.iterator这个迭代器的 可以被for of遍历)循环不仅仅支持数组的遍历。同样适用于很多类似数组的对象
3. 它也支持字符串的遍历
4. for-of 并不适用于处理原有的原生对象 因为原始对象身上没有Symbol.iterator这个迭代器

详解: https://blog.csdn.net/demiling/article/details/83146361
详解: https://www.cnblogs.com/xueshanshan/p/8487438.html
各优缺点详解: https://www.cnblogs.com/larrywang/p/10325988.html

3) (二)(8)

4) (二十六)(9)

5) 

这里绑定了keydown事件 意图是当用户在文本框里输入字符时 将输入的内容实时地在 <div> 中显示出来 但是实际效果并非如此 可以发现 每按下一个字符时 <div> 中只能显示出之前的内容 无法得到当前的字符 这时就可以利用 setTimeout(0)：
原因是onkeydown是异步事件 js事件机制是先执行完同步任务再执行异步任务

setTimeout(fn,0)的含义是: 指定某个任务在主线程最早可得的空闲时间执行 意思就是不用再等多少秒了 只要主线程执行栈内的同步任务全部执行完成 栈为空就马上执行

关于setTimeout要补充的是 即便主线程为空 0毫秒实际上也是达不到的 根据HTML的标准 最低是4毫秒。

settimeout(0)的作用: 就起到了一个将事件加入到队列中，待执行的一个功能效果！

<input type="text">
<div></div>
<script type="text/javascript">
var input = document.getElementsByTagName('input')[0];
var div = document.getElementsByTagName('div')[0];
input.onkeydown = function() {
    // 不使用setTimeout(fn, 0);
    // div.innerHTML = this.value;


    // 使用setTimeout(fn, 0);
    var that = this;
    setTimeout(function() {
        div.innerHTML = that.value;
    })
}

有人可能会想到利用绑定keyup事件来解决 但是onkeyup有一个问题就是当一直按着某个键不放时 也会无法得到输入内容 因为此时不断地触发keydown和keypress 直到用户松起时才会触发keyup 当然 示例所用的keydown 也存在一些小缺点 比如用户如果使用右键粘贴 则无法得到粘贴的内容。

所以最理想的方案应该是使用HTML5的input事件 当文本框或textarea的value发生变化时就会触发此事件 对粘贴也可以很好地兼容 至于IE9之前的浏览器 需要使用专有的onpropertychange事件


6)
var all = document.getElementsByTagName('*');
var tags = [];
for (var i = 0; i < all.length; i++) {
    tags.push(all[i].nodeName.toLocaleLowerCase());
}
var res = {};
for (var i = 0; i < tags.length; i++) {
    if (!res[tags[i]]) {
        res[tags[i]] = 1;
    } else {
        res[tags[i]]++;
    }
}
console.log(res);


详解: https://blog.csdn.net/qq_29187355/article/details/86443178

查询网页中DOM元素的总数量?
document.getElementsByTagName('*').length 

详解: https://blog.csdn.net/laijieyao/article/details/42677955




(四十八)
1) (二)(8)

2) 
<ul>
    <li id="list1">1</li>
    <li id="list2">2</li>
    <li id="list3">3</li>
    <li id="list4">4</li>
</ul>

// 立即执行函数
var oLi = document.getElementsByTagName('li');
var len = oLi.length;
for(var i = 0; i < len; i++) {
    (function(j) {
        oLi[j].onclick = function() {
            console.log(j);
        }
    }(i))
}

// 事件委托
var ul = document.getElementsByTagName('ul')[0];
var oLi = document.getElementsByTagName('li');
ul.onclick = function(e) {
    var event = e || window.event;
    var target = event.target || event.srcElement;
    switch (target.id) {
        case "list1":
        console.log(0);
        break;
        case "list2":
        console.log(1);
        break; 
        case "list3":
        console.log(2);
        break;
        case "list4":
        console.log(3);
        break;
    }
    }

// 使用let产生块级作用域
var oLi = document.getElementsByTagName('li');
var len = oLi.length;
for(let i = 0; i < len; i++) {
    oLi[i].onclick = function() {
        console.log(i);
    }
}

3) (二)(10)




(四十九)
1) 

3 2 4 
5
6
7 

详解: https://juejin.im/post/59e85eebf265da430d571f89

2) (三十七)(8)

3)
var sum = function() {
    var _args = [];
    return function() {
        if(arguments.length === 0) {
            return _args.reduce(function(a, b) {
                return a + b;
            })
        }
        [].push.apply(_args, [].slice.call(arguments));         
        return arguments.callee;
    }
}
const x = sum(1);
sum(1,2)(3,4,5)(6)();

详解: https://yq.aliyun.com/articles/657612

argument为函数内部对象 包含传入函数的所有参数 arguments.callee代表函数名 多用于递归调用 防止函数执行与函数名紧紧耦合的现象 对于没有函数名的匿名函数也非常起作用
详解: https://www.cnblogs.com/lmy2016/p/6087872.html




(五十)
1)
不可改变的原始值(栈数据)(基本数据类型)
    Number String Boolean undefined null Symbol
引用值(堆数据)(引用数据类型)
    array object function Date RegExp...

原始值和引用值的区别?
(栈内存和栈内存之间的赋值是拷贝的关系 他们之间是互相不影响的 堆内存是散列结构 
堆内存 栈内存里放的是堆内存的地址 为了方便找到堆内存里面的内容 栈内存里面存的是地址)
1. 原始变量及他们的值储存在栈中，当把一个原始变量传递给另一个原始变量时，是把一个栈房间的东西复制到另一个栈房间，且这两个原始变量互不影响。
2. 引用值是把引用变量的名称储存在栈中，但是把其实际对象储存在堆中，且存在一个指针由变量名指向储存在堆中的实际对象，当把引用对象传递给另一个变量时，复制的其实是指向实际对象的指针，此时两者指向的是同一个数据，若通过方法改变其中一个变量的值，则访问另一个变量时，其值也会随之加以改变；但若不是通过方法而是通过重新赋值  此时相当于重新开了一个房间  该值的原指针改变，则另外一个值不会随他的改变而改变。

详解: https://www.cnblogs.com/lihuijuan/p/8625322.html

2)
function type(target) {
    var ret = typeof(target);
    var template = {
        '[object Array]': 'array',
        '[object Object]': 'object',
        '[object Number]': 'number-object',
        '[object Boolean]': 'boolean-object',
        '[object String]': 'string-object'
    }
    if(target === null) {
        return 'null';
    }else if(ret === 'object') {
        var str = Object.prototype.toString.call(target);
        return template[str];
    }else {
        return ret;
    }
}




(五十一)
1) (五十)(1)

2) 
1. 首先看双等号前后有没有NaN，如果存在NaN，一律返回false。
2. 再看双等号前后有没有布尔，有布尔就将布尔转换为数字。（false是0，true是1）
3. 接着看双等号前后有没有字符串, 有三种情况：
       对方是对象，对象使用toString()或者valueOf()进行转换；
       对方是数字，字符串转数字；（前面已经举例）
       对方是字符串，直接比较；
       其他返回false
4. 如果是数字，对方是对象，对象取valueOf()或者toString()进行比较, 其他一律返回false
5. null, undefined不会进行类型转换, 但它们俩相等

4、其他返回false
3) (三十一)(6)
function getSum(arr) {
    var arr = arr || [],
        resArr = [],
        len = arr.length;
    for(var i = 0; i < len; i++) {
        if(Object.prototype.toString.call(arr[i]) === '[object Array]') {
            resArr = resArr.concat(getSum(arr[i]));
        }else if(typeof(arr[i]) === 'number'){
            resArr.push(arr[i]);
        }
    }    
    return resArr.reduce(function(a, b) {
        return a + b;
    })  
}
getSum[1, '2', [3, [4, 5]]];

4)??????????????????????????????????????????

5) (二十二)

6) (二)(8)

7) (十七)(2)
在ES6之前 JavaScript没有块级作用域(一对花括号{}即为一个块级作用域) 只有全局作用域和函数作用域 
变量提升: 即将变量声明提升到它所在作用域的最开始的部分

函数提升: 即将函数声明提升到它所在作用域的最开始的部分
只有函数声明才有提升 函数表达式没有提示

函数提升和变量提升，以及他们的优先级? 
函数提升要比变量提升的优先级要高一些 且不会被变量声明覆盖 但是会被变量赋值之后覆盖
详解见 => 预编译

函数
定义
    函数声明
    函数表达式(匿名函数表达式)
组成形式
    函数名称
    参数 
        形参
        实参
    返回值




(五十二)
1) (三十九)(8) (五)(1) (二)(10) (二)(9)




(五十三)
1) (二十六)(6)
2) (五)(1)
3) (十八)(6)




(五十四)
1）
var arr = [1, 2, 5, 3, 4];
   
1. 遍历数组每一项与当前最大值比较 
Array.prototype.max = function() {
    var arr = this;
    var max = this[0];
    var len = this.length;
    for(var i = 1; i < len; i++) {
    if(arr[i] > max) {
        max = this[i];
    }
    }   
    return max;
}

2. sort()排序 a-b从小到大 b-a从大到小
console.log(arr.sort(function(a, b) {
    return b - a;
})[0]); 

注意: arr.sort()不带参数的时 将按照字符编码的顺序进行排序

3. 内置函数Math.max() 支持传递多个参数 但不支持传递一个数组 只能借助apply()  Math.max.call(null, 10, 1, 2, 3);
console.log(Math.max.apply(null, arr));

4. ...拓展运算符
console.log(Math.max(...arr));

详解: https://blog.csdn.net/web_hwg/article/details/68065587


为什么要把方法写在原型上?/谈到构造在JS定义构造函数的方法是最好使用原型的方式：将方法定义到构造方法的prototype上?/为什么通用的对象方法要加在原型中?
1. 原型的使用场景?
       可以提取公有属性
       可以提取公有方法
2. (在构造函数中加属性 原型中加方法) 将属性和方法都写在构造函数中没问题 但问题在于每次进行实例化的过程中 重复创建功能不变的方法。
由于方法本质上是函数 其实也就是在堆内存中又新建了一个对象空间存储函数 造成了不必要的资源浪费
解决办法除了使用原型外 也可以令其指向一个全局的函数 从而避免重复创建方法

详解: https://www.cnblogs.com/yunfour/p/3946444.html
详解: https://blog.csdn.net/weixin_41702247/article/details/83381833

2) 
function sum() {
    var args = arguments, // 获取所有的参数
        d = 0, // 定义小数位的初始长度，默认为整数，即小数位为0
        sum = 0; // 定义sum来接收所有数据的和
    // 循环所有的参数
    for (var key in args) { // 遍历所有的参数
        // 把数字转为字符串
        var str = "" + args[key];
        if (str.indexOf(".") != -1) { //判断数字是否为小数
        // 获取小数位的长度
        var temp = str.split(".")[1].length;
        // console.log(temp);
        // 比较此数的小数位与原小数位的长度，取小数位较长的存储到d中
        d = d < temp ? temp : d;
        }
    }
    //计算需要乘的数值
    var m = Math.pow(10, d);
    //遍历所有参数并相加
    for (var key in args) {
        sum += args[key] * m;
    }
    //返回结果
    return sum / m;
}
// console.log(sum(0.1, 0.2));
console.log(sum(1.1, 1.22));

详解: https://blog.csdn.net/woxiaole_521/article/details/84066138

3)
function extract(list) {
    var newArr = [],
        len = list.length;
    for(var i = 0; i < len; i++) {
        if(list[i].name) {
            newArr.push({'name': list[i].name});
        } 
        // 为什么不能用if else????  
        if(list[i].children) {
            [].push.apply(newArr, (extract(list[i].children)));
        }
    }
    return newArr;
}
var list = [ { name: 'a', children: [{name: 'b'}, {name: 'c'}] },{ name: 'd'}];
console.log(extract(list));
var list = [{name: 'a', children: [{name: 'b'}]}, { children: [{ name: 'c'}] }];
console.log(extract(list));

总结: concat不改变原数组
      [].push.apply(oriArr, addArr)改变原数组

4) (五十一)(7)

5) (二)(9)




(五十五)
1)  (二)(9)




(五十六)
1) (六)(4)

2)
async: async异步加载 加载完就执行 async只能加载外部脚本 (仅适用于外部脚本)
charset: 规定在脚本中使用的字符编码
defere: 异步加载 但要等到dom文档全部解析完才会被执行 只有IE能用(仅适用于外部脚本)
src: 规定外部脚本的URL
type: 规定脚本的 MIME 类型。
xml:space: HTML5 不支持。规定是否保留代码中的空白。  

为何<script src='...' charset='utf-8'></script>不生效呢?
某些HTML编码规则建议 script标签的type属性最好去掉 因为默认就是type="text/javascript"，这种说法虽然是没错 但是当你加上charset='utf-8'的时候你就会发现 charset='utf-8'根本不起作用！为啥呢？因为指定字符集的前提是 必须先指定MIME 不指定的话 浏览器不会帮你默认设置 
从某种意义说也算是个坑吧 所以记得type="text/javascript"要跟charset='utf-8'一起食用。

详解: https://www.jianshu.com/p/4f9ce097b837

3) (五)(1)

4) (二十二)(1)

5) (二)(6)

6) (三十八)(1)

7) (十九)(5)




(五十七)
1)
ECMAScript是JavaScript的规范 JavaScript是ECMAScript的实现   

一个完整的JavaScript实现应该由以下三个部分组成：
    ECMAScript: 核心
    DOM: 文档对象模型
    BOM: 浏览器对象模型

详解: https://blog.csdn.net/zhouziyu2011/article/details/69569604

2) (一)(5)

var box = document.getElementsByClassName('box')[0],
	left = 0;	
setTimeout(function (){
    left += 10;
    box.style.left = left + 'px';
    setTimeout(arguments.callee, 1000);
}, 1000)

使用setInterval的缺点
1. 某些间隔会被跳过 
2. 多个定时器的代码执行时间可能会比预期小

用setTimeout去实现setInterval的优点
1. 在前一个定时器代码执行完成之前 不会向队列插入新的定时代码 确保不会有任何的缺失间隔 
2. 而且 它保证在下一次定时器代码执行之前 至少要等待指定的时间间隔 

详解: https://blog.csdn.net/b954960630/article/details/82286486
详解: https://blog.csdn.net/baidu_24024601/article/details/51862488

3)????????????????????????????????????????????




(五十八)
1) (三)(2)




(五十九)
1) (一)(2)
????????????????????


设计模式




2) (二)(3)

3) (二)(8)

4)  (三十九)(8) (五)(1) (二)(10) (二)(9)

5) (五十)(1)

6)
数据结构:
	第七种数据结构 Symbol

特点:
	唯一 可作为对象的属性 有静态属性Symbol.iterator

7) (二)(8)

8) (三十九)(8) (五)(1) (二)(10) (二)(9)




(六十)
1)
面向对象: 是把构成问题的事物分解成个各个对象 建立对象的目的不是为了完成一个步骤 而是为了描述某个事物在整个解决问题的步骤中的行为。
    面向对象的三个基本特征: 封装 继承 多态
        封装: 把客观事物分装成抽象的类 把自己的数据和方法只让可信的类或者对象操作 封装保持了程序良好的独立性 使程序维护容易
        继承: 指让某个类型的对象获得另一个类型的对象的属性和方法 继承性很好的解决了软件的可重用性
        多态性: 一个相同实例的方法在不同情形有不同表现形式 针对不同对象的具体操作不同 但是通过一个公共类 那些操作可以通过相同方式予以调用
面向过程: 是分析出解决问题所需要的步骤 然后用函数一步一步实现 使用时候依次调用

面向过程
优点: 性能比面向对象高 因为类调用时需要实例化 开销比较大 比较消耗资源 比如单片机、嵌入式开发、 Linux/Unix等一般采用面向过程开发 性能是最重要的因素。 
缺点: 没有面向对象易维护、易复用、易扩展

面向对象
优点: 易维护、易复用、易扩展 由于面向对象有封装、继承、多态性的特性 可以设计出低耦合的系统 使系统更加灵活、更加易于维护 
缺点: 性能比面向过程低

详解: https://blog.csdn.net/jerry11112/article/details/79027834

2)??????????????????????????????????

3) (五十)(2)

4) (十四)(2)




(六十一)
1) (二十六)(6)

2)
执行时查找

3) (一)(5)

4) (二)(10)

5) 
注意: 使用匿名函数表达式时 函数的调用语句 必须放在函数声明语句之后！！！（与普通函数的区别）

使用场景: 实际上 YUI以及其相应的范例中大量使用匿名函数 其他的Javascript库中也不乏大量使用

详解: https://www.cnblogs.com/jiejiejy/p/7434857.html

6)
Promise.resolve方法的参数分成四种情况

1. 参数是一个Promise实例
如果参数是Promise实例 那么Promise.resolve将不做任何修改、原封不动地返回这个实例

2. 参数是一个thenable对象 
thenable对象指的是具有then方法的对象 比如下面这个对象
Promise.resolve方法会将这个对象转为Promise对象 然后就立即执行thenable对象的then方法
上面代码中，thenable对象的then方法执行后 对象p1的状态就变为resolved 从而立即执行最后那个then方法指定的回调函数 输出42

let thenable = {
    then: function(resolve, reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);  // 42
});

3. 参数不是具有then方法的对象 或根本就不是对象
如果参数是一个原始值 或者是一个不具有then方法的对象 则Promise.resolve方法返回一个新的Promise对象 状态为resolved

const p = Promise.resolve('Hello');
p.then(function (s){
  console.log(s)
});
// Hello

上面代码生成一个新的Promise对象的实例p 由于字符串Hello不属于异步操作（判断方法是字符串对象不具有then方法） 返回Promise实例的状态从一生成就是resolved 所以回调函数会立即执行 Promise.resolve方法的参数 会同时传给回调函数

4. 不带有任何参数
Promise.resolve()方法允许调用时不带参数 直接返回一个resolved状态的Promise对象
所以 如果希望得到一个Promise对象 比较方便的方法就是直接调用Promise.resolve()方法

const p = Promise.resolve();
p.then(function () {
  // ...
});

上面代码的变量p就是一个Promise对象
需要注意的是 立即resolve()的Promise对象 是在本轮“事件循环”（event loop）的结束时执行 而不是在下一轮“事件循环”的开始时




setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');
// one
// two
// three

上面代码中 setTimeout(fn, 0)在下一轮“事件循环”开始时执行Promise.resolve()在本轮“事件循环”结束时执行 console.log('one')则是立即执行 因此最先输出

详解: http://es6.ruanyifeng.com/#docs/promise#Promise-all

7) (十八)(6)

8) (三)(4)

9)
普通函数: 你后面写的是return什么就是什么 不写默认是return undefined

构造函数: 根据ECMAScript标准的规则 如果是在构造函数中 当回传值(return)是个对象时 用new之后就是得到那个return的对象 当回传值是对象以外的 如number、string、boolean或null、undefined(没有return)时 就会回传新构造出来的实例对象

10) (二十二)(2)

11) (二十二) (5)

12) (三十七)(8)

13)
Person.prototype = Array.prototype;
function Person() {}
p1 = new Person();

Person.prototype = Object.prototype;
p2 = new Person();

Person有__proto__还有prototype
p1上只有__proto__

p1.__proto__.__proto__ === Object.prototype; // true
p2.__proto__ === Object.prototype; // true
Array.prototype.__proto__ === Object.prototype; // true




(六十二)
1) (二)(8)

2) (二十六)(6)

3) (一)(11)

==: 会发生隐式类型转换
1. undefied == null;
2. 如果一个是字符串 一个是数值 把字符串转换成数值之后再进行比较

===: 不会发生隐式类型转换

4) (三)(2) (七)(6)

5) (二十二) (5)




(六十三)
1) (二十二)(6)

2) (三)(2) (七)(6)

3)
// 父类
function A(name) {
    this.name = name || 'Tom'
}
// 子类
function B() {}

// B.prototype = new A();
B.prototype = A;

var obj = new B();
console.log(obj.name);

// A.prototype.__proto === Function.prototype === Object.prototype;
// Function.prototype.name 

其实问题的答案涉及到两个方面: 
1. 当访问对象的属性不存在时 会查找其原型链上是否有该属性 如果不存在 则往原型链的原型链上找 递归下去
2. Function的原型链上 存在一个属性name 其值为function的函数名

详解: https://blog.he110.info/article/detail/fe/0

4)
call和apply的区别
相同点: 都是改变this指向
不同点: 
        传参列表不同 call是一个一个传的 apply后传的是数组或是arguments
        当参数不定的时候使用apply

5)
详解: https://juejin.im/post/5ced4613f265da1bb96fbe68




(六十四)
1) (六)(4)

2) (二)(9)




(六十五)
1) (五十)(2)

2) (二)(8)

3) (二十六)(9)

4) (三十八)(1)

5) (十七)(2)

6) (三十五)(13)

7) (二十六)(6)

8) (十九)(5)

9)
var Add = (function() {
    var num = 0;
    return function() {
        this.num = num++;
    }
})()

详解: https://www.nowcoder.com/discuss/165786




(六十六)
1) (二十六)(6)

2) (二十二)(2)

3) (十九)(5)

4
从开始到两车相遇的时间为：北京到广州的距离/(15+20),这个时间就是小鸟一直飞行的时间。
所以小鸟飞行的距离为（北京到广州的距离/(15+20)）*30

详解: https://blog.csdn.net/qq_41035588/article/details/80561278#t1

5)
先装满3L的桶,将水倒入5L的桶中,再倒满3L的桶,慢慢往5L的桶里倒,直到5L的桶满为止,此时3L的桶中余下的是1L的水.把5L桶中的水倒光,然后将刚才3L的桶中剩下的那1L倒进5L桶中,再将3L的桶倒满后倒入5L桶中,此时5L桶中应该有4L水。

详解: https://blog.csdn.net/qq_34337272/article/details/80784299




(六十七)
1) (二)(6)
http 长轮询
1）介绍：http长轮询是server收到请求后如果有数据 立刻响应请求 如果没有数据就会停留一段时间 这段时间内 如果server请求的数据到达（如查询数据库或数据的逻辑处理完成）就会立刻响应 如果这段时间过后 还没有数据到达 则以空数据的形式响应http请求 若浏览器收到的数据为空 会再次发送同样的http请求到server；
2）http长轮询的缺点：server没有数据到达时 http连接会停留一段时间，这会造成服务器资源浪费
3）看个荔枝：假设有1000个人停留在某个客户端页面 等待server端的数据更新 那就很有可能服务器这边挂着1000个线程 在不停检测数据是否发生变化这依然是有问题的
使用场景: 聊天室

http 短轮询
1）介绍：http短轮询是server收到请求 不管是否有数据到达都直接响http请求 如果浏览器收到的数据为空 则隔一段时间 浏览器又会发送相同的http请求到server 以获取数据响应
2） http短轮询的缺点：消息交互的实时性较低（server端到浏览器端的数据反馈效率低）

http 长轮询 和 短轮询的异同
1）相同点：当server的数据不可达时 基于http长轮询和短轮询的http请求 都会停留一段时间
2）不同点：http长轮询是在服务器端的停留 而http短轮询是在浏览器端的停留
3）性能总结：从这里可以看出 不管是长轮询还是短轮询 都不太适用于客户端数量太多的情况 因为每个服务器所能承载的TCP连接数是有上限的 这种轮询很容易把连接数顶满

详解: https://blog.csdn.net/pacosonswjtu/article/details/52035252

2) (二十四)(3)

3) (五)(1)

4) (三)(1)

5) 
@each 循环就是去遍历一个列表 然后从列表中取出对应的值 
@each 循环指令的形式：@each var in <list>  var就是一个变量

详解: https://www.jianshu.com/p/3babe0158140

6) (六)(4)




(六十八)
1) (十四)(2)

2)
// 递归
function print(n) {
    if(n <= 0) {
        return 0;
    }
    if(n === 1) {
        return 1;
    }
    if(n === 2) {
        return 2;
    } 
    return print(n- 1) + print(n - 2);
}

// 非递归 动态规划
function print(n) {
    if(n <= 0) {
        return 0;
    }
    var obj = {
        1: 1,
        2: 2
    }
    for(var i = 1; i <= n; i++) {
        if(!obj[i]) {
            obj[i] = obj[i - 1] + obj[i - 2];
        } 
    } 
    return obj[n];
}

3) ????????????????????????

4) (五十)(1)

5) (三十一)(4)
数字转化为字符串

字符串转化为数字
强类型转化
    Number(str);
弱类型转化
    +str;
转化函数    
    parseInt(str);
    parseFloat(str);

6) (三十三)(1)

7) (四十三)(4)

8) (二十五)(8)

9) (十四)(2)

10) 
详解: https://juejin.im/post/5ceca322f265da1bd6058416#heading-1

11) (二十二)(2)

12) (三十八)(1) (六十三)(4)

13) (二)(10)




(六十九)
协议
    API与用户的通信协议 总是使用HTTPS协议 确保交互数据的传输安全

域名
    1. 应该尽量将API部署在专用域名之下
    https://api.example.com
    2. 如果确定API很简单 不会有进一步扩展 可以考虑放在主域名下
    https://example.org/api/

api版本控制
    1. 应该将API的版本号放入URL
    https://api.example.com/v{n}/
    2. 另一种做法是 将版本号放在HTTP头信息中 但不如放入URL方便和直观 Github采用这种做法
    3. 采用多版本并存 增量发布的方式
    v{n} n代表版本号,分为整形和浮点型
    整形的版本号: 大功能版本发布形式 具有当前版本状态下的所有API接口 例如：v1,v2
    浮点型：为小版本号 只具备补充api的功能 其他api都默认调用对应大版本号的api 例如：v1.1 v2.2

API路径规则
    1. 路径又称"终点"（endpoint）表示API的具体网址
    2. 在RESTful架构中 每个网址代表一种资源（resource）所以网址中不能有动词 只能有名词 而且所用的名词往往与数据库的表格名对应 一般来说 数据库中的表都是同种记录的"集合"（collection） 所以API中的名词也应该使用复数
    3. 举例来说 有一个API提供动物园（zoo）的信息 还包括各种动物和雇员的信息 则它的路径应该设计成下面这样
    https://api.example.com/v1/products
    https://api.example.com/v1/users
    https://api.example.com/v1/employees

HTTP请求方式
    1. 对于资源的具体操作类型 由HTTP动词表示
    常用的HTTP动词有下面四个（括号里是对应的SQL命令）
    GET（SELECT）: 从服务器取出资源（一项或多项）
    POST（CREATE）: 在服务器新建一个资源。
    PUT（UPDATE）: 在服务器更新资源（客户端提供改变后的完整资源）。
    DELETE（DELETE）: 从服务器删除资源。
    2. 下面是一些例子。
        GET /product：列出所有商品
        POST /product：新建一个商品
        GET /product/ID：获取某个指定商品的信息
        PUT /product/ID：更新某个指定商品的信息
        DELETE /product/ID：删除某个商品
        GET /product/ID/purchase ：列出某个指定商品的所有投资者
        get /product/ID/purchase/ID：获取某个指定商品的指定投资者信息

过滤信息
    1. 如果记录数量很多 服务器不可能都将它们返回给用户 API应该提供参数 过滤返回结果

    2. 下面是一些常见的参数。
        ?limit=10：指定返回记录的数量
        ?offset=10：指定返回记录的开始位置。
        ?page=2&per_page=100：指定第几页，以及每页的记录数。
        ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
        ?producy_type=1：指定筛选条件

 
API传入参数
    参入参数分为4种类型：

    1. 地址栏参数
        * restful 地址栏参数 /api/v1/product/122 122为产品编号，获取产品为122的信息
        * get方式的查询字串 见过滤信息小节
    2. 请求body数据
        cookie
        request header
        cookie和header 一般都是用于OAuth认证的2种途径
    3. 返回数据
        只要api接口成功接到请求，就不能返回200以外的HTTP状态。
        为了保障前后端的数据交互的顺畅，建议规范数据的返回，并采用固定的数据格式封装。
    4. 接口返回模板：
       status: 接口的执行的状态 =0表示成功 <0 表示有异常=""
       Data 接口的主数据可以根据实际返回数组或JSON对象
       Msg当status!=0 都应该有错误信息

详解: https://blog.csdn.net/qw_xingzhe/article/details/82717168















(七十七)
1) (一)(3)
// on once  trigger off
function Event() {
        this.cache = {};
}
// 绑定事件
Event.prototype.on = function(type, handle) {
    if(!this.cache[type]) {
        this.cache[type] = [];
    }
    this.cache[type].push(handle);
}

// 一次执行后就解除绑定
Event.prototype.once = function(type, handle) {
    if(!this.cache[type]) {
        this.cache[type] = [];
    }
    this.cache[type].push(handle);
    // 做个标记
    handle.flag = true;
}

// 执行事件
Event.prototype.trigger = function() {
    var type = arguments[0];
    var args = [].slice.call(arguments, 1);
    
    if (this.cache[type] instanceof Array) {
        for (var i = 0, len = this.cache[type].length; i < len; i++) {
            this.cache[type][i].apply(this, args);

            // 检查是否有标记
            if (this.cache[type][i].flag) {
                this.cache[type].splice(i, 1);
            }
        }

    }
    
}

// 解除绑定事件
Event.prototype.off = function(type, handle) {
    this.cache[type] = this.cache[type].filter(function(ele) {
        return ele !== handle;
    }) 
}

var oE = new Event();
function print1(name) {
    console.log('print1:' + name);
}
function print2(name) {
    console.log('print2:' + name);
}
function print3(name) {
    console.log('print3:' + name);
}

oE.on('print', print1);
oE.on('print', print2);
oE.trigger('print', '1-1-1');

oE.off('print', print1);
oE.trigger('print', '2-2-2');

oE.once('print', print3);
oE.trigger('print', '3-3-3');

oE.trigger('print', '4-4-4');

2)
function format(time) {
    var oneMinute = 60 *  1000,
        oneHour = oneMinute * 60,
        oneDay = oneHour * 24,
        oneWeek = oneDay * 7;

    if(time <= oneMinute) {
        return('刚刚');
    }
    if(time <= oneHour) {
        return(Math.floor(time / oneMinute) +'分钟前');
    }
    if(time <= oneDay) {
        return(Math.floor(time / oneHour) + '个小时前');
    }
    if(time <= oneWeek) {
        return(Math.floor(time / oneDay) + '天前');
    }

    return new Date(time).toLocaleString(); //  toLocaleString() ：将Date转换为一个'年月日 时分秒'的本地格式字符串    
}

详解: https://github.com/lawler61/blog/issues/2










// promise源码
// 浏览器缓存
// (三十二)
// 常用模式