// 但对于更复杂的情况，重新创建所有子节点的性能成本是不可接受的。
// 所以我们需要一种方法来比较当前和前一次调用生成的元素树->render，并只更新差异

// 捋一捋:

// 分清有-5-种名称

// 真实-html-树
// Didact 元素 {type, props}
// 虚拟-Dom-树
// 3.1 虚拟-dom-元素 { dom, element, childInstance }
// 3.2 虚拟-组件-元素 { dom, element, childInstance, publicInstance }


// 虚拟dom 和真实 dom 对比 
// 一个是我们需要在虚拟DOM的每个节点上保留一个对真实DOM节点的引用，以便使对比更容易，我们更愿意保持这些元素不变


// 实例-Instance
// 一个实例-表示已呈现-给DOM的元素。

// 它是具有三个属性的纯JS对象：element，dom，和childInstances。

// element -> Didact 元素

// dom -> html 元素

// childInstances是一个包含元素-子元素实例的数组。

