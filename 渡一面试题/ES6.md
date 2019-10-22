

ES6在ES5的基础上增加了许多新功能和新用法，现在js更加倾向于面向对象的语言了，而且用过es6的写法可以大大简化代码。

不过很遗憾的是只有当前的一些高版本的浏览器才支持ES6，因此我们需要ES6的转码器babel，利用nodejs的npm功能就可以下载

let
    1.所声明的变量，只有在let命令所在的代码块内才有效，这也是es6最大的特点之一：增加了块级作用域。
    2.let不存在变量提升的问题，let声明的变量一定要在let声明之后使用，否则会报错。
    3.暂时性死区：在let命令声明变量之前，该变量都是不可用的。只要会计作用域之内存在let，它所声明的变量就绑定到了这个区域之内，不收外部影响。
    4.暂时性死区的本质就是：只要进入当前作用域，所要使用的变量就已经存在了，但是不可以获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

es6明确规定：如果区块中有let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭性作用域，凡是在声明之前就使用这些变量就会报错。

es6中的暂时性死区和无变量提升:
    主要是为了减少运行时的错误，防止在变量声明之前就使用这个变量，从而导致意料之外的错误。
    不允许重复声明：在同一个作用域之内，let和const都不允许重复声明同一个变量，包括变量和形参的名字相同的情况。

const命令
    const声明一个只读的常量,const声明的变量不能被修改，这意味着我们只能在声明的同时就赋值，不能先声明后赋值。
    不过const对于一个引用值来说有点特殊，const只是保证变量指向的地址不变，当我们const声明一个对象或者数组的时候

顶层对象的属性
    顶层对象指的就是我们的window这一级别的对象。
    在es5中，我们在全局环境声明一个变量，相当于把这个变量挂载到了window对象上面：
    这就导致了变成人员在写的时候经常会不知不觉地创建了全局变量，这样很不利于模块化变成。
    在es6中，var和function 命令声明的全局变量，依然是window的属性，但是let、const、class声明的全局变量，不再是window的属性了。

ES6-解构赋值
    es6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被称之为解构赋值。
    如果解构失败，变量的值就是undefined

    如果等号的右边不是数组（或者严格来说，不是可遍历的结构），那么将会报错。
     
        let [foo] = 1;
        let [foo] = false;
        let [foo] = NaN;
        let [foo] = undefined;
        let [foo] = null;
        let [foo] = {};
        这些都会报错。

    解构赋值对于var、let、const命令都适用。

解构赋值与允许执行默认值
 
    let [a,b=2] = [1];
    只有数组的值严格等于undefined，才会被赋予默认值，否则即使是null和false也会被正常赋值
        let [x=1] = [undefined]; // x = 1;
        let [x=1] = [null]; // x = null;

        默认值可以引用解构赋值的其他变量，但是前提是该变量必须已经声明。          
        let [x = 1, y = x] = [];     // x=1; y=1
        let [x = 1, y = x] = [2];    // x=2; y=2
        let [x = 1, y = x] = [1, 2]; // x=1; y=26
        let [x = y, y = 1] = [];     // ReferenceError
        最后一个之所以会报错，是因为x用到默认值y的时候，y还没有被声明。



对象的解构赋值
    对象的解构赋值和数组的解构赋值的区别在于：数组的元素是按照次序排序的，因此它们赋值也是按照顺序赋值的，
    但是对象的属性是没有次序的，变量必须与属性同名，才会被赋值。
     
    var {a,b} = {b:'234',a:123};
    // a = 123;
    // b = '234';

    对象的解构赋值的内部机制是：先找到同名的属性，然后把这个属性值赋予给对应的变量。
     
    {a:demo} = {a:123};
    //demo 123
    a只是一个匹配模式，模式是不会被赋值的。

字符串也可以被解构赋值，和数组非常类似
     
        const [a, b, c, d, e] = 'hello';
        a // "h"
        b // "e"
        c // "l"
        d // "l"
        e // "o"
        由于类数组和对象都有length属性，我们还可以专门对这个属性进行解构赋值：
         
            let {length : len} = 'hello';
            len // 5

            解构赋值的时候，如果等号右边是数组和布尔值，则会有限转化成对象。
            由于undefined和null无法转化为对象，所以对他们进行解构赋值都会报错。


函数参数的解构赋值
     
    function move({x = 0, y = 0} = {}) {
    return [x, y];
    }
    
    move({x: 3, y: 8}); // [3, 8]
    move({x: 3}); // [3, 0]
    move({}); // [0, 0]
    move(); // [0, 0]

        参数的解构赋值也可以有默认值，当我们不传入实参的时候就会赋值为默认值。
        但是要注意这种写法和下面这一种是不一样的：
         
        function move({x, y} = { x: 0, y: 0 }) {
        return [x, y];
        }
        move({x: 3, y: 8}); // [3, 8]
        move({x: 3}); // [3, undefined]
        move({}); // [undefined, undefined]
        move(); // [0, 0]

            二者的主要区别在于默认值的写法上，第一种是给x、y变量指定默认值，而第二种是给move函数指定默认值而不是x、y变量。这一点一定要注意！！
            还有一点：圆括号可能会对解构赋值带来影响，因此能不用圆括号就不用。

解构赋值的用途
    1.交换变量    
        [x, y] = [y, x];

    2.函数可以有多个返回值        
        return [1, 2, 3];
        然后可以通过解构赋值给多个变量赋值

    3.函数参数的定义
        解构赋值可以方便的把形参和实参对应起来，只需要形参是一个对象即可，不需要是按照固定的顺序写实参，就像我们在es5中用的json参数一样         
            function f({x, y, z}) { ... }
            f({z: 3, y: 2, x: 1});

    4.提取JSON数据        
        let { id, status, data: number } = json;
        不仅仅是json，只要是个对象我们都可以把属性值快速的提取出来。

    5.函数参数的默认值

    6.遍历Map解构
        map可以用for…of循环遍历，解构赋值可以方便获得键/值。而且可以只获取键名或者键值

    7.配合requireJS         
        const {src} = require('source');
        这样可以直接获取source模块中的src变量。
        当然也可以配合es6中的import来使用

数组的扩展
    1.Array.from()
    这个方法用于将类数组和可比遍历的对象（包括es6的Set和Map数据结构）转化成真正的数组。
    Array.from()还接受第二个参数，作用类似数组的map方法，用来对每个元素进行处理，然后将处理后的值放入到返回的数组中。

    Array.from()的另一个应用是，将字符串转化成数组，然后返回字符串的长度。
    因为它能够正确处理各种
    Unicode字符，可以避免Javascrit将大于\uFFFF的Unicode字符算成两个字符的bug。

Set和Map是es6新增的两个数据结构

    1.Set
        Set和数组很相似，但是它的成员的值都是唯一的，没有重复值。
        Set实例的方法分为了两大类：操作方法和遍历方法。

            操作方法：

            add(value)：添加某个值，返回Set结构本身。

            delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

            has(value)：返回一个布尔值，表示该值是否为Set的成员。

            clear()：清除所有成员，没有返回值。

            遍历方法：

            keys()：返回键名的遍历器

            values()：返回键值的遍历器

            entries()：返回键值对的遍历器

            forEach()：使用回调函数遍历每个成员

2.WeakSet

    WeakSet结构和Set很相似，主要有两个区别：

        1.WeakSet的成员只能是对象，不能是其他类型的值。

        2.WeakSet中的对象都是若引用，即垃圾回收机制不会考虑WeakSet对该对象的引用，也就是说，如果有其他对象都不在引用该对象，
        那么垃圾回收机制会自动回收该对象所占用的内存，不考虑它是否在WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可以遍历的。

3.Map
    Map主要是解决传统es5中的键值对的键名只能是字符串的问题而引入的一种结构 。

    在Map中，键值名不限于字符串，可以使各种类型的值。

Promise
一、Promise含义

    Promise是异步编程的一种解决方案，所谓的Promise，简单来说就是一个容器，里面保存着未来才会结束的事件的结果。

    Promise对象有以下两个特点：

        1.对象的状态不受外界影响。Promise对象代表一种异步操作，有三种状态：Pending(进行中)、Resolved(已完成)、Rejected(已失败)。
        只有异步操作的结果可以改变状态，其他的任何操作都不能改变状态。

        2.一旦状态改变了，就不会再变了，任何时候都可以得到这个结果。Promise对象的状态只有两种可能：Pending->Resolved或者Pending->Rejected。
        只要这两种情况发生了，状态就不会再改变了，并且会一直保持这个结果。这与事件监听不同，事件的特点是，不同时间监听，得到的结果都是不同的。


    当然Promise也有一些缺点：

        首先无法取消Promise，一旦创建他就会立即执行，中途无法取消。

        其次，如果还不设置回调函数，Promise内部跑出的错误，不会反映到外部。

        最后，当处于Pending状态时，无法得知目前进展到哪一个阶段了。


二、基本用法

    Promise对象是一个构造函数，用来生成Promise实例的。
     
        var promise = new Promise(function(resolve, reject) {
        // ... some code
        
        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
        });
    
    Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。他们是两个函数，由js引擎提供，不需要自己部署。

    1.resolve函数的作用是：
    将Promise对象的状态从“未成功”变成“成功”（Pending->Resolved），在异步操作成功时调用，并将一步操作的结果，作为参数传递出去。

    reject函数的作用是：

    将Promise对象的状态从“未成功”变成“失败”（Pending->Rejected），在异步操作失败时候调用，并将异步操作报出的错误，作为参数传递出去。

    Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

 
            promise.then(function(value) {
            // success
            }, function(error) {
            // failure
            });

        then方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为Resolved时调用，第二个回调函数是Promise对象的
        状态变成Rejected时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受Promise对象传出的值作为参数。

        这里我们就可以用Promise来异步加载图片：
         
            function loadImageAsync(url) {
            return new Promise(function(resolve, reject) {
                var image = new Image();
            
                image.onload = function() {
                resolve(image);
                };
            
                image.onerror = function() {
                reject(new Error('Could not load image at ' + url));
                };
            
                image.src = url;
            });
            }


then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。
 
            getJSON("/posts.json").then(function(json) {
            return json.post;
            }).then(function(post) {
            // ...
            });
            这一段代码中使用了then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数中。


三、Promise.prototype.catch()

    Promise.prototype.catch方法是.then(null, rejection)的别名，用于指定发生错误时的回调函数。
  
        getJSON("/posts.json").then(function(posts) {
        // ...
        }).catch(function(error) {
        // 处理 getJSON 和 前一个回调函数运行时发生的错误
        console.log('发生错误！', error);
        });

四、Promise.all()

    Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。   
        var p = Promise.all([p1, p2, p3]);
        当p1p2p3的状态都是resolved的时候，p的状态才是resolved，否则只要有一个是rejected，那么p的状态就时rejected。

五、Promise.race()

    Promise.race()方法同样是将多个Promise实例，包装成一个新的Promise实例，用法和all是一样的。

    它与all的不同在于：race是只要有一个状态改变了，p的状态就会改变，并且变成和第一个状态改变之后的一样的状态。

六、Promise.resolve()

        有时候需要将现有的对象转为Promise对象，Promise.resolve方法就起到这个作用。
        
        Promise.resolve('foo')
        // 等价于new Promise(resolve => resolve('foo'))

 Promise.resolve方法的参数分为四种情况：
        1.参数是一个Promise实例

        如果参数是Promise实例，那么Promise.resolve将不做任何修改、原封不动地返 回这个实例。

        2.参数是一个thenable对象

        thenable对象指的是具有then方法的对象，比如下面这个对象。
        Promise.resolve方法会将这个对象转为Promise对象，然后立即执行thenable对象的then方法。

        3.参数不是具有then方法的对象，或根本就不是对象

        如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve 方法返回一个新的Promise对象，状态为Resolved

        Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

        所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法

    七、Promise.reject()

        Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。它的参数用法与Promise.resolve方法完全一样。

    八、其他两个附加方法

1.done()方法

    Promise对象的回调链，不管以then方法或catch方法结尾，要是最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。
    因此，我们可以提供一个done方法，总是处于 回调链的尾端，保证抛出任何可能出现的错误。

2.finally()方法

finally方法用于指定不管Promise对象最后状态如何，都会执行的操作。它与done方法最大的区别就在于，它接受一个普通的回调函数作为参数，该参数不管怎样都必须执行。

类似try catch finally里面的finally。
        

使用箭头函数有几个注意点：
 
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
 
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
 
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。
 
（4）不可以使用yield命令，因此箭头函数不能用作Generator函数。


箭头函数可以让this指向固定化，这种特性很有利于封装回调函数。
 
this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
正是因为它没有this，所以也就不能用作构造函数。
 


 // 2019/3/26