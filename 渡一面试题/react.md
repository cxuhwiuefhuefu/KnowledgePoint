
MVC模式的意思是，软件可以分为三个部分：

        视图（View）：用户界面

        控制器（Controller）：业务逻辑

        模型（Model）：数据保存

各部分的通信方式：

        View传送指令到Controller

        Controller完成业务逻辑之后，要求Model改变状态

        Model将新的数据发送到View，用户得到反馈

        三者之间是一个三角关系，并且所有的通信都是单向的。

        互动模式：

        接受用户指令时，MVC可以分成两种方式，一种是通过View接受指令，传递给Controller，另一只是直接通过Controller接受指令。


React的原理和背景

        React中最重要的就是引入了虚拟DOM的机制。

        在Web开发中，我们总需要把变化的数据实时反映到页面的UI上，改变UI就需要操作DOM，而复杂又频繁的DOM操作通常是性能产生瓶颈的原因，
        因此React引入了虚拟DOM的机制：在客户端js实现了一套DOM API。

        基于React进行开发时，所有的DOM构造都是通过虚拟DOM进行的，每当数据发生变化时，React都会进行重新构建整个虚拟DOM树，然后React将
        当前整个虚拟DOM树和上一次的DOM树进行比较，得到DOM结构哪里发生了变化，然后仅仅将需要变化的部分在浏览器上进行更新。

        这个算法叫做Diff算法，这是一种基于红黑树的算法，它会计算虚拟DOM到实际渲染DOM结构的最少步骤。

        而且React能够批处理虚拟DOM的刷新，在一个事件循环内的两次数据变化都会合并。比如在极短的时间内，一个节点先从A变成B，再从B变回A，
        那么React会认为UI没有发生变化。

        尽管每一次都需要构造完整的DOM树，但是因为虚拟DOM是内存数据，性能极高，因而能达到提高性能的目的。并且在保证性能的同时，开发者将不
        再需要关注某个数据的变化如何更新到一个或者多个具体的DOM元素上，值需要关心在一个数据状态下，整个界面是如何渲染的。



MVC的思想是让我们做到视图数据控制器的分离，而组件化的思想让我们做到UI功能模块之间的分离。

		24： 说说react的优点和生命周期*************************************
			1.React速度很快

				React中最重要的就是引入了虚拟DOM的机制。
				基于React进行开发时，所有的DOM构造都是通过虚拟DOM进行的，每当数据发生变化时，React都会进行重新构建整个虚拟DOM树，
				然后React将当前整个虚拟DOM树和上一次的DOM树进行比较，得到DOM结构哪里发生了变化，然后仅仅将需要变化的部分在浏览器上进行更新。
				这个算法叫做Diff算法，这是一种基于红黑树的算法，它会计算虚拟DOM到实际渲染DOM结构的最少步骤。
			2.跨浏览器兼容

				虚拟DOM帮助我们解决了跨浏览器问题，它为我们提供了标准化的API，甚至在IE8中都是没问题的。

			3.模块化
				为你程序编写独立的模块化UI组件，这样当某个或某些组件出现问题是，可以方便地进行隔离。
				每个组件都可以进行独立的开发和测试，并且它们可以引入其它组件。这等同于提高了代码的可维护性。







		组件生命周期******************************************************************
				生命周期共提供了10个不同的API。
				1.getDefaultProps

				作用于组件类，只调用一次，返回对象用于设置默认的props，对于引用值，会在实例中共享。
				2.getInitialState

				作用于组件的实例，在实例创建时调用一次，用于初始化每个实例的state，此时可以访问this.props。
				3.componentWillMount

				在完成首次渲染之前调用，此时仍可以修改组件的state。
				4.render

				必选的方法，创建虚拟DOM，该方法具有特殊的规则：
				只能通过this.props和this.state访问数据
				可以返回null、false或任何React组件
				只能出现一个顶级组件（不能返回数组）
				不能改变组件的状态
				不能修改DOM的输出
				5.componentDidMount

				真实的DOM被渲染出来后调用，在该方法中可通过this.getDOMNode()访问到真实的DOM元素。此时已可以使用其他类库来操作这个DOM。
				在服务端中，该方法不会被调用。
				6.componentWillReceiveProps

				组件接收到新的props时调用，并将其作为参数nextProps使用，此时可以更改组件props及state。
					componentWillReceiveProps: function(nextProps) {
						if (nextProps.bool) {
							this.setState({
								bool: true
							});
						}
					}
				7.shouldComponentUpdate

				组件是否应当渲染新的props或state，返回false表示跳过后续的生命周期方法，通常不需要使用以避免出现bug。在出现应用的瓶颈时，可通过该方法进行适当的优化。
				在首次渲染期间或者调用了forceUpdate方法后，该方法不会被调用
				8.componentWillUpdate

				接收到新的props或者state后，进行渲染之前调用，此时不允许更新props或state。
				9.componentDidUpdate

				完成渲染新的props或者state后调用，此时可以访问到新的DOM元素。
				10.componentWillUnmount

组件被移除之前被调用，可以用于做一些清理工作，在componentDidMount方法中添加的所有任务都需要在该方法中撤销，比如创建的定时器或添加的事件监听器。