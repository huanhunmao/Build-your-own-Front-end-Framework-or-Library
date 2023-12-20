// 首先我们需要提供Component组件将要扩展的基类。我们需要一个带props参数和setState方法的构造函数，
// es6 写法
class Component {
    constructor(props) {
      this.props = props;
      this.state = this.state || {};
    }
  
    setState(partialState) {
      this.state = Object.assign({}, this.state, partialState);
    }
  }

//   给定的元素和内部实例之间建立联系，创建一个公共实例，并将该实例的内部实例属性设置为传入的内部实例
function createPublicInstance(element, internalInstance) {
    // 当 元素进到这里来, 说明
    // type 是 一个函数
    const { type, props } = element;
    // 新建-实例
    const publicInstance = new type(props);
    // 
    publicInstance.__internalInstance = internalInstance; // 
    return publicInstance;
  }

// 需要它能够在公共实例-状态更改时仅-更新实例子树
class Component {
    constructor(props) {
      this.props = props;
      this.state = this.state || {};
    }
  
    setState(partialState) {
      this.state = Object.assign({}, this.state, partialState);
      // 内部实例的引用
      updateInstance(this.__internalInstance); // 更新 虚拟-Dom树和 更新 html
    }
  }
  
  function updateInstance(internalInstance) {
  
    const parentDom = internalInstance.dom.parentNode;
    const element = internalInstance.element;
  
    reconcile(parentDom, internalInstance, element); // 对比-虚拟dom树
  }


//   需要createPublicInstance并调用组件的render函数来获取我们将再次传递给它的子元素instantiate
function instantiate(element) {
    const { type, props } = element;
    const isDomElement = typeof type === "string";
    //
  
    if (isDomElement) {
      // Instantiate DOM element
      // 初始化 Didact 元素
      const isTextElement = type === TEXT_ELEMENT;
      const dom = isTextElement
        ? document.createTextNode("")
        : document.createElement(type);
  
      updateDomProperties(dom, [], props);
  
      const childElements = props.children || [];
      const childInstances = childElements.map(instantiate);
      const childDoms = childInstances.map(childInstance => childInstance.dom);
      childDoms.forEach(childDom => dom.appendChild(childDom));
  
      const instance = { dom, element, childInstances };
      return instance;
    } else {
      // Instantiate component element 
      // 初始化 组件 <App />
      const instance = {};
  
      // createPublicInstance 
      // 1. 新建 newApp = new App() 
      // 2. newApp.__internalInstance = instance
      // 3. publicInstance = newApp
      const publicInstance = createPublicInstance(element, instance);
      // 
      const childElement = publicInstance.render(); // 自己定义的 渲染-render-函数
  
      const childInstance = instantiate(childElement); // 递归 孩子拿到 { dom, element, childInstances }
      const dom = childInstance.dom;
  
      Object.assign(instance, { dom, element, childInstance, publicInstance }); // >> 组件元素比Didact元素 多了本身- 实例
      return instance;
    }
  }

//   鉴于组件实例只能有一个孩子，我们不需要处理children-对比，我们只需更新props公共实例，重新呈现孩子并对比它：
// 对比-元素 并 更新 html
function reconcile(parentDom, instance, element) {
    if (instance == null) {
      // Create instance
      const newInstance = instantiate(element);
      parentDom.appendChild(newInstance.dom);
      return newInstance;
    } else if (element == null) {
      // Remove instance
      parentDom.removeChild(instance.dom);
      return null;
    } else if (instance.element.type !== element.type) {
      // Replace instance
      const newInstance = instantiate(element);
      parentDom.replaceChild(newInstance.dom, instance.dom);
      return newInstance;
    } else if (typeof element.type === "string") {
      // Update dom instance
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    } else {
      //Update composite instance
      // 更新-组件-
  
      // parentDom 真实-html-树
      // element Didact元素 新
      // instance  旧
  
      instance.publicInstance.props = element.props; // 更新-props
      const childElement = instance.publicInstance.render(); // 组件的render函数 
      const oldChildInstance = instance.childInstance;
      const childInstance = reconcile(parentDom, oldChildInstance, childElement); // 对比-剩下-孩子
      instance.dom = childInstance.dom; // 更新-dom
      instance.childInstance = childInstance; // 更新-虚拟dom数
      instance.element = element; // 更新-Didact元素
      return instance;
    }
  }