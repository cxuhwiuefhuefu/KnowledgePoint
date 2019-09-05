                           (一)
1)
display: none;visibility: hidden;opacity:0;均用于隐藏元素。
三者的区别：
1. display：none; 让元素消失, 脱离文档流 会引起浏览器的重排重绘
2. visibility: hidden; 让元素隐藏, 还在文档流中, 占用空间, 相当于透明化了 会引起浏览器的重绘但不会引起重排
3. opacity:0 透明度为0，即完全透明, 还在文档流中, 占用空间. 与visibility: hidden的区别是opacity可设置不同程度的透明度 会引起浏览器的重绘不会引起浏览器的重排
4. position: absolute; left: -1000px; top: -1000px; 脱离文档流 引起浏览器的重排和重绘



                        (二)
1)
w3c的标准盒模型，一个盒子的大小是width+padding+border，width是内容区，即width不包含padding和border。
而IE6混杂模式的盒模型，一个盒子的大小是width-padding-border，即width包含padding和border。
2)
(http://www.runoob.com/w3cnote/flex-grammar.html)
 .wrapper{
    display: flex;
    align-items: center;
    width: 200px;
    height: 200px;
    background: red;
}
.box1{
    flex-grow: 1;
    height: 50px;
    background: yellow;
}
.box2{
    flex-grow: 1;
    height: 50px;
    background: green;
}
<div class="wrapper">
    <div class="box1">1</div>
    <div class="box2">2</div>
</div>




          (三)
1)
absolute 绝对定位 脱离原来的位置进行定位 相对于自身最近的父级进行定位
relative: 相对定位 保留原来的位置进行定位 参考元素本身 用于设置参照物
static: 默认属性 元素默认定位是static
fixed: 可视窗口进行定位 网页上应用的广告栏
sticky: 是一个新的css3属性 它的表现类似于position:relative和position:fixed的合体 在目标区域屏幕中可见时 它的表现行为就像position:relative 而当页面滚动超出目标区域时 它的表现就像position:fixed 它会固定在目标位置 淘宝的侧边栏
inherit: 继承父级的定位
2)
/1.知道父级大小
    {
        left:50%;
        top:50%;
        margin-left:-父级元素一半的大小;
        margin-top:-父级元素一半的大小;
    }
    优点: 兼容性好  支持所有浏览器
    缺点: 子级定宽高 

/ 2.不知道宽高  transform:translateX(-50%)translateY (-50%);
     优点: 适合移动端
     缺点: IE9+以及其他现代浏览器才支持 IE9之前的版本都不支持 在IE8模式下不居中
    

/ 3.flex 布局 ：在父级上
        position:absolute;
        display:flex;
        justify-content:center;//水平
        aligin-items:center;//竖直
    优点: 父级和子级不用定宽高
    缺点: 不支持IE10以下的浏览器

/ 4.行内元素水平居中 ： text-align: center; line-height=height
/ 5.定宽高 父级定宽高 子级一个绝对定位 
        子集里面 left:0 right:0 bottom:0 top:0 margin:0
        定宽 用margin：auto；
    优点: 兼容性好 支持IE8以上
          支持百分比定宽高
    缺点: 父级必须声明高度
                 

3)??????????????????

4)???????????????




    (四)
1)    (二)(1)
2)    (三)(2)
3)
display: block 块级元素: 占满整行 可以改变宽高 <div/><form/><address/><hr/><h1/>
display: inline 行级(内联)元素: 不占满整行 不可以改变宽高<a/><br/><em/><span/>
display: inline-block 行级(内联)块元素: 可以改变宽高 也不独占整行<img/><input/>




        (五)
(1)
原理是用border实现 每个方向的border都是一个三角形 通过调整border的大小和颜色就能实现
.box{
    width: 0px;
    height: 0px;
    border: 100px solid transparent;
    border-bottom: 100px solid red;
}
2)
8种布局
https://juejin.im/post/5cf5e1266fb9a07ee06302cb

<!-- float浮动 -->
.left{
    float: left;
    width: 100px;
    height: 100px;
    background: red;
}
.right{
    float: right;
    width: 100px;
    height: 100px;
    background: red;
}
.middle{
    margin-left: 100px;
    margin-right: 100px;
    height: 100px;
    background: green;
}
<!-- poaition:absolute -->
.left{
    position: absolute;
    left: 0;
    width: 100px;
    height: 100px;
    background: red;
}
.right{
    position: absolute;
    right: 0;
    width: 100px;
    height: 100px;
    background: red;
}
.middle{
    margin-left: 100px;
    margin-right: 100px;
    height: 100px;
    background: green;
}
/* body外面有默认的8px */
<div class="left"></div>
<div class="right"></div>
<div class="middle"></div>
<!-- flex布局 -->
body{
    display: flex;
}
.left{
    width: 100px;
    height: 100px;
    background: red;
}
.middle{
    flex-grow: 1;
    height: 100px;
    background: green;
}
.right{
    width: 100px;
    height: 100px;
    background: red;
}
<div class="left"></div>
<div class="middle"></div>
<div class="right"></div>
3)
web语义化: 通过HTML标记表示页面所包含的信息 包括HTML标签的语义化和CSS命名的语义化
HTML标签的语义化: 通过使用包含标签语义的标签 如h1-h6丶strong 来恰当的表示文档的结构
CSS语义化: 为html标签添加有意义的idd和class名 补充未表达的含义

为什么需要语义化
1. 去掉样式后页面呈现清晰的结构
2. 搜索引擎更好的理解页面  有利于收录
3. 使团队的项目可以持续的运作和维护
4. 方便其他设备解析（如移动设备、盲人阅读器等）
4)   (二)(1)
IE盒模型的缺陷
根据W3C规定当任意一个块级元素的宽度或高度被显式指定，它应当只确定这个可见元素自身的宽度或高度，而padding, border和margin随后被应用。Internet Explorer在“怪异模式”（怪异模式）则把内容，内边距（padding）和边框（border）全部包括在一个指定的宽度或高度之内；这导致它呈现出一个比遵从标准行为的结果更窄或者更短的盒子。




      (六)
1)
animation 这个属性b必须配合@keyframes动画关键帧来使用 keyframes里面包含一个百分数 后面跟上在这段时间内变换的css样式 animation是一个复合属性 它包括以下几个组成部分
     1. animation-name: 执行动画的keyframes的名字
     2. animation-duration: 执行动画的总时长
     3. animation-timing-function: 指定过渡函数
     4. animation-delay: 执行延迟时间
     5. animation-direction: 动画播放的方式 这个属性的值主要有 normal正常播放模式 reverse倒序播放 alternate动画在奇数次正向播放偶数次倒叙播放 alternate-reverse在奇数次倒叙播放偶数次正向播放
     6. animation-iteration-count: 动画执行的次数 infinite是无数次 写一个数字就是要执行几次
     7.animation-fill-mode  执行动画后问题停止的位置 forward是停止结束的位置上 backwards是快速执行初始帧(这个最好配合延迟来观察) none回到初始帧的位置 both是同时具有forwards和backwards的效果
     8. animation-play-state: 控制动画的播放状态 running是播放 paused是暂停
2)
<!-- 单行文本溢出 -->
p{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    white-space: nowrap;  /* 规定段落中的文本是不进行换行 */
    overflow: hidden; /* 溢出部分隐藏 */
    text-overflow: ellipsis; /* 当文本溢出包含它的元素 应该发生什么   ellipsis: 显示省略号来代表被剪切的文本 */
}
<p>1111111111111111111111111111111111111111</p>
<!-- 多行文本溢出 -->
前端工程师把容器的宽度算好 把每一个字的宽度算好 把这两个值传到后台去让后台去算 你觉得多少个字溢出 你估量一下到快溢出那个字的时候把它换点点 把文本传给我 但是估算的时候会出现不准确的情况 因为有的汉字是那么宽 有的字符是那么窄  它会不准确 数字和汉字不一样宽 所以它估算的时候不准确 打点的位置不一致 算不准确 宁可少也不要多 人工写的 在PC不拿技术实现 这个技术只针对移动端 因为移动端浏览器都是08年后的浏览器 都最新的浏览器 百度为什么不拿多行打点来实现 因为你PC端浏览器有老版本的 什么IE8 老版本浏览器对这个支持的情况不怎么好 但是新版本都支持哪些技术 在PC多行溢出部分截断就可以了不做打点 怎么控制行的高用line-height ==》(line-height overflow:hidden)
?????????????????????????????????????????????????
3)
4)
1. 慎重选择高消耗的样式 因为高消耗属性在绘制前需要浏览器进行大量计算
    box-shadows
    border-radius
    transform
2. 避免过分重排 因为当发生重排的时候时候 浏览器需要重新计算布局的位置与大小 
    常见重排元素
    width
    height
    padding
    margin
    display
    border-width
    position
    float
    。。。
3. 正确使用display属性 因为display属性会影响页面渲染
    diaplay:inline后不应该再使用width/height/margin/padding/float
    display: inline-block后不应该使用float
    display:block;后不应该使用dispaly:verticle-align
5. 不滥用float 因为float是渲染时计算量比较大 尽量减少使用
6. 动画性能优化 
   动画的实现原理 是利用了人眼的"视觉暂停"现象 在短时间内连续播放数幅静止的画面 使肉眼因视觉残象产生错觉 而误以为画面在动
   动画的基本概念
   帧: 在动画过程中 每一幅静止画面即为一"帧"
   帧频: 即每秒中播放的静止画面的数量 单位是fps(frame per second)
   帧时长: 即每一幅静止画面的停留时间 单位一般是ms(毫秒)
   跳帧(掉帧/丢帧): 在帧频固定的动画中 某一帧的时长远高于平均帧时长 导致其后续数帧被挤压而丢失的现象

   一般浏览器的渲染刷新帧频是60fps 所以在网页当中 帧频如果达到50-60fps的动画将会相当流畅 让人感到舒畅

   如果使用基于JavaScript的动画 尽量使用 requestAimationFrame 避     免使用setTimeout/setInterval
   避免通过类似jQuery animation()style改变帧频的样式 使用CSS声明      动画会得到更好的浏览器优化
    使用translate取代absolute定位就会得到更好的fps 动画会更流畅
7. 多利用硬件能力 如通过3D变形加速开启GPU加速    
8. 提高CSS选择器性能 因为CSS选择器对性能的影响源于浏览器匹配选择器和文档元素时所消耗的时间 所以优化选择器的原则是应尽量避免使用消耗更多的匹配时间的选择器 CSS选择器是从右往左进行规则匹配的
    避免使用通用选择器
    避免使用标签或class选择器限制id选择器
    避免使用标签限制class选择器
    避免使用多层标签选择器 使用class选择器替换 减少css查找
    避免选择子选择器
    使用继承




     (七)
1)    (三)(2)
2)
*{
    padding: 0;
    margin: 0;
}
.wrapper{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
}
.text{
    float: left;
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.btn{
    width: 50px;
    height: 50px;
    float: right;
}
<div class="wrapper">
    <p class="text">111111111111111111111111111111111111111</p>
    <button class="btn">btn</button>
</div>




     (八)
1)
px像素 是相对单位 是相对显示器屏幕分辨率而言的
em是相对单位 相对于父级的单位 但是进行任何元素设置都有可能需要它的父级了 这很不方便 所以引入了rem
rem是根据根元素html的font-size来设置的 :root{font-size: 16px}


现在使用什么字体主要由你的项目来决定 如果你的用户群都是使用最新版本的浏览器 那么推荐使用rem 如果要考虑兼容性的话 那么就使用px 或者两者同时使用
对于只需要适配少部分的手机设备 且分辨率对页面影响不大的 用px
对于需要适配各种移动设备 使用rem 例如只需要适配iPhone和iPad等分辨率差别挺大的设备

浏览器默认的font-size是多少 16px 
body默认的margin为8px 
2) (五)(3)
3)
<!-- 三列布局 -->
    (五)(2)
 <!-- 两列布局 -->
 /* float */
.left{
    float: left;
    width: 100px;
    height: 100px;
    background: red;
}
.right{
    margin-left: 100px;
    height: 100px;
    background: green;
}
/* position: absolute */
body{
    margin: 0;
}
.left{
    position: absolute;
    left: 0;
    width: 100px;
    height: 100px;
    background: red;
}
.right{
    margin-left: 100px;
    height: 100px;
    background: green;
}
/* flex布局 */
body{
    margin: 0;
    display: flex;
}
.left{
    width: 100px;
    height: 100px;
    background: red;
}
.right{
    flex-grow: 1;
    height: 100px;
    background: green;
}

<div class="left"></div>
<div class="right"></div>
4)   (三)(1)
5)   (二)(1)
6)
box-sizing用来修改CSS盒模型的
content-box: padding和border不计入width之内 标准盒模型
padding-box: padding计入width之内
border-box: border和padding计入width之内 IE盒模型




       (九)
1)
伪类和伪元素的区别: 伪元素是相当于添加一个元素 伪类相当于是在元素上添加样式 这两都不实际存在dom树中 原来格式化文档流之外的东西
伪类则是像真正的类一样发挥作用 没有数量上的限制 只要不是互相排斥的伪类 也可以同时使用在相同的元素上
伪元素:
    :before
    :after
    :first-letter
    :last-latter
    :first-line
伪类
    :first-child
    :last-child
    :hover
    :active
    :focus
    :link
2)  (二)(1) 
3)  (三)(2) ??????????????????????????????????????????
4)  (四)(3)




     (十)
1)????????????????????????????????????????????
2)
以下6个属性设置在容器上
flex-direction: 决定主轴的方向(即项目的排列方向)
     row(默认): 主轴为水平方向 起点在左端
     row-reverse: 主轴为水平方向 起点在右端
     column: 主轴为垂直方向 起点在上沿
     column-reverse: 主轴为垂直方向 起点在下沿
flex-wrap: 默认情况下 项目都排列在一条线上(又称轴线上) 如果一条轴线排不下 如何换行
      nowrap(默认)  不换行
      wrap 换行 第一行在上方
      wrap-reverse 换行 第一行在下方
flex-flow: 是flex-direction和flex-wrap的简写形式 默认值为row nowrap
jusitify-content: 定义项目在主轴上的对齐方式
      flex-start: 左对齐
      flex-end: 右对齐
      center: 居中
      space-between: 两端对齐 项目之间的间隔相等
      space-around: 每个项目两侧之间的间隔相等 所以 项目之间的间隔比项目与边框的间隔大一倍
align-items: 定义项目在交叉轴上如何对齐
      flex-start: 交叉轴的起点对齐
      flex-end: 交叉轴的终点对齐
      center: 交叉轴的中点对齐
      baseline: 项目的第一行文字的基线对齐
      stretch(默认值): 如果项目未设置高度的或设为auto 将沾满整个容器的高度 
align-content: 定义多根轴的对齐方式 如果项目只有一根轴线 该属性不起作用(横向排列flex-direction:row;并且设置换行，flex-wrap:wrap;这样这个属性的设置才会起作用)
      flex-start: 与交叉轴的起点对齐
      flex-end: 与交叉轴的终点对齐
      center: 与交叉轴的中点对齐
      space-between: 与交叉轴两端对齐 轴线之间的间隔平均分布
      space-around: 每根轴线两侧的间隔都相等 所以 轴线之间的间隔比轴线与边框的间隔大一倍           
以下6个属性在项目上
order: 定义项目的排列顺序 数值越小 排列越考前 默认为0
flex-grow: 定义项目的放大比例 默认为0 即如果存在剩余空间 也不放大        
flex-shrink: 定义项目的缩小比例 默认为1 如果空间不足的话 该项目缩小 如果所有的项目的flex-shrink属性都为1 当空间不足时 都将等比例缩小 如果一个项目的flex-shrink属性为0 其他项目为1 则空间不足时 前者不缩小 负值对该属性无效
flex-basis: 定义了在分配多余空间之前 项目占据的主轴空间 浏览器根据这个属性 计算主轴是否有多余空间 它的默认值为auto 即项目本来的大小 它可以设置跟width或height属性一样的值 则项目将占据固定空间
flex: 是flex-grow flex-shrink和flex-basis的简写 默认值为0 1 auto 后两个属性可选 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
align-self: 允许单个项目有与其他项目不一样的对齐方式 可覆盖ailgn-items 默认值为auto 表示继承父元素的align-items属性 如果没有父元素 等同于stretch 该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
3)  (二)(1)   (八)(6)
4)  (四)(3)
5)
 .wrapper{
    width: 400px;
    height: 400px;
    border: 1px solid #000;
}
.img{
    /* width: 100%;
    height: 100%; */
    max-width: 100%;
    max-height: 100%;
}   
<div class="wrapper">
<img class="img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=61231408,2529317088&fm=26&gp=0.jpg" alt="">
</div>

max-width: 100%和width: 100%;的区别在于 max-width是相对img自身的尺寸而言的 意思是图片最大宽度为自身尺寸的宽 在这里就是100px 而width的100%是相对父级宽度的 所以为了不让图片被放到后失真我们可以设置img的最大宽度为自身尺寸大小 通俗来说就是只允许缩小不允许放大img
https://blog.csdn.net/promiseCao/article/details/52313430
6)
7)?????????????????




<!-- 
    行级元素只能嵌套行级元素
    块级元素可以嵌套任何元素

    p标签里面不能套块级元素
    <p>
        <div></div>
    </p>
    这是浏览器内核的处理原则 
 -->




      (十一)
1)
非主体结构标签
header: 定义文档或文档的一部分的页眉
hgroup：被用来对标题元素进行分组 当标题有多个层级(副标题)时 <hgroup>元素被用来对一系列<h1>~<h6>元素进行分组
footer: 定义文档或文档的一部分区域的脚页

主体结构标签
article: 定义的内容必须是有意义的且必须独立于文档的其余部分
section: 定义文档某个区域 比如章节 头部 底部 或者文档的其他区域

2)
监听网络状态
我们可以通过window.navigator.onLine来检测用户当前的网络状态 返回布尔值 这个不能实时的通知
window.addEventListener(online, function)进行绑定online从没有网络到有网络的时候调用
window.addEventListener(offline, function)进行绑定offline从有网络到没网的时候调用

监听地理位置
PC端
window.navigator.geolocation.getCurrentPosition(suc, err, options);
手机端
window.addEventListener('devicemotion', function(e) {  // 当我设备发生就会执行它 呀就会有内容了
    console.log(e);
    item.innerHTML = e.accelerationIncludingGravity.x + '-' + e.accelerationIncludingGravity.y + '-' + e.accelerationIncludingGravity.z;
})

文件读取
？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？

3)
二维动画-animation 这个属性必须配合@keyframe动画关键帧来使用 keyframe里面包含一个百分数 后面跟上这段时间内变换的css的样式 animation是一个符合属性 它包括以下几个组成部分
     animation-name: 执行动画的keyframes的名字
     animation-duration: 执行动画的总时长
     animation-timing-function: 指定过渡函数
     animation-delay: 执行延迟s时间
     animation-direction: 动画播放的方式 这个属性的值主要有: normal正常播放模式 reverse倒叙播放 alternate动画在奇数次正向播放偶数次倒序播放 alternate-reverse动画在奇数次倒叙播放偶数次正向播放
     animation-iteration-count: 动画执行的次数 infinite是无限次 写一个数字就是要执行几次
     animation-fill-mode: 执行完动画后物体停止的位置 forwards是停止在结束的位置上 backwards是快速执行初始帧(这个最好配合延迟来观察)none是回到初始帧的位置 both是同时具有forward和backwards的效果
     animation-play-state: 控制动画的播放状态 running是播放 paused是暂停
4)
html,
body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
.mask{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 2;
}
.close{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    background: green;
    z-index: 3;
}
<a href="#" class="open">打开遮罩层</a>
<div class="mask"></div>
<div class="close"><a href="#">关闭</a></div>
var open = document.getElementsByClassName('open')[0];
var mask = document.getElementsByClassName('mask')[0];
var close = document.getElementsByClassName('close')[0];
open.onclick = function() {
    this.style.display = 'none';
    mask.style.display = 'block';
    close.style.display = 'block';
}
close.onclick = function() {
    mask.style.display = 'none';
    close.style.display = 'none';
    open.style.display = 'block';
}

为什么要用遮罩层?
我们知道在网页中如果需要加载一个弹窗是通常是不希望点击到弹窗以外的区域从而导致错误操作的 这个时候我们就可以使用遮罩层来实现弹窗外部区域屏蔽的功能

遮罩层原理?
在弹窗和网页之间创建一个div并使之铺满整个屏幕 同时让这个div半透明 这样我们就可以即能看到页面的内容 又无法点击到弹窗外的内容了

怎么实现?
js控制display的属性值以及设置遮罩层opacity的为0.3(小于1就行)

5)
1. 底下添加新元素 应用clear: both
父级清除浮动
2. 父级添加属性 overflow: hidden
3. 父级清除浮动 可以在里面最下面写一个标签</p>设置属性 clear:both
4. 父级添加一个::after伪类 设置属性clear: both
6)？？？？？？？？？？？
7) (三)(1) (十)(2)




     (十二)
1)
font-family
font-weight
font-size
font-style
line-height
color
2) (四)(3)
3) (三)(1)
4)
position="abolute"

当比较多个相同级别的CSS选择器优先级时 它的位置将决定一切 
1. 位于<head/>标签里的<style/>中定义的CSS拥有最高级的优先权
2. 第二级的优先属性是位于<style/>标签中的@import引入样式表所定义
3. 第三级的优先属性由<link/>标签所引入的样式表定义
4. 第四级的优先属性由<link>标签所引入的样式表里的@import导入的样式表定义
5. 第五优先级的样式由用户设定
6. 最低级的优先权由浏览器默认的
5) ????????????????????????????
https://blog.csdn.net/u013291076/article/details/81232179
6)
window.onerror(fn)无论是异步还是非异步报错的 都能捕获到运行时的错误

注意: 
    1. window.onerror函数只有在返回true的时候 异常才不会向上抛出 否则即使是知道异常的发生还是会显示Uncaught Error:xxx
    2. window.onerror是无法捕获到网络异常的错误 由于网络请求异常不会事件冒泡 因此必须在捕获阶段将其捕获到才行 但是这种方式虽然捕捉到网络请求的异常 但是无法判断HTTP的状态是404还是其他比如500 还需要配合服务端日志才进行排查处理 

https://juejin.im/post/5b55c3495188251acb0cf907




    (十三)
1) (八)(1)
2)  
CSS一共三种引入方式 行内样式 内部样式 外部样式

行内样式 使用style属性引入CSS样式
内部样式表 在style标签中书写CSS代码 style标签写在head标签中
外部引入样式表 CSS代码保存在拓展名为.css的样式表中 HTML文件引用拓展名为.css的样式表 有两种方式 链接式和导入式 

链接式写法
<link type="text/css" rel="styleSheet" href="CSS路径">
导入式写法
<style>
 @import url("CSS文件路径")
</style>
3)  (四)(3)




     (十四)
1)
ECharts是一款由百度前端技术部开发的 基于JavaScript的数据可视化图表库 提供直观 生动 可交互 可个性化定制的数据可视化图表

区别
1. SVG是矢量图 放大不失真 而Canvass是位图 由像素点组成 放大会失真
2. Canvas相较于SVG 支持的颜色更多 更便于绘制色彩更丰富的图像
3. Canvas基于HTML 而SVG基于XML

兼容性
两者只能在IE8(不包含IE8)以上运行   

SVG的引入方式
1. 以单个文件的形式独立存在 后缀为.svg 可以在html文件中以img标签的src 元素背景 框架等引入
2. 直接在html文件中引入SVG标签
2)???????????????????????
3)(十二)(1)
4)
Less Sass Stylus

特性
优点
1. 开发速度提升
2. 代码优化效率提高
3. 代码更加通俗易懂
4. 维护简单便捷    
5. 代码更加干净 优美
6. 功能更多更强 CSS做出JS的特效
缺点
1. 舍弃用户体验来提高开发效率
2. 舍弃网页打开速度换取开发效率提高




     (十五) 
1)   (三)(2)
2)   (三)(1)
3)   (四)(3)
4)
meta标签常用于定义页面的说明 关键字 最后修改日期 和其他的元数据 这些元数据将服务于浏览器(如何布局和重载页面) 搜索引擎和其他网络服务

组成
meta标签一共有两个属性 分别是http-equiv属性和name属性

name属性主要用于描述网页 比如网页的关键字丶叙述等 与之对应的是属性值为content content中的内容是对name填入类型的具体描述 便于搜索引擎抓取
参数
   keywords: 用于告诉搜索引擎 你网页的关键字
   description: 用于告诉搜索引擎 你网站的主要内容
   viewport(移动端的窗口): 这个属性常用于设计移动端网页 在用boostrap,AmazeUI等框架时候都有用过viewport
   robots(定义搜索引擎爬虫的索引方式) robot用来告诉爬虫哪些网页需要引擎 哪些网页不需要索引 content的值有all none index noindex follow nofollow 默认是all
         具体参数如下
             none: 搜索引擎将忽略此网页 等价于noindex nofollow
             noindex: 搜索引擎不索引此网页
             nofollow: 搜索引擎不继续通过此网页的链接索引搜索其他网页
             all: 搜索引擎将索引此网页与继续通过此网页的链接索引 等价于index follow
             index: 搜索引擎索引此网页
             follow: 搜索引擎继续通过此网页的链接索引搜索其他的网页
    author(作者): 用于标注网页作者
    generator(网页制作软件): 用于说明网页是什么软件
    copyright(版权): 用于标注版权信息
    revist-after(搜索引擎爬虫重访时间): 如果页面不是经常更新 为了减轻搜索引擎爬虫d对服务器带来的压力 可以设置一个爬虫的重访时间 如果重访时间过短 爬虫将按它们定义的默认时间来访问
    renderer(双核浏览器渲染方式): renderer是为双核浏览器准备的 用于指定双核浏览器以何种方式渲染页面 比如360浏览器

    ？？？？？？？？？？？？？？？？？？？？？？？？？/
    https://juejin.im/entry/588074c62f301e00696b481d

5）   (五)(1)
6)
transform属性
  1. rotate: 这个属性值是旋转的意思 默认是沿着Z轴旋转单位是deg-度数
  2. scale: scale的意思是让元素进行缩放
  3. skew: skew的意思是对元素进行扭曲
  4. translate: translate是位移的意思 而且是相对自身的位置进行位移
  5. translate-origin: 这个属性是设置变换原点的作用 
7)   (八)(6)




   (十六)
1) ？？？？？？？
2)?????????????????
3)????????????
4)?????????????????????????
5) ????????????????
6)   (十)(2)





  (十七)
1)  (四)(3)
2)  (三)(1)
3）  (十一)(5)
4)   (三)(1)
5)   (二)(1)   (八)(6)
6)   (五)(2)




     (十八)
1) (五)(3)  (十一)(1)
2)  
默认大小为 
宽度 = width + 2padding + 2border
高度 = height + 2padding + 2border
3)
 .wrapper{
    width: 100px;
    height: 100px;
    background: red;
}
.box{
    width: 50%;
    height: 50%;
    background: green;
}
<div class="wrapper">
    <div class="box"></div>
</div>




(十九)
1)
var obj = window.matchMedia('(orientation: portrait)');
function onMatchMediaChange(obj) {
    if(obj.matches) {
        console.log('此时竖屏');
    }else {
        console.log('此时横屏')
    }
}
onMatchMediaChange(obj);
obj.addListener(onMatchMediaChange);
https://blog.csdn.net/hreticent/article/details/85037536

2)???????????????????????????????

3)???????????????/????????/

4)  (三)(2)
 最优是使用position: absolute; left: 50%; top: 50; margin-left: -自身宽度的一半 margin-top: -自身高度的一半
 为什么选它: 浏览器兼容性好 

5) (五)(1)

6)
1. HTML指的是超文本标记语言: HyperText Markup Language
2. HTML不是一种编程语言 而是一种标记语言 
3. 标记语言是一套标记标签
4. HTML使用标记标签来描述网页
5. HTML文档包括了HTML标签及文本内容
6. HTML文档也叫做web页面

7)  (十)(2)
伸缩盒子就是flex布局
flex布局的注意事项
1. flex布局以后 子元素的float丶clear和vertical-align属性将失效
2. flex内部的子元素(除了position:absolute或fixed) 无论是display:block; display: inline 都成为了伸缩项目
3. Android浏览器4.4z之前对flex布局不支持
4. flex-shrink属性用于设置或检索弹性盒的收缩比率 默认为1 不允许为负值 flex值为0时表示不收缩 保持自身
5. PC兼容性相对较差 IE要10甚至11以上才有很好的兼容

8) ？？？？？？？？？？？？？？？？？？？？？？？？

9)  (十二)(4)
权重的进制是256
    属性选择器的权重问题
        !important       无穷
        行间样式          1000
        id               100
        class|属性|伪类   10
        标签|伪元素       1
        通配符            0

10)
1. 谷歌浏览器的模拟手机调试
2. weinre(web inspector remote)远程调试工具 
3. 微信的"开发者工具" 集成了Chrome DevTools和weinre 做的比较好
4. Chrome DevTools远程调试Android和iOS页面
5. Eruda 手机网页前端调试面板 




(二十)
1)  (二)(1)
2)  (三)(1)




(二十一)
1)
https://juejin.im/entry/595f1e3c5188250d914dd53c




(二十二)
1) 
1. 根据不同的分辨率 加载不同的CSS样式文件 这个时候 我们只需在我们的HTML页面的<head></head>标签中 使用js 根据不同的电脑分辨率 加载不同的css样式表 注意这里的js一定要写在<head></head>标签里面 这样在加载页面内容之前 可以提前把css文件表加载出来
2. 采用媒体查询 媒体查询是CSS3的新特性 绝大多数浏览器都可兼容这一特性 这个的思路也是根据不同的分辨率 采用不同的css样式
https://blog.csdn.net/fengzhen8023/article/details/81281117

2)  (八)(1)
vw: 将视口宽度分成100份 width: 100vw 表示铺满视口宽度
vh: 将视口高度分成100份 height: 100vh 表示铺满视口高度
vmin: 选取vw和vh中最小的那个
vmax: 选取vw和vh中最大的那个
https://www.cnblogs.com/luxiaoxing/p/7544375.html

3)
<!-- 通过设置html和body的宽高来让div充满屏幕 -->
*{
    margin: 0;
    padding: 0;
}
html,
body{
    width: 100%;
    height: 100%;
}
.box{
    width: 100%;
    height: 100%;
    background: green;
}
<!-- 使用position: absolute的属性 -->
*{
    margin: 0;
    padding: 0;
}
.box{
    width: 100%;
    height: 100%;
    background: green;
    position: absolute;
}
博客说还有设置relative和flex但是我实现不了??????/????
https://www.jianshu.com/p/45cb7bb1b15b

4)
<!-- 通过设置border -->
.box{
    width: 100px;
    height: 100px;
    background: red;
    border: 10px solid #000;
}
<!-- 提供设置box-shadow -->
.box{
    width: 100px;
    height: 100px;
    background: red;
    box-shadow: 0px 0px 0px 10px #000 inset;
}

box-shadow熟悉可以设置一个或多个下拉阴影的框
    h-shadow: 必需的 水平阴影的位置 允许负值
    v-shadow: 必需的 垂直阴影的位置 允许负值
    blur: 可选 模糊距离
    spread: 可选 阴影的大小
    color: 可选 阴影的颜色
    inset: 可选 从外阴影(开始时)改变阴影内测阴影   / outset外侧阴影
https://codeday.me/bug/20170915/71383.html




(二十三)
1)  (五)(1)




(二十四)
1)  (四)(3)
2)  (十五)(6) (十一)(1)   
3)  (十九)(9) (六)(1)
4)  (八)(6)




(二十五)？？？？？？？？




(二十六)
1) (四)(3)
2) (十五)(6) (十一)(1)  
3) (五)(3)




(二十七)
1) (三)(2)




(二十八)??????????????????????????????????




(二十九) ？？？？？？？？？？？？？？？？？？？？




(三十) 
1) (八)(1)
因为我们在移动端开发的时候 由于手机的大小都各不相同 所以我们的元素不能定宽 要用弹性盒子来按照百分比来分配元素的宽度 

rem布局的原理本质是等比缩放 一般是基于宽度



(三十一) ？？？？？？？？？？？？？？




(三十二)
1) (三)(1)
2) (五)(3)
3) ?????????????????????//
4) (二)(1)




(三十三)
1) 
CSS动画 
transition
animation
CSS动画的优缺点
   优点
   1. 简单 高效
   2. 声明式
   3. 不依赖与主线程 采用硬件加速(GPU)
   4. 简单的控制keyframe animation 播放和暂停
   缺点
   1. 不能动态的修改或定义动画内容
   2. 不同动画无法实现同步
   3. 多个动画彼此无法堆叠
   4. CSS3的transition强制硬件加速会加大GPU消耗 高负荷情形下将导致允许不流畅 这种情况在移动端设备上尤为明显 
   5. transition的兼容性问题是诟病 IE10+及现代浏览器 使用起来会造成很多不便
   
SVG动画
SVG动画优缺点
优点 
矢量图 不受像素影响 这个特性使得它在不同的平台h或媒体下表现良好 无论分辨率如何   
？？？？？？？？？
https://segmentfault.com/a/1190000002515384

2) (五)(3)




(三十四)
1) (三)(1)




(三十五)
1) (五)(3)
2) (十三)(2)
3) (二十二)(2)
4) (十九)(9)
5) ?????????????//




(三十六)
1) (十一)(1)
2) (六)(1) (十一)(3)
3) ？？？？？？？？？？？？
4) (二)(1)
5)
网页是由三部分组成的 结构 样式 行为
html 决定网页的结构是什么样的
css 设置网页的样式是什么样的
js 控制网页的行为



(三十七)
1) (三)(2)
2)
3) (十五)(6) (六)(1)
transition
transition-property: 指定CSS属性的name transition
    none: 没有属性获得过滤效果
    all: 所有属性都将获得过滤效果
    property: 定义应用过渡效果的CSS属性名称列表 列表以逗号分割    
transition-duration: transition效果需要指定多少秒或毫秒才能完成
    time: 规定完成过渡效果需要花费的时间(以秒或毫秒) 默认值是0 意味着不会有结果
transition-timing-function: 指定transition效果的转速曲线
     linear: 规定以相同的速度开始至结束的过渡效果
     ease: 规定慢速开始 然后变快 然后慢速结束的过渡效果
     ease-in: 规定以慢速开始的过渡效果
     ease-out: 规定以慢速结束的过渡效果
     ease-in-out: 规定以慢速开始和结束的过渡效果
     cubic-bezier(n,n,n,n):	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
transition-delay: 指定transtion效果开始的时候

4)
标准流是指在html中标签元素按照默认方式排列下的布局 默认方式下块级元素单独占一行 而文字和行内元素则会从左到右依次排列 浮动就是取消标准流的格式 让块级元素可以在同一行显示

父元素的高度是由子元素撑开的 且子元素设置了浮动 父元素没有设置浮动 子元素脱离了标准的文档流 那么父元素的高度会将其忽略 如果不清除浮动 父元素会出现高度不够 那么如果设置border或者background都得不到正常的解析

需要把多个盒子放到一列中中显示

5)????????????????????????????????????//




(三十八)
1) (三)(2)
2)  (十五)(6)




(三十九)
1) (五)(1)




(四十)
1) ????????????????????
2)?????????????????????????????????
3)??????????????????????????????




(四十一)
1) (十九)(9)
2) (十九)(9)
CSS3新增了很多选择器
1. 属性选择器
   Element[attr=""]: 选择出属性attr的值为""的元素
   *: 通配符选择器可以让我们选择出属性中的任意位置有这个值的元素
   ^: 选择属性以这个值开头的那个元素
   $: 选择属性以这个值结尾的那个元素
2. 伪类选择器
   :first-child 父元素中的第一个子元素
   :last-child  父元素中的最后一个子元素
   :nth-child(n) 匹配父元素的第n个子元素 
   :nth-last-child(n) 匹配同类型中的倒数第n个同级兄弟元素
   :first-of-type 匹配元素其父级是特定类型的第一个子元素
   :last-of-type 匹配元素其父级
   是特定类型的最后一个字元素
   :root 这个选择器单独使用的 代表html标签
   :target 目标选择器 当我们定位到这个元素的时候 才会被选中 
3. 条件选择器
   E>F F是E的直接子元素
   E+F F是E兄弟节点而且是E后面的第一个
   E~F F是E后面的兄弟节点
4. 伪元素选择器
   ::selection 匹配元素中被用户选中或处于高亮状态的部分 只能应用于少数的CSS属性: color backgound cursor outline      

3) (八)(3)?????????????????????????????

4) ?????????????????????????//

5)??????????????????????????????????????/

6)?????????????????????????????????

7) (二十二)(2)


8) (八)(1)
浏览器默认的font-size是16px




(四十二)
1)
input{
    vertical-align: text-top;
}
<input type="text">
111111111111
??????????????????????????????????



(四十三) (十九)(10)
？？？？？？？？？？？？？？？？？？？？？？？




(四十四)
1) ??????????????//
2) (十一)(1)
3)?????????????????????????
4) (三)(2)
5) (三)(2)




(四十五)
1) 
已知大圆半径为R，小圆半径为12J.png，当小圆与大圆相交的弦恰好为小圆的直径时，小圆所覆盖的弧最长，此时
被覆盖的弧对应的圆心角为，故用6个小圆恰好完全覆盖大圆的周边，中间的空白图形最长弦为R，此时可以用1个小圆覆盖。故共需要7个小圆。




(四十六)
1) ?????????????????????
2) (十四)(1)
3)
https://www.zhihu.com/question/28058827




(四十七)
a




(四十八)
1) (十一)(1)
2) ???????????????????/




(四十九)
1) (五)(3)

2) ？？？？？？？？？？？？？？？/

3) (六)(1) (十一)(3)

4)
transform: transition3d(z, y, z);
transfrom: rotate3d(angle);
transfrom: scale3d(x, y, z);
这三个属性可以开启GPU加速模式
原理: 开启GPU硬件加速模式 从而让浏览器在渲染动画的时候从CPU转向GPU

5) (十)(2)




(五十)
1) (二)(1) (八)(6)

2)
1)
1. 考虑到盒子的大小设置会比较麻烦 有时设置width 结果最后大小不是之前设置的大小 所以用IE盒子模型
2. 当然，box-sizing在某些场景下，是非常好用的。比如我们想做一个内边距10px，边框为2px，最终包括边框宽度为100px的div，之前的做法是先算出内容宽width = 100px - 10px*2 - 2px*2 = 76px。这种方式没问题，但是多少有点繁琐，将width的计算给以开发人员来完成显然是不合适的。
此时我们可以把它交给交给计算机来完成，这就需要用到box-sizing来完成。这里通过把div的box-sizing设置为border-box，我们就可以简单的将width设置为100px，其余的padding和border按照给定好的值一一填入，就可以完成这一切工作，省去了人为的计算内容宽content的过程，减少计算量的同时减少了错误率，何乐不为？




(五十一)
1) (十)(2)




(五十二)
1) (十一)(5)

2) ?????????????//




(五十三)
1) (六)(1) (十一)(3)   (十四)(1)
2) (四十九)(4)




(五十四)
1) (十九)(1)
2) ??????????????????//




(五十五)
1)
html5现在有很多新标签 浏览器不支持怎么办
1. document.createElement(e[i]);
2. 使用Google的html5shiv包


2) (三)(2)

3)
CSS3有很大的的兼容性问题 IE9以下不兼容CSS3.0 IE10才开始全面支持CSS3.0 由于浏览器厂商的不同 我们在使用CSS3的时候 有时候需要单独为每一种浏览器写兼容

4) (三十)(1)

5)
原理: 通过image标签的after伪元素上添加一张占位图 并且img都设置为position:relative; :after设置position: absolute; img标签的src为网络图片 这样加载的时候由于网络图片没有加载完成 就会显示本地图片 下面案例中的js是为了效果故意延迟设置img的src属性
img{
    position: relative;
}
img::after{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 90px;
    background: url(./lyf.jpg) no-repeat center;
} 
<img src="" alt="">
详解: https://blog.csdn.net/qq_36538012/article/details/79607865

6)
为什么边框变粗呢 
因为IOS使用的是retina屏 因为Retina屏的分辨率始终是普通屏幕的2倍 1px的边框在devicePixelRatio=2的retina屏下显示成2px 
获取当前屏幕的devicePixelRation window.devicePixelRatio 
1. 使用viewport加rem
2. transform: scale(0.5)
详解: https://www.cnblogs.com/leaf930814/p/6986983.html

7) (六)(2)

8) (十九)(9)

9) (六)(1)




(五十六)
1) 
https://www.cnblogs.com/changlon/p/9742473.html

2) (五)(1)




(五十七)
1) (三)(1)
absolute和fix脱离文档流 relative不会脱离文档流

2) (八)(1)




(五十八)
1) (五)(1)

2) 
1. 绝对定位是相对父级的 
transfrom: tranalate是相对于自身的
2. 绝对定位会引起页面重排和重绘 translate平移只会触发重绘




(五十九)
1) (五)(1)

2) (一)(1)

3) (四十一)(2)

4) ???????????????????????????????/




(六十)
1) (三)(1) 

2) 
border-radius: 50%;
(六)(1)

3) (四十一)(2) 

4) (四)(3)

5) (三)(1)

6) (三)(2)

7) (四十一)(2)

8)
display: inline;

9)??????????????

10)?????????????????????????//

11) ???????????????????????????/




(六十一)
1) ?????????????????

2) 
jpg png gif
jpg在图片压缩方面有巨大的优势 但采用有损压缩 图片质量有损失 一般截屏用png 不但比jpg质量高而且文件小 防锯齿PNG非常有优势

详解: https://www.jianshu.com/p/53f93a917799

3) (十四)(1)

4) (六)(1)




(六十二)
1) (三)(2)

2) (八)(1)

3) ??????????????????????????????//

4) (五十五)(6)

5)
alt属性有以下两大作用
1. 如果图像没有下载或者加载失败 会用文字来代替图像显示
2. 搜索引擎可以通过这个属性的文字来抓取图片

而title属性 是当网页上的图片被加载完成后 鼠标移动到上面去 会显示这个图片指定的属性文字 以对图片信息进行补充说明

6)
<img src=""  onerror="this.src='lyf.jpg'">
详解: https://blog.csdn.net/u012679583/article/details/50774139

7)
src是引用资源将该元素的内容整体替换
href用于在当前文档和引用资源之间建立联系

8) (六)(1) (十五)(6) (三十七)(3)




(六十三)
1) (二)(1)

2) (三)(2)

3) (一)(1)

4) (六)(1)




(六十四)
1) 
不会影响后续元素布局

2) (一)(1)




(六十五)
1) ???????????????????

2) (三)(2)

3) (十一)(5)

4) (五)(1)




(六十六)
1) (二)(1)




(六十七)
1) ？？？？？？？？？？？？？？？？？？

2) (三)(2)

3)
form 
accept HTML5不支持 规定服务器接收到的文件的类型(文件是通过文件上传提交的)
accept-charset 规定服务器可处理的表单数据字符集
action 规定当提交表单时向何处发送表单数据
autocomplete 规定是否启用表单的自动完成功能
enctype 规定在向服务器发送表单数据之前如何对其进行编码(适用于method="post"的情况)
method 规定用于表单数据的HTTP方法
name 规定表单的名称
novalidate 如果使用该属性 则提交表单时不进行验证 
target 规定是何处打开action URL

4) (十三)(2)




(六十八)
Web Worker的作用 就是为JavaScript创建多线程环境 允许主线程创建Worker线程 将一些任务分配给后者运行 在主线程运行的同时 Worker线程在后台运行 互不干扰 等到Worker线程完成计算任务 再把结果返回主线程 这样的好处是 一些计算密集型或高延迟的任务 被Worker线程负担 主线程(通常负责UI交互)就会很流畅 不会被阻塞或拖慢
Worker线程一旦新建成功 就会始终运行 不会被主线程上的活动(比如用用户点击按钮丶提交表单)打断 这样有利于随时响应主线程的通信 但是 这也造成了Worker比较耗费资源 不应该过度使用 而且一旦使用完毕 就应该关闭

Web Worker有以下几个使用注意点
1. 同源限制
分配给Worker线程运行的脚本文件 必须与主线程的脚本文件同源
2. DOM限制
Worker线程所在的全局对象 与主线程不一样 无法读取主线程所在网页的DOM对象 也无法使用document window parent这些对象 但是 Worker线程可以navigator对象和location对象 
3. 通信联系 
Worker线程与主线程不在同一个上下文环境 它们不能直接通信 必须通过消息完成
4. 脚本限制 
Worker线程不能执行alter()方法和confirm()方法 但可以使用XMLHttpRequest对象发出AJAX请求
5. 文件限制 Worker线程无法读取本地文件 即不能打开本机的文件系统(file://) 它所加载的脚本 必须来自网络

http://www.ruanyifeng.com/blog/2018/07/web-worker.html




(六十九)
1) (一)(1)




(七十)
1) ???????????????????????????????????????//




(七十一)
1) (三)(1)

2) ????????????

3)????????????????????/

4) (八)(3)
header{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100px;
    background: green;
}
footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: green;
}
.content{
    position: absolute;
    left: 0;
    top: 100px;
    width: 100%;    
}
<header>头部</header>
<div class="content">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
<footer>底部</footer>

5) (十)(2)

6) (十一)(1) (十二)(2)




(七十二)
1) ????????????????????????/




(七十三)
1)
overflow:hidden; 
text-overflow:ellipsis;
display:-webkit-box; 
-webkit-box-orient:vertical;
-webkit-line-clamp:3;
详解: https://blog.csdn.net/bing0728004/article/details/51509435

2)
1. 改变HTML结构
2. 负的margin
3. 设置父元素字体为0
4. 丢失结束标签
5. 使用letter-space
6. 使用word-space

详解: https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/
详解: https://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements




(七十四)
1)
 css中margin的%是以父元素的宽度作为基准
详解: https://blog.csdn.net/wxl1555/article/details/52714383

2) (二)(1) (八)(6)

3) (五)(1)

4)
*{
    margin: 0;
    padding: 0;
}
html,
body{
    height: 100%;
}
.wrapper{
    display: flex;
    flex-direction: column;
    height: 100%;
}
.top,
.bottom{
    width: 100%;
    height: 100px;
    background: green;
}
.content{
    flex-grow: 1;
    overflow: auto;
}
<div class="wrapper">
    <div class="top">头部</div>
    <div class="content">111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>
    <div class="bottom">底部</div>
</div>

overflow
visible  默认值 内容不会被修剪 会呈现在元素框之外
hidden 内容会被修剪 并且其内容是不可见的 
scroll 内容会被修剪 但是浏览器会显示滚动条以便查看其余的内容
auto   如果内容被修剪 则浏览器会显示滚动条以便查看其余的内容
inherit 规定应该从父元素继承overflow属性的值




(七十五)
1) (二)(1)



(七十六)
1) (二十二)(2)

2) (四)(3)

3)
DOM节点类型
元素节点 1
属性节点 2
文本节点 3
注释节点 8
document 9
DocumentFragment 11

4) (三)(1)

5) ？？？？？？？？？？？？？



