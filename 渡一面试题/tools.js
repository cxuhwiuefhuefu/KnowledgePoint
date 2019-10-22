//绑定事件函数
			function addEvent(ele, type, handle){ //事件 类型 函数名
				if(ele.addEventListener){//主流浏览器
					ele.addEventListener(type, handle, false);// 捕获由父元素捕获到子元素  冒泡所有的都有
				}else if(ele.attachEvent){//ie
					ele['temp' + type + handle] = handle;
					ele[type + handle] = function(){ //先把函数保存出来 名字就是temp + type + handle
						ele['temp' + type + handle].call(ele);//改变一下this的指向
					}
					ele.attachEvent('on' + type, ele[type + handle]); //添加绑定事件
				}else{
					ele['on' + type] = handle; //on 只能绑定一次 绑定多次进行覆盖
				}
			}
			//解除事件绑定
			function removeEvent(ele, type, handle){
				if(ele.removeEventListener){//w3c标准
					ele.removeEventListener(type, handle, false); //是否事件捕获

				}else if (ele.detachEvent){//ie
					ele.detachEvent('on' + type, handle);
					//handle --> ele[type + handle];
				}else{
					ele['on' + type] = null;
				}
			}



//		11： 请封装一下insertafter方法
		document.getElementById("myList").insertBefore(newItem,existingItem);


		insertBefore() //方法在您指定的已有子节点之前插入新的子节点。
			Element.insertAfter = function (targetNode, afterNode) {
            var nextSib = afterNode.nextElementSibling;
            if(this.children.length <= 1 || !nextSib) {
                this.appendChild(targetNode);//如果后面没有元素了 在父级添加子元素
            }else {
                this.insertBefore(targetNode, nextSib);//在下一个元素节点前边添加
            }
        }

//取消冒泡
function stopBubble(e) {

    // 如果提供了事件对象，则这是一个非IE浏览器

    if ( e && e.stopPropagation ) {

        // 因此它支持W3C的stopPropagation()方法

        e.stopPropagation();

    } else {

        // 否则，我们需要使用IE的方式来取消事件冒泡

        window.event.cancelBubble = true;

    }

}

//取消默认事件

function cancelHandler(event){
	if(event.preventDefault){
		event.preventDefault();
	}else if(event.returnValue){
		event.returnValue = false;
	}
}
//获取元素属性

function getStyle(obj, propStyle) {

	if(obj.currentStyle) {

		return obj.currentStyle[propStyle];

	}else{

		return window.getComputedStyle(obj, false)[propStyle];//第二个参数 是看他伪元素

	}

}


//异步加载JS

function asyncLoaded(url, callback){
	var script = document.createElement('script');
	script.type = "text/javascript";

	//先判断是否在IE里面执行
	if(script.readyState){ 	//0 1 2 3
		script.onreadystatechange = function () { //监听onreadystatechange
			if(script.readyState == "complete" || script.readyState == "loaded") {//说明已经完成加载 说明src已经请求到了
				script.onreadystatechange = null; //执行完就把监听事件取消 也是效率问题 一直监听的话会耗性能
				callback();
			}
		}
	}else{ //否则执行 onload
		script.onload = function () {//Chrome Safari Opera Firefox
			script.onload = null;
			callback();
		}
	}//写在后面 网速比代码速度还快 就不会执行call back
	script.src = "tools.js";
	document.body.appendChild(script);
}
asyncLoaded("tools.js", function () {
	console.log(/*填写要执行的函数*/);
});

//ajax
function ajax(method,url,data,success){
	var xhr = null;
	try {
		xhr = new XMLHttpRequest();
	} catch (e) {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	if (method == "get" && data) {
		url += "?" + data;
	}

	xhr.open(method,url,true);

	if (method == "get") {
		xhr.send();
	}else{
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xhr.send(data);
	}

	xhr.onreadystatechange = function() {

		if ( xhr.readyState == 4 ) {
			if ( xhr.status == 200 ) {
				success(xhr.responseText);
			} else {
				alert('出错了,Err：' + xhr.status);
			}
		}

	}
}

6.//圣杯模式
//原理： 函数的原型等于父级的原型 这样改变一个就不会改变父级属性
 写一个新的中间的构造函数 把p的原型给f的原型 通过new一个f让他等于c的原型
  共享一下f和p的原型 通过f构造出c的原型  共享原型有一个问题  构造出的对象可以改变原型上的方法
  p=f  C = new F

var inherit  = (function(){
	var F = function(){}
	return function(C,P){
		F.prototype = P.prototype;
		C.prototype = new F();
		C.prototype.constructor = C;
		C.prototype.uber = P.prototype;//最后再补充一下 构造完这些 我是由谁来的 就是P.prototype
	}
}());


7.//封装ajax
function ajax(method,data,url,success){
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(e){
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	if(method == "get" && data){
		xhr.send();
	}else{
		xhr.setRequestHeader('Content-Type','application/x-www-from-urlencoded');
		xhr.send(data);
	}
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				success(xhr.responseText);
			}else{
				alert('wrong' + xhr.status);
			}
		}
	}
}

14： 如何将数组去重说说你的思路
			Array.prototype.unique = function () {
		      var len = this.length,
		      arr = [],
		      obj = {};//因为对象里的属性值是不重复的 把原来数组的每一个值拿出来分别看对象里面有没有 没有的话往对象里添加属性
		      for (var i = 0; i < len; i++) {
		            if (!obj[this[i]]) {//判断对象里有没有这个属性  有的话不操作 没有的话添加
		                  obj[this[i]] = 1;//不能等于i  等于i 的话没办法去重undefined 0
		                  arr.push(this[i]);
		            }
		      }
		      return arr;
			}


9.//深度克隆 大概我理解的  原始值直接拷贝  引用值进一步拷贝 判断是不是对象还是数组
function deepClone(parent,child){
	var  child = child || {},//有的话就等于child 没有就给一个空对象
	     toStr = Object.prototype.toString, //为了判断对象还是数组
	     arrStr = ['object Array'];
	     for( var prop in parent){
	     	if(parent.hasOwnProperty(prop)){ //判断他不在原型链上的话
	     		if(typeof(parent[prop]) == "object"){ //不是原始值的话
     			child[prop] = (toStr.call(paret[prop]) == arrStr)?[]:{};//是数组 返回空数组  是对象返回空对象
     			deepClone(parent[prop],child[prop]);//递归调用 把当前的孩子节点继续递归调用
	     		}else{//判断是原始值
	     			child[prop] = parent[prop];
	     		}
	     	}
	     }
}
数组的
先string  然后再parse 返回一个新数组

牛逼的方法  json.parse(json.stringify[arr]);






