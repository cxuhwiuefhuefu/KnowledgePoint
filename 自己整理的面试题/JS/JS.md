(一)
1) BOM与DOM，及BOM相关的一些属性
2) 防抖和节流
3) 设计模式：发布订阅、观察者
4) input属性相关，以及怎样做的文件上传
5) setTimeout、setInterval与requestAnimationFrame
6) 页面加载问题，JS的异步加载
7) 给出代码，说出运算结果（this、event loop）
8) 写代码：回文数，数组去重，
9) 自定义log，判断数据类型
10) 请求优化和渲染优化的方法
11) 数据类型转换的原理
12) 编程，5个feach请求，请求完成后要求立即执行，但最终的输出顺序要按照要求输出ABCDE（思路是：将每个feach的回调通过a/a的方式输出，但最后没有run出来）
ABCDE这5个请求同时进行，最后输出的顺序也要按照按照ABCDE的先后顺序，就是如果B先执行完，但A没执行完，就等A执行完后并输出结果后再输出B的结果。😂不知道我说清楚了没有
昨天 17:34:31




(二)
1) js原型
2) 事件模型
3) 原型链
4) 问项目。微信小程序自己做过的部分，如何实现的，遇到过什么困难。
5) axios原理，element-ui是怎么实现的等等等吧 我就记得这么多了，反正面试官人很好，问到我为什么用php作为后台不用express（项目），我说如果用express的话后端人员就失业了哈哈哈哈哈我俩一起笑。
我本来都以为我凉了，但是最后竟然告诉我过了，让我等二面。
6) 对还有跨域，
7) webpack配置等
8) js 闭包
9) promise原理 自己有实现过吗
10) 箭头函数的特性与普通函数的区别。




(三)
1) reflow（回流）&repaint（重绘）及优化
2) JS几种继承方式
3) ES6
4) 深浅拷贝
5) 一个页面非常的卡，请你找出原因。




(四)
1) 设计用户登录的具体过程（balabala，尽力往web安全方面扯，然额面试官完全不吃我这套
2) 验证码的完整过程？（balabala
3) 要验证手机号该怎么做？(正则
4) 正则匹配在input的什么事件阶段进行？（项目目前还是demo水平，刚开始做，还没考虑到这一层，onchange（）？
5) input具体有哪些事件？还有吗？（....说的那几个已经是我的全力了




(五)
1) js部分，const，let和var的区别。
2) js部分，数组遍历map和forEach的区别。




(六)
1) 斐波那契数列
2) promise封装ajax
3) 接上一问:两个我封的ajax，两个有一个成功算成功，都失败算失败
4) async await




(七)
1) 闭包？内存泄露的例子？怎么才会内存泄露？
2) 原型链？
3) es6
4）promise和setTimeout深层的区别（task、microtask）
5）原型链（手写js继承的例子）
6）es6继承（用es6的class和extends再写一遍）
7）promise和setTimeout深层的区别（没错又问了一遍）
基本上都回答了出来，就是手撕代码的过程有点坎坷...不过最终还是做出来了。




(八)
1) 你说的你的项目里有个首屏加载特别慢的问题对吧？能说说怎么优化的吗？
es5,es6哪个用的多点？promise有了解吗
2) Promise.all promise.race 有了解吗（当时一直听成Promise.out ，我就纳闷了说哪儿来的这个方法。。）
说说事件循环
3) 闭包知道吗？它可能出现的问题呢
4) 假如有个项目加载最开始特别快，后面越来越慢你知道是为什么吗？以及如何第一时间定位（内存泄漏）




(九)
1) 用settimeOut实现settimeinterval




(十)
1) less和普通css区别（变量）
2) 用过es6什么新的东西？（let const promise 箭头函数 参数解构 ）
3) 箭头函数跟普通函数有什么区别（this）
4) let var const区别（提升 局部作用域 暂时性死区）
5) 看代码说执行结果（考察let 变量提升和函数提升）




(十一)
1) 你给我讲讲promise吧，感觉promise是重点
2) 然后问我async await用过吗，我说停留在语法书水平还没深入了解过，
3) 问了问基础知识，原型链，
4) 闭包，
5) 继承




(十二)
1) 正则表达式写出hello-world-thanks  =>  HelloWorldThanks（变量驼峰式转化）
2) 头条很喜欢考事件队列的题，大家在牛客上相信能搜到类似的题，就是给你一个promise,setTimeout,nextTick，什么的，让你写出打印的顺序，并且讲解一下




(十三)
1) 遇到的兼容性问题，怎么解决
2) 开发环境没问题，生产环境有问题是哪些原因，怎么查找并解决
3) 手机页面谷歌控制台调试没问题，手机测试有问题怎么查找并解决
4) 怎么理解前端工程化
5) 前后端分离目前有几种模式，几种模式间的优势对比
6) 怎么快速生成一个10万个空格的字符串
7) 怎么把一个数组乱序并保证每个数都不在原来的位置



(十四)
1) 问了我本科时候做的一个非前端比赛，还让我设计2个游戏……对，我都支支吾吾不知道怎么回。 后来才知道考察的是设计模式。
2) 从头到尾就2个基础问题，盒模型，事件代理   




(十五)
1) 怎么实时刷新列表 除了settimeout还有什么




(十六)
1) 事件绑定，考虑到性能页面优化的情况下，怎么绑定比较好
2) 事件委托是什么
3) 用过哪些es6语法，追问promise
4) promise和setTimeout有什么区别
5) 宏任务和微任务有了解过吗，promise属于哪个




(十七)
1) 项目如何排查为什么打不开。(在手机上可以打开，但是面试官的电脑上无法显示）有哪些可能
2) js解析过程
3) 项目要扩展一个新的模块，你要注意哪些点
4) 你的项目如何鉴权，如何实现单点登录，登录账号之后，在另一处登录，1.提示账号已经登陆2.登录成功，之前登录失效，两种如何实现




(十八)
1) 懒加载你用过不是？说一下如何实现，代码大概说一下吧？原生js如何实现？
2) 防抖节流说一下
3) js如何实现倒计时？2种办法说一下吧
4) 浏览器的优化方式？我各个方面都说了大概10多种
5) es6有用过吗？里面有个class可以实现继承，说一下吧，组合继承和寄生组合继承？有啥区别？还有啥继承？
6) promise有了解过吗？他是如何实现异步的？说一下原理吧？
7) 深浅拷贝？如何实现都？深拷贝关键点是啥？
8) js原型链和原型？如何使用？原理是啥？




(十九)
1) 懒加载的节流和防抖，代码实现，并说明原理去区别还有使用场景
2) 写一个继承吧，组合继承，然后说出寄生组合继承相对于组合继承的优点
3) es6有学过吗？说一下你了解哪几个，我详细说了let var const的区别各种使用办法
4) promise有用过吗？他是干啥的？你会在啥场景使用他，promise如何解决回凋地狱？如何和ajax配合？
5) 浏览器的渲染过程




(二十)
1)首屏加载




(二十一)
1) Promise promise怎么实现，说了下实现过程 catch怎么实现 all怎么实现 async await怎么实现




(二十二)
1) ES6新特性有哪些 迭代器生成器使用场景，在项目中使用过吗？
2) 判断this，如何绑定this
3) 箭头函数？
4) 闭包是什么？使用场景？说了一个通过访问器来隐藏变量，追问还有其他使用场景吗
5) 如何判断数组和对象，instanceof有什么问题，
6) 改变object的隐式原型(__proto__)会发生什么？





(二十三)
1) this关键词在class里不bind在外面调用会咋样 答：undefined
2) 关于JavaScript promise的问题 答：知道有这个东西，因为一直没用，所以没仔细看过，估计看个半小时就会了
3) 右上角往左下角斜着打印二维数组。比如[[1,2,3],[4,5,6],[7,8,9]]打印出来是1 2 4 3 5 7 6 8 9 答：撸了个JavaScript function解决了。因为最近python写多了落下的病，比如&&写成and，新的block写成 冒号锁进，.length写成len()， while条件不加括号，出了好几次编译错误，第一次编译出错小姐姐面无表情，第二次编译出错小姐姐点点头，第三次编译出错小姐姐都要笑喷了。编译了以后就一遍过了。
4) everse linked list every K：reverseK(1->2->3->4->5->6->7->8->9, 3) 输出 3->2->1->6->5->4->9->8->7. python写了一波，LinkedList class和Node class都手撸了一下，然后写的function应该是对的，但没跑出来，过程中不断交流，叔叔知道了我的思路是正确的，就直接下一题了。
5) 三种颜色变色龙，两只不同颜色的相遇会都变成第三种颜色的，问什么初始状态下（三种分别多少只）可能最终全变成一种颜色？答：提了好几个不够general的条件，都不对，在二十分钟里不停的与面试官叔叔一起分析，描述思路，最后也没得到标准答案。
// 算法




(二十四)
1) 讲讲ES6的箭头函数
2) await和async 本质
3) 类数组转化成数组的方法
4) 代码题，异步执行的顺序，宏观任务任务理解，promise、setTimeout等，让你写出输出的顺序
5) 代码题，思路是将一个嵌套的数组用深度遍历和广度遍历分别写出来
// 算法



(二十五)
1) 数组的遍历方法有很多，说几个 map和forEach的区别 在循环过程中可以跳出循环吗
2) 有哪些类似数组的结构
3) 说一下set
4) 说一下map和weakmap的区别
5) 像下拉加载这种功能你是怎么实现的
6) 那你是怎么给他们添加事件的
7) 说一下事件委托
8) 现在前端其实要注重用户体验 你这样需要点击是不是用户体验不太好
9) 弹窗的几种形式




(二十六)
1) JS的数据类型
2) 操作DOM比较耗费资源，请问怎么减少消耗
3) 简化操作DOM的API或者库
4) 浏览器缓存
5) VDOM (VUE)
6) 作用域以及作用域链  
7) 上下文执行栈和作用域链的区别
8) 闭包
9) JS的事件循环机制 事件循环中队列中的事件有先后顺序吗
setTimeout设定为0ms会直接执行吗，如果设置为5s会一定在5s后执行吗
10) JS延后加载， 怎么缩短JS的加载时间
11) 脚本执行时的栈的情况

12) 解析HTML的过程
13) 加载JS和CSS会阻塞浏览器的渲染吗 下载JS和CSS会阻塞吗
14) HTML文件的解析过程

15) 为什么会生成CSSOM树
16) CSS没有选择器
17) 为什么生成了CSSOM树这样的结构

18) 加载JS和CSS会阻塞浏览器的渲染吗
19) 操作DOM树为什么比操作VDOM树要慢
20) 假设有一个页面的header有10个link包含CSS，每个下载10s，中间body中有一个div包含所有类，div下面有10个script，每个下载10s，请问下载的时间是多久？
接上题，如果刷新了以后页面加载需要多久




(二十七)
1) 说一下es6的promise的状态，实现原理？
2) 一道eventLoop的题，直接写出输出结果，然后说一下一次事件循环的过程，在题目中标出每一次事件循环
中间问的一些细节问题有点忘了哈
3) 写代码，实现一个累加函数的功能比如sum(1,2,3)(2).valueOf()//8，写完后面试官说总体思路是对的，柯里化，但是一些细节要注意一下（当时变量有的写错了），代码：
https://blog.csdn.net/weixin_41531446/article/details/88903436
4) 最后面试官出了道原型继承的题，我当时没看石墨文档直接在本地IDE写了两个函数然后组合继承，他说让我看看文档，要我封装一个实现继承的函数




(二十八)
1) 数据类型以及判断方式（ES6的isArray 和isNaN啥的记得也提一嘴，要是实在不记得就别挖坑了）
2) 性能优化，
3) 回调地狱是什么怎么解决，
4) 数组操作方法包括ES6新增的一些（可能会手写深拷贝或者数组flat或者排序啥的）




(二十九)
1) 闭包
2) 性能优化
3) promise
4) 内存泄漏




(三十)
1.考察作用域与异步 大概代码如下
for(var i = 0;i<5;i++){
  setTimeout(()=>{
    console.log(i);     
  },0)
}
console.log(i);
console.log('end');
2.考察变量提升 大概代码如下
var a = 10
function A(){
  console.log(a);
  a = 20;
  console.log(a)
}
function B(){
  console.log(a);
  var a = 20;
  console.log(a)
}
B();
A();
console.log(a);




(三十一)
1) js原型链
2) 闭包
3) this指向
3) 数组的方法
4) 字符串转化
5) 项目中的问题，如何解决
6) 数组打平




(三十二)
1) js的闭包和继承是什么
2) 二面主要不是问基础， 主要还是考察问题的解决能力。上来首先还是聊了项目，谈自己映像最深的项目，然后自己干了些什么，但是那个项目我的确映像很深，但是比较久了，很多细节都没说出来。
3) 然后给了我一个场景，如果用户登录不了，让我帮忙，我怎么解决。首先自己想到的是在编码上，检查请求。然后面试官说你又看不到永不的请求，然后我憋了半天，不晓得他要问啥，然后它提示我，首先需要问用户的登录方式，然后对应的提示信息是什么，然后让我继续，但是我是真的想不出了，我说根据用户提供的用户信息去判断是什么问题。然后面试官说不是，然后就不了了之。
然后后面我又说了很多，自己是怎么学的，自己的学习能力以及自学能力。本以为要凉，结果二面让我过了。可能是觉得我比较主动，学习能力比较强
4) 闭包是什么，
5) 了解哪些性能优化以及怎么实现的
6) 字符串相乘。然后，让我用笔写…，反正我用笔写是写不下去，因为没写过，很多时候需要边写边思考，最后我没写出来，然后晚上就给我挂掉了。。。。(算法)
7) 写完笔试题之后，然后问了我一个问题。一个电影院的厕所交给我来做，我会怎么来做，然后我想了一下，说大概从下面两点，一点是方便快捷，第二点是舒适度即用户体验度。




(三十三)
1) js事件流
2) 问es6的箭头函数与普通函数的区别（我说了this的区别，然后具体说了一个例子，让我说答案）
3) 问有很多事件，只有当所有事件都执行完，才能调用另一个事件，用promise怎么实现
4) let和const的区别
5) js继承你了解几种，说一下原型链继承和构造函数继承的区别，优缺点
6) 怎样实现深拷贝
7) 正则表达式中的 * . ？分别是什么意思




(三十四)
1) 发布订阅模式(代码)
2) 改变this指向（代码）
3) 事件循环
4) 执行栈.
5) 事件冒泡，不冒泡的事件




(三十五)
1) 如何判断一个变量 a 是否是一个数组
2) 什么是闭包？它有什么好处
3) 怎么实现继承
4) ES6 有哪些新特性
5) 正则表达式的语法熟悉吗
6) 怎么去分析项目的性能
7) chrome 调试用过哪些
8) 页面卡顿的话可以做哪些优化
9) 项目重构需要从那几方面出发
10) 代码开发有哪些规范
11) 最后让我做了三道js题目 手写一个对象深度拷贝的函数
12) 一道关于变量声明提升的问题
if('a' in window) {
    var a = 'hello'
}
console.log(a)	
13) 一道this指向的问题，并扩展了严格模式下会有什么不同
var name = 'window';
var person = {
    name: 'person',
    prop: {
        name: 'prop',
        say: function () {
            console.log(this.name)
        }
    }
}
person.prop.say()		// 输出?	
var fn = person.prop.say;
fn()					// 输出?	
14) 浏览器解析




(三十六)
1) JS数据类型，引用类型的特点
2) 讲原型和原型链
3) for..in能不能遍历出原型链上的属性
4) 讲作用域和作用域链
5) 讲闭包
6) ES5怎么实现 async / await，
7) 高阶函数了解吗




(三十七)
1) 自我介绍，怎么学习前端
2) 讲项目，问项目。因为我之前实习的公司多写原生JS和自己的框架，所以就问公司的框架内容，数据传递，全程没有问React/Vue
3) JS数据类型，null和undefined区别
4) null >= 0 / null <= 0 / null == 0 结果，前两个true，后一个false，这个我答错了
5) ES6有哪些循环方法
6) 不用循环、不用Array原生API，如何遍历数组。这个我不会，有没有厉害的同学解答一下？
7) 讲一讲箭头函数
8) prototype和__proto__的关系




(三十八)
1) bind的作用与实现
2) 异步编程的题目
3) microtask和macrotask的区别
4) stream和同步方式处理文件有什么区别
5) promise的编程题
6) 关于setTimeout的几道编程题
7) 判断Array类型有几种方法
8) let const var区别
9) 箭头函数与普通函数的区别
10) 一道编程题（忘了。。）
11) 0.1+0.2等于多少，精度丢失的原因
12) 对象继承的编程题
13) 异步编程的输出顺序
14) 浏览器事件循环
15) let const var区别
16) 箭头函数与普通函数的区别
17) js中处理大数 (算法)
18) 编程题：
找出两个有序数组中的重复项，分析时间和空间复杂度，然后就是不断优化优化优化。。(算法)
19) 要是数组长度非常大会出现什么情况？




(三十九)
1) es6了解过哪些，var let const 区别
2) JS数组操作有哪些
3) 正则表达式，反向引用，千分位怎么实现
4) promise原理，怎么实现
5) 抽奖怎么实现
6) 手写闭包
7) 变量提升，怎么解决，let const区别
8) es6还有什么新特性，说了解构赋值，让手写。(后来了解过没用过的就不让我写了)
9) 函数和对象有什么不一样
10) 手写异步，怎么取出json文件里的信息




(四十)
1) 事件代理，事件冒泡




(四十一)
1) 写函数任意标签转成json文件
<div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { 
          tag: 'A',
          children: []
        }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { 
          tag: 'A',
          children: []
        },
        { 
          tag: 'A', 
          children: []
        }
      ]
    }
  ]
}

function DOM2JSON(root) {}
2) 写函数：
function repeat(func, times, wait) { 
  // TODO
}
const repeatFunc = repeat(alert, 4, 3000);
repeatFunc("hellworld");
repeatFunc("hellworld");//会alert4次 helloworld，每次间隔3秒
3) 抛硬币
抛硬币问题 先抛的人赢的概率 (算法)




(四十二)
1) js原型链
2) 事件委托是什么，怎么判断子元素是哪一个。我就是没说event.target
3）es6，let解决了啥，var是全局变量吗。
4) promise对象了解吗？两个端口发消息，怎么确定都成功了，再执行。
求大佬解答。




(四十三)
1) script延迟和异步加载（defer async
2) 闭包（答了一堆，面试官说想听底层堆栈的理解，好久没复习了想了一会放弃
3) js实现一个队列（面试官问的是怎么用js写一个队列，比如unshift啊，然后我就说unshift实现队列，然后面试官发现自己说漏嘴了哈哈哈哈哈😂x
4) DOM的增删改查操作（我直接说remove，面试官还提醒我是不是忘了父节点，马上改回来removeChild 哎我这脑子
5) 事件委托的理解
6) 讲到事件冒泡，怎么阻止事件冒泡、取消默认事件（e.stopPropagation() e.preventDefault()
7) 原型、原型链、构造函数（这里讲了好多，三者关系、
8) 怎么实例一个对象、
9) 怎么拷贝一个对象、
10) instanceOf怎么检测一个数组
11) object方法 .definepropoty  .keys .values（从这里开始就开始教我怎么学前端了
14.ES6




(四十四)
1) 说你所知道的全局对象
2) 判断数组的方法
3) typeof都有什么返回值
4) Event loop（宏任务微任务）
5) es6的 let const
6) es6的箭头函数（多层嵌套时的this）
7) "undefined"==undefined并根据这个问题扩展




(四十五)
1) Javascript 检测Error的方式
2) OS 进程的组成
3) Javascript的 gc机制
4) javascript 有哪些异步的方式
5) JSX




(四十六)
1) js继承及各自的优缺点
2) js正则，匹配邮箱和电话
3) 如何阻止冒泡
4) es6有了解吗（没有）




(四十七)
1) 后就问到了es6了解多少
  （刚入门的我只能答我知道的）
2) 根据我提的for in问了for in，for of，foreach的区别
3) 然后是js闭包，
4) js事件机制，
5) setTimeout(0)的作用
6) 印象最深的是
你在一个网页，假设淘宝网，你要怎么获得这个网页的dom元素的种类数目




(四十八)
1) 闭包 啥时候用闭包呢
2) 写一个为一个list中的li绑定点击事件 输出每个的index 我写的用立即执行函数 还想到了可以用事件委托 面试官问那用块级作用呢？一下子没想起来 其实就是把var变成let
3) 箭头函数的好处 this指向




(四十九)
1) 讲一下代码的执行结果，并解释为什么
Promise.resolve().then(() => console.log(2));
new Promise((resolve, reject) => {
  resolve();
  console.log(3);
}).then(() => console.log(4));
setTimeout(() => {
  Promise.resolve().then(() => console.log(5));
  setTimeout(() => console.log(7), 0);
}, 0);
setTimeout(() => console.log(6), 0);
2) 讲一下什么是 prototype
3) 手写编程题：
实现一个累加函数，当最后一次调用传入空时，计算所有参数和，类似下面：
const x = sum(1);
sum(1,2)(3,4,5)(6)();




(五十)
1) js的数据类型
2) 一道编程题，封装类型判断函数，，，我没做好，问我还有一些别的方法吗？说一下思路，我反应过来prototype.tostring(),,,,,,真的想暴捶自己一顿
js的一些方法




(五十一)
1) js基础类型
2) ==的隐式转换 
3) 两道编程题 
// getSum([1, '2', [3, [4, 5]]])
// => 13
function getSum(arr) {
}
4) 给定无序、不重复的数组 data，取出 n 个数，使其相加和为 sum
```js function getResult(data, n, sum) { } ```
(算法)
5) this
6) 闭包 
7) 变量提升




(五十二)
1) Es6新特性（说一个问一个，问得很深，基本都问了。。）




(五十三)
1) 先问我JavaScript作用域
2) ，var，let，const等，反正我就跟他说了作用域链，比较后悔的是没有把闭包说出来
3) 然后问我JS异步的东西吧，反正我说了宏任务，微任务啥的




(五十四)
1) /**第一题
    * 说明：获取一个数字数组中的最大值
    * 示例：
    * 输入：[1, 5, 3, 9, 2, 7]
    * 输出：9
    */
2) 第二题
// sum(0.1, 0.2) === 0.3
function sum(a, b){
  
}
3) /**第三题
      * 提取子集
      * 说明：实现一个方法，可以将数组项中的children提取到数组项同级。
      * 示例：
      *   var list = [{name: 'a', children: [{name: 'b'}, {name: 'c'}]}, { name: 'd'}];
      *   extract(list);  // 返回 [{name: 'a'}, {name: 'b'}, {name: 'c'}, {name: 'd'}]
      *   var list = [{name: 'a', children: [{name: 'b'}]}, { children: [{ name: 'c'}] }];
      *   extract(list);  // 返回 [{name: 'a'}, {name: 'b'}, {name: 'c'}]
      */
4) 变量提升
5) Promise



(五十五)
1) 然后问了点ES6  promise是怎么实现的。。。。




(五十六)
1) Js函数async await
2) script标签属性
3) es6 变量声明 与es5有什么区别，如果直接用一个变量a，相当于用什么声明（var）
4) promise，generator
5) 自己用过什么跨域方法
6) bind, apply, call异同
7) 浏览器渲染




(五十七)
1) JavaScript和ECMA关系
2) 定时器setTimeout setInterval requestAnimationFrame   区别 哪个更好 用setTimeout去实现setInterval有什么缺陷
3) 了解哪些前端新技术




(五十八)
1) 说一下js继承有哪几种，然后分别说一下具体实现以及原理




(五十九)
1) 常见设计模式及其应用场景？
2) 原型链？
3) 闭包？应用场景？
4) Es6的新特性？
5) Js数据类型，堆和栈的区别？
6) Symbol？作用？
7) 闭包原理？适用场景？
8) Es6有哪些了解？




(六十)
1) js面向对象的理解
2) 常用的设计模式，写出来
3) 封装一个函数判断数据类型，数组还是对象
4) 事件代理，常规做法的优势体现在哪里




(六十一)
1) 作用域
2) 闭包 向上级作用域查找是 定义时查找 还是执行时查找？
3) 定时器
4) 箭头函数 普通函数区别
5) var let 变量提升
5) 匿名函数
6) Promise.resolve().then
7) 异步
8) 深浅拷贝
9) 构造函数 普通函数 return的结果
10) this指向
11) typeof  instanseof  Array.isArray 数组判断方法
12) prototype  _proto_
13) function Person() {}
p1 = new Person()
怎么让p1 instanceof Array == true (Person.prototype = Array?)
如果只让p1成立 其他实例对象都不成立呢？？？
又问了原型… Person有没有_proto_??
就记住这些…



(六十二)
1) 闭包、
2) 作用域链
3) ==和===的区别
4) JS 继承（ES6 extends、ES5 各种继承）
5) 怎么判断参数是数组还是对象？（Array.isArray、toString、instanceOf）




(六十三)
1) JS 怎么对象的属性是数组还是对象（参考一面第 8 问），解释下每个方法怎么判断（数组 Object.prototype.toString.call之后是[object, Array]，对象toString之后是[object, object]，instanceOf就是返回true还是false）
2) JS 继承（ES6 extends、原型链、构造），解释下原型链和构造哪个好，好在哪里，
3) 原型链继承的时候，可不可以直接A.prototype = B，而不是A.prototype = new B()，为什么（这个可以看我的博文，有分析：https://blog.he110.info/article/detail/0）
4) 构造继承为什么用call，而不是apply？（参数不同，一个数组，一个不定参数），追问哪个参数是数组？（apply）
5) 实现一个数组去重（Array.from(new Set(arr))），不用 ES6 实现一个对所有数组有可以调用的去重（for indexOf，添加到Array.prototype），面试官说indexOf效率偏低。




(六十四)
1) async await讲一下
2) 了解es6吗 promise原理




(六十五)
1) js类型，封装一个类型鉴定函数
2) 闭包，平时在哪用到？  立即执行函数解决闭包中访问变量的问题
3) 事件轮训机制
4) 原生js实现bind函数
5) 一个函数，然后让你说他们的值是多少，为什么，预编译，
6) 严格模式，
7) 作用域链
8) 浏览器渲染原理
9) 实现一个构造函数 new的时候每次加一




(六十六)
1) js作用域怎么来的？（后来问tx大佬。说估计是想问我作用域链方面的东西。但是我当时理解成问我v8怎么实现作用域。。。没答上，有点可惜）
2) 说一说this。
3) 追问。浏览器解析过程
4) 最后问了俩智力题。（大概是因为我第一个没答上来。。。才问了第二个。）
1.ab两个火车相向而行，一只小鸟在他们中间，往a飞，遇到a之后折返往b飞，一直反复，问两火车相撞的时候小鸟飞了多远
5) 2.一个三升的杯子和一个五升的杯子怎么装4升的水




(六十七)
1) 长轮询
2) 类数组变成数组
3) let和var的区别
4) 重绘和重排，什么操作会造成重排
5) LESS怎么遍历一个列表
6) await语法




(六十八)
1) 一串列表 点击后打印出指定序列
2) N个阶梯，走1步或者2步 有多少种走法 // 算法
3) 小明有2^k  的硬币 比如 11224488。。问 输入为n 有多少种硬币使用方法
4) js基本数据类型
5) 数字 字符串之间转换方法
6) 事件流机制 （事件捕捉 目标 冒泡）
7) 操作DOM 动态创建元素
8) 注册事件 第三个参数 含义
9) event两个属性 target 和？分别代表什么 事件委托（给父元素绑定 执行过程）
10) 继承（说了es6的 super 顺带扯了静态成员 实例成员）
11) this指向
12) apply call bind
13) 箭头函数




(六十九)
1) 问：对es6有了解么？
es6有哪些新特性？
可以讲一下promise吗？
可以说一下generator吗？
答：了解一点，箭头函数balabala;
es6新特性 let const for...in...
promise确实了解过，但仅限于了解，清楚其在ajax中的应用，但具体实现不知道。回答了一个ajax中应用的例子，promise.then()
generator是异步实现的一种方式;

.我看你简历对代码规范有了解，有什么规范是你觉得很重要的？
接口规范
你们的项目是如何确定接口规范的？
restful api balabala
如何约束错误？
通过code，msg，data来传输接口结果 
前端呢？
比如let，箭头函数。。。。。
那么，为什么使用let而不是const，var呢？
var会造成变量污染，而let是块级作用域，至于不用const是因为开销大（这部分答错了，面完补         充了句会造成对象冻结




(七十)
4.说一下闭包及其用途和不好的地方
5.说一下js中this指向有几种，并且如何解决this指向混乱问题(答案是箭头函数)
7.给你一个排好序的数组，如何打乱？你有几种方法，还有没有最优的解法？
8.给你一个长度为N的排好序的数组，要求给出数组元素之和为M的情况，例如长度为10的数组，数组元素为[1,2,3,4,5,6,7,8,9,10],要求给出数组元素之和为11的情况，如[1,10],[1,2,9],[1,3,4,6]
1.说一下js面向对象和原型，我说完以后，他继续问我为什么构造函数种存储属性，原型对象中存储方法
2.了解闭包吗？说一下闭包
3.了解es6吗？说一下es6新增的字符串方法
4.说一下es6中promise及其实现原理（我说用我会，原理不懂）
6.给我在笔记本上出了几个题，让我说结果，问的是this指向问题，这种题目建议大家不要按正常套路走，一般都不会让你输出正常结果
3.闭包
4.面向对象和继承
8.数组去重的方法(ES5,ES6)
面试:
1.讨论数组去重的细节(比如空对象和空数组不相等,不能去除)
2.跳台阶和变态跳台阶（一共N阶台阶,每次只能跳1阶或2阶,问一共有多少种跳法）
3.问我博客中括号匹配符的正确性的解题思路
4.var arr=[1,2,3]  arr1=arr arr1.push[4]  问arr是多少
6.深拷贝和浅拷贝的区别




(七十一)
5. 数组去重。针对'3'和3之类的数据的区分（Object.prototype.toString.call）
7. 箭头函数（为什么不能做构造函数，我说是因为箭头函数没有This，面试官说不对，后来说是没有原型？他说好像是对了。具体我也还没试-0-。有兴趣的可以试试。。）
8. let和Const的区别（只说了一个可更改不可更改，然后问我为啥const obj = {}可以更改，我说obj给的是个指针不是值类型巴拉巴拉的，其他的没答上来）
9. promise底层实现（叫我原生实现promise，大概说了下，链式调用的话类似jq的返回自身，但是因为promise是有状态的，所以返回的时候得根据resolve之后的是个promise还是值去判断返回的结果是自身还是值。）




(七十二)
懒加载？
如何异步？
https://uploadfiles.nowcoder.com/images/20190316/9646319_1552737686700_908AEC8371A9F8E678FB89AB93BB415A




(七十三)
https://uploadfiles.nowcoder.com/images/20190315/787851370_1552658029835_E9CBD4347FB3689D12EB1E7175BE7AD6




(七十四)
https://uploadfiles.nowcoder.com/images/20190315/9646319_1552656224755_F6AC3479C944B1EA9C8EB099265E3926




(七十五)
https://uploadfiles.nowcoder.com/images/20190315/9646319_1552656224755_F6AC3479C944B1EA9C8EB099265E3926





(七十六)
第一个问题: 对JavaScript和Java两者的怎么看？
第二个问题：闭包怎么理解 闭包中的this 简单吧
第三个问题：说下对JS的函数的理解




(七十七)
1) 实现一个类可以完成事件 on, once, trigger, off
关键词：订阅-发布模式
详见：https://github.com/lawler61/blog/issues/1
2) 发布新闻时需要提醒发布的时间。写一个函数，传递一个参数为时间戳，完成时间的格式化。如果发布一分钟内，输出：刚刚；n 分钟前发布，输出：n分钟前；超过一个小时，输出：n小时前；超过一天，输出：n天前；但超过一个星期，输出发布的准确时间
详见：https://github.com/lawler61/blog/issues/2
格式化数字。输入：12345，输出：12,234；输入：2345.6789，输出：2,345.6789。要求：使用正则和非正则两种方式实现
详见：https://github.com/lawler61/blog/issues/3
给一段文本，将文本数组化，示例如下：
asd ehe  rjr
d  erregrnt eruk
rth sthst ar   gae

// 输出
[asd, ehe, rjr]
[d, erregrnt, eruk]
[rth, sthst, ar, gae]

下面代码执行顺序，并解释

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
  }

  async function async2() {
    console.log('async2');
  }

  console.log('script start');

  setTimeout(function () {
    console.log('setTimeout');
  }, 0);

  async1();

  new Promise(function (resolve) {
    console.log('promise1');
    resolve();
  }).then(function () {
    console.log('promise2');
  });

  console.log('script end');
  实现函数能够深度克隆 js 各种数据类型。附加题：实现对象中嵌套数组，数组中嵌套对象
详见：https://github.com/lawler61/blog/issues/4
讲讲订阅-发布模式，有几种实现方式
关键词：listener、Object.defineProperty

事件流

事件是如何实现的

关键词：订阅-发布模式

class Observer {
    $on() {}

    $emit() {}
  }

  const data = new Observer({ a: 1 });
  console.log(data.a); // 输入: 1
  data.$on("a", (newValue, oldValue) => {
    console.log(newValue, oldValue);
  });
  data.a = 2; // 输入: 2 1
详见：https://github.com/lawler61/blog/issues/5

new 一个构造函数发生了什么
关键词：除了那 4 步，还可以从 EC，AO，VO 对象上说
new 一个构造函数，如果构造函数返回 return {}、return null，会出现什么情况
关键词：还可以试试 return 1; return true; 会出现什么情况
来写写代码
顺序发送 4 个请求 a，b，c，d，要求按照顺序输出，即如果先返回 b，则不输出，再返回 a，输出 a，b
详见：https://github.com/lawler61/blog/issues/6
V8 内存回收机制
关键词：老生代，新生代。引用计数、标记清理
generator, yield。附加题：co 模块如何实现
关键词：线程让权，状态机
讲讲 promise
关键词：promise A+

防抖和节流
作者：Thescavenger
链接：https://www.nowcoder.com/discuss/163165?type=2&order=3&pos=103&page=2
来源：牛客网

用 promise 实现一个请求超时功能

关键词：promise.then 与 setTimeout 并行

详见：https://github.com/lawler61/blog/issues/7




(七十八)
回流与重绘。
如何判断数组与对象，追问除了Array.isArray、instanceof之外，答prototype.constructor
js基础数据类型  
如何判断一个变量是array还是object
事件代理

看你们蛮关注腾讯编程题的，也写一下吧
1.格式化金钱，每千分位加逗号，需要注意的是：const target = '123456789' ，然后通过target.format()这样子调用
2.数组去重，两行代码就完事了
1
2
const set = new Set(arr);
return Array.from(set);
3.继承，es5 跟 es6写法
4.给定一个数组，返回所有的数字，如： [1,'3',false,null,100] ===> [1, 3, 100]
return arr.map((val) => {
    if (!isNaN(val.toString())) {
        return val;
    }
})
5.实现一个函数，返回参数的数据类型（主要是考察判断数组跟对象，分别写了instanceof 跟 isArray两种实现）
6.实现函数
f(1).val = 1
f(1)(2).val = 3
f(1)(2)(3).val = 6
f(10)(100)(1000)(10000).val = 11110
实现这样的函数，要求调用深度不限，即可以f(10)(1000)(1)(2)/*中间可能无数个*/(剩)(余)(的)

function f (val) {
    function inner (innerVal) {
        return f(val + innerVal);
    }
    inner.val = val;
    return inner;
}




5.event Loop执行机制与js单线程
6.深拷贝
7.回流与重绘
9.虚拟DOM




3.说一下闭包的应用场景。
作者：_安辰
链接：https://www.nowcoder.com/discuss/162726?type=2&order=3&pos=106&page=1
来源：牛客网

10.现场手写代码，补充完整queue函数：
function f1(cb) {
setTimeout(function () {
console.log('1')
cb();
},300)
}
function f2(cb) {
setTimeout(function () {
console.log('2')
cb();
},500)
}
function f3(cb) {
setTimeout(function () {
console.log('3')
cb();
},100)
}
function queue (list, count) {

}
queue([f1,f2,f3],2) //2 1 3




1.如何用js实现两个非常大的数相加（20分钟）
做完后面试官说等通知




1.js闭包




ES6/ES7
性能优化
解决异步回调各种实现方案



- requestAnimationFrame()的使用场景







声明式编程 & 指令式编程？
- 介绍闭包。
- 举一个闭包在实际开发中的使用例子
- let/const 与var的区别
- ES6用过哪些特性？
- 程序判断题（2道）：变量提升，说出运行结果
- 编程题(限时10分钟)：按要求输出指定格式的'扁平化'数组.(input: [1, [2, 3]], output:'[ 1 [ 2 3 ] ]');
20个人，至少两人生日相同的概率，用编程的方法解决。
- 编程题，实现一个函数,输入:任务列表和单次处理的任务数;输出：按指定顺序的输出结果。
- 有什么要问我的吗？





list的无限滚动---节流
作者：敲起锣打起鼓
链接：https://www.nowcoder.com/discuss/162081?type=2&order=3&pos=112&page=1
来源：牛客网

重绘和重排
js1
function a() {this.b = 3}
var c = new a();
a.prototype.b = 9;
var b = 7;
a()
console.log(b)
console.log(c.b)
17.js2
setTimeout(()=>{
setTimeout(() => {
console.log('console1');
}, 0)
console.log('console2');
setTimeout(() => {
console.log('console3');
}, 200)
})
setTimeout(() => {
console.log('console4');
}, 200);
console.log('console5')
18.算法题
给定一个字符串如下，请统计字符串中出现最多的字母和次数
算法：数组中map和reduce，如何用reduce实现map
算法：打平数组和规定深度的打平数组





作者：var_dump(＇方木＇)🐬
链接：https://www.nowcoder.com/discuss/161630?type=2&order=3&pos=115&page=1
来源：牛客网

1.js基本数据类型

2.用了一个函数考了js的作用域

3.文了如何判断一个数组是数组，我答了（instanceof Array.isArray() 和用原型链）

4.BOM 和 DOM的区别

5.有一个 字符串里面有很多is 请写一个方法只保留一个is                                                                            //楼主很菜，没答上
作者：var_dump(＇方木＇)🐬
链接：https://www.nowcoder.com/discuss/161630?type=2&order=3&pos=115&page=1
来源：牛客网

8.js 的event-loop

9.有3个-10--10之间的整数，写一个方法这三个数一共有多少可能想加等于10，如（8，2，0）算一个      //答的不是很好，面试管问我如何优化，直接说了不会
作者：var_dump(＇方木＇)🐬
链接：https://www.nowcoder.com/discuss/161630?type=2&order=3&pos=115&page=1
来源：牛客网

12.说一下思路，如何把一个图片的地址，传到服务器，并保存在服务器 ，

13.用js中的正则表达式去掉两边的空格                                                                                                         //没答上





回流和重绘（老问题了有没有）
如果页面卡顿你会怎么解决？




 修改this的方法，apply和call区别
9 闭包
10 原型链
11 事件冒泡与捕获
 es6 class怎么用es5实现
 promise原理怎么实现
  浏览器渲染 ，css、js会阻塞dom树加载吗
  前端怎么实现富文本编辑器
  怎样判断Object和Array，Object有父对象么






js中的类数组
.能不能改写一个数组的push方法，不是重写，也不是新写，保持原来的逻辑之外，再添加一个consle.log（arguements）在控制台打印出来，比如pushA。在工作台把A打印出来，push什么就打印什么。原来的逻辑不能改？





作者：wadsywadsy
链接：https://www.nowcoder.com/discuss/161115?type=2&order=3&pos=120&page=1
来源：牛客网

就是问我项目里，页面一打开，图片的懒加载是什么做到的？我懵逼了，说实话我讲不清楚，也忘了，就说了个根据当前窗口高度来判断是否需要加载下面的图片，然后面试官问我，第一，如果获取当前窗口高度？第二，如何获取什么元素高度，第二个没听太清楚，反正我思考了不到五秒钟，面试官就说，额没事，今天时间也差不多了，最后什么问题想问我的吗？然后我说我有什么需要补的呗这些套话，反正我感觉GG了，各位小伙伴们！加油啊！！





前端方面问了js的类，类的继承，如何通过原型链继承，this




https://uploadfiles.nowcoder.com/images/20190309/760220_1552139818228_E46DA86AEE655778636D48205E8D25B2




项目中用过哪些es6的东西？
手写promise处理继发请求
改为async await再写一次
es6中的箭头函数与匿名函数的区别？
2道考js作用域的题
var b = 3
var a = function(){
    console.log(b)
}
var c= function(){
var b = 2;
a();
}
c();
问输出，还有一道考声明提升，记不太清楚。
然后问什么是原型链？
最后出了道智商题
一个国王有500瓶酒，有一瓶有毒，人喝了一天后中毒死，问2天内最少需要多少人来验毒才能检测出毒酒
第一次面试很紧张，总共面了1个小时左右，感觉计算机网络基础还要加强，还需要继续努力




原型链
继承的方法
作用域


0. 简单介绍了项目，问了promise。
1. 有一个数组，对这个数组按顺序进行异步处理，一个处理完才开始下一个，然后问用foreach行不行。
从海量十亿个数选最大的一百个，你有什么方法？




js一共几种基本类型
垃圾回收机制是怎么样

10.js闭包
一个5升瓶子和一个6升瓶子怎么装3升水
.为什么js是单线程？怎么解决




箭头函数
4.async await
8.let和var
作者：等一个offercall
11.求一个数组里面的最大数
12.求一个数组里的和
13.1000条数据，每个数据有个字段价格，求价格总和  sql
14.1000条数据，每个数据有个字段价格和种类，求每个种类的总价格和
15.get和post区别





就提了一句JS怎么实现继承



.以逗号隔开的字母，怎么排序输出






7.闭包
8.document.ready和onload
9.函数表达式和函数声明以及IIFE
12.如何判断数组
13.js基础类型



事件模型
冒泡？如何冒泡
对象是怎么来的
类有继承吗，如何实现
如何定义私有字段
闭包 什么是闭包？一般是怎样的形式
5.35分时针分针夹角几度
加qq,远程桌面控制，写两道代码
1.实现一个input输入框，实现在一个arr数组查询命中和自动补齐效果
2.实现一个函数，完成超过范围的两个大整数相加功能





30道选择题，2道简答题
选择题涵盖了 ES6，模块化，网安，http，css盒模型，数据库删库语句……（记忆力不行，只记得涵盖的面很广）
简答题1，怎么做移动端web的真机调试和性能分析
简答题2，用js实现登录模块逻辑，包括用户名输入，密码输入，提交登录










原生js熟悉吗？apply和call的区别？
5、事件委托？



5.正则表达式




js中数组增添、删除的方法；
有哪些继承方法；
原型；
闭包及闭包的优缺点；
垃圾收集；
正则表达式 数字怎么表示比如5~10；





https://segmentfault.com/a/1190000018406383




一道程序题
var a = {x:1}
var b = a;
a = a.x = {x:1}
console.log(a);   // {x:1}
console.log(b);   // {x:{x:1}}
如何判断一个对象是不是空对象？
0.1+0.2 == 0.3？原因？









3.讲讲原型；
4.多个<li>点击弹出相应数字；
5.字符串比对；
6.匹配到某字符串相应的字符标红；
8.var let 和 const；
8.var let 和 const；





介绍JS闭包
- JS如何改变函数上下文
- bind/call/apply有什么区别？
- bind调用时传入一个参数，此参数跟函数原有的参数什么关系？
如何检测浏览器所支持的最小字体大小？
- 怎么做JS代码Error统计？








- 数组去重怎么做？你能想到的方法都说说。






闭包

闭包的作用

垃圾回收

作用域链

哪些会被清除哪些不会被清除
settimeout

event loop

微任务宏任务

原型和原型链

继承






70分钟岗位选做题，选择自己的方向，前端两道简答，一道编程；

简答第一题代码改错，用闭包+settimeout正确输出数组；

第二题写一个CSS实现等待界面，主要用到了内外边距，水平居中，字体大小和颜色，很简单；

编程题是用JS写一个实现抽奖功能的函数，一共有55个人，抽取15个人获得车位，要求先产生一个随机数然后再递增产生（没搞懂，第一次直接生成55不就报错了吗，直接产生15个然后用冒泡排了一遍数组；
性格测试100题






https://www.nowcoder.com/discuss/157523?type=2&order=3&pos=146&page=1







es6与es5的对比
--let、const和var的对比，提到了块级作用域，用for循环举例，引申到了回收机制，let定义的for循环中的i每循环一次就会被回收，因此避免了以前es5在for循环中定义变量会全局污染的问题
--箭头函数的特点，语法简单，this永远指向被定义时的环境，es5的时候通常则是指向最近一次调用方法的环境。引申到了call和apply的区别，作用相同，call传的是具体参数，apply则可以接受一个数组，又问了下call和apply具体的用法
--promise对象，有几个状态？三个状态，pending初始状态，fulfilled操作成功完成，rejected操作失败。举例说明promise的用法，还问了有哪些方法会返回promise对象，promise的所有方法应该都会返回promise对象？还有fetch方法也会返回promise对象
继承的实现，举例a调用b的方法怎么实现
知道assign方法吗
slice方法和splice方法的区别，说一下具体参数
柯里化函数，了解高阶函数吗
还问了事件流
性能优化，具体问了首屏优化，图片预加载



0.1+0.2===0.3吗，为什么？
Promise原理
console.log(1)
new Promise((resolve)=>{
    resolve();
    console.log(2)
}).then(()=>{
    console.log(3) 
})
setTimeOut(function()=>{
    console.log(4)
},0)
console.log(5)
回流与重绘，如何避免回流
js脚本加载问题，async、defer问题
设计模式，有哪些设计模式




1.js中的数据类型
2.Symbol的应用场景
3.js中如何实现继承，ES5和ES6中的区别
4.什么是闭包，如何实现闭包
5.virtual DOM的原理




 JSON.parse()大数据阻塞如何处理
  怎么配置样式的按需加载？
 如何做JS的按需加载？
15. let/const
16. 介绍Promise
17. 解释浏览器端JavaScript的事件循环
18. 介绍async/await
19. 介绍闭包
20. 介绍事件委托



js实现继承
实现bind
给一段代码判断执行顺序
// 判断下面输出顺序
console.log('begin');
setTimeout(() => {
    console.log('setTimeout 1');
    Promise.resolve()
        .then(() => {
            console.log('promise 1');
            setTimeout(() => {
                console.log('setTimeout2');
            });
        })
        .then(() => {
            console.log('promise 2');
        });
    new Promise(resolve => {
        console.log('a');
        resolve();
    }).then(() => {
        console.log('b');
    });
}, 0);
console.log('end');
给出代码判断this指向
let a = {b: function() { console.log(this) }, c: () => {console.log(this)}}

a.b()
a.c()

let d = a.b
d()
html文件解析过程，浏览器的重排，重绘
浏览器的渲染机制，为什么使用Virtual DOM，直接操作DOM的弊端是什么？
补全下面代码
function repeat(func, times, wait) {
    
}
// 输入
const repeatFunc = repeat(alert, 4, 3000);
// 输出
// 会alert4次 helloworld, 每次间隔3秒
repeatFunc('hellworld');
// 会alert4次 worldhellp, 每次间隔3秒
repeatFunc('worldhello')
https://www.nowcoder.com/discuss/155934?type=2&order=3&pos=151&page=1



防抖和节流的场景
6、判断数组的多种方法
声明变量的方法




写出下面代码运行结果，并回答相关问题。
async function async1() {
console.log('async1 start');
await async2();
console.log('async1 end');
}
async function async2() {
console.log('async2');
}
console.log('script start');
setTimeout(function() {
console.log('setTimeout');
}, 0);
async1();
new Promise(function(resolve) {
console.log('promise1');
resolve();
}).then(function() {
console.log('promise2');
}); 
console.log('script end');
从给定的无序、不重复的数组data中，取出n个数，使其相加和为sum。并给出算法的时间/空间复杂度 。(不需要找到所有的解，找到一个解即可)
项目后台数据哪里来，怎么实现登录注册的，px转rem有什么好的方案，做项目过程中遇到哪些问题，怎么解决。




输入一个整型数组，求出子数组和的最大值，并给出算法的时间复杂度。
[1, 0, -2, 4, 9, 10, 3]
findMax([1, 0, -2, 4, 9, 10, 3])
节流
事件模型，触发顺序
闭包解释，写代码演示