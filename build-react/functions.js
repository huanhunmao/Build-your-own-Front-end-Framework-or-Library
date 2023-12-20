// 分清有-5-种名称

// 真实-html-树
// Didact 元素 {type, props}
// 虚拟-Dom-树
// 3.1 虚拟-dom-元素 { dom, element, childInstance }
// 3.2 虚拟-组件-元素 { dom, element, childInstance, publicInstance }
 createElement
// 构建所谓的-Didact元素 {type, props}, 主要用于-JSx-语法糖-转换

 createTextElement
// 构建所谓的-文本类型-Didact元素 {type:TEXT_ELEMENT, props} 主要用于-JSx-语法糖-转换

 render
// 渲染-html,带有html元素进场。一切的开头, 接下来对比-虚拟dom树 // -- 1

 reconcile
// 需要虚拟dom树 没有？新建！ // -- 2
// 具有虚拟树后, 且再次触发 , 对比-虚拟dom树, 并加/减/替换/更新dom元素/更新组件元素 // -- 7
// instantiate
// 新建-虚拟-dom-元素/虚拟-组件-元素 // -- 3

 createPublicInstance
// 用于构建-组件元素的新建实例 // -- 4

 updateDomProperties
// dom节点中删除所有旧属性，然后添加所有`新属性 // -- 5

 updateInstance
// 用于-this.setState- 中->触发更新虚拟-dom-树 // -- 6

 reconcileChildren
// 更新dom元素-子元素 , 递归触发-reconcile // -- 8