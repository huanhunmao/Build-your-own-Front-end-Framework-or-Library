// 让我们重写我们的render函数，保持同样的对比算法，并添加一个instantiate函数来创建一个给定元素的-实例（及其子元素）：
// --------------- 运行一次 开始------
let rootInstance = null;

function render(element, container) {

  const prevInstance = rootInstance; // 1-虚拟dom主树干- == null
  const nextInstance = reconcile(container, prevInstance, element); 
  rootInstance = nextInstance; // 2-支树干- 领头啦
}

function reconcile(parentDom, instance, element) {
  if (instance == null) {
    // 一开始的 1-虚拟dom主树干- null
    const newInstance = instantiate(element); // 从一个·Didact元素·-> 实例
    parentDom.appendChild(newInstance.dom); // -html-元素添加
    return newInstance;
  } else {
    const newInstance = instantiate(element);
    parentDom.replaceChild(newInstance.dom, instance.dom);
    return newInstance;
  }
}

// --------------- 运行一次 结束------

// ------ 递归 - instantiate - 运行一次以上 -----
function instantiate(element) {
  const { type, props } = element;

  // Create DOM element
  const isTextElement = type === "TEXT ELEMENT";
  const dom = isTextElement
    ? document.createTextNode("")
    : document.createElement(type);

  // Add event listeners
  const isListener = name => name.startsWith("on");
  Object.keys(props).filter(isListener).forEach(name => {
    const eventType = name.toLowerCase().substring(2);
    dom.addEventListener(eventType, props[name]);
  });

  // Set properties
  const isAttribute = name => !isListener(name) && name != "children";
  Object.keys(props).filter(isAttribute).forEach(name => {
    dom[name] = props[name];
  });
// 1. dom 构造完成

  // Instantiate and append children
  const childElements = props.children || [];

// 2. 转折点-递归-孩子 -> 变 实例数组
  const childInstances = childElements.map(instantiate);
// 3. 获取 孩子-html-数组
  const childDoms = childInstances.map(childInstance => childInstance.dom);

// 4. 儿/女 加入 爸爸妈妈的怀抱, 「 html 组合 」
// 正如 -2- 所做的-递归本函数
// 所以-孙子/孙女-已经-加入-儿/女的怀抱了
  childDoms.forEach(childDom => dom.appendChild(childDom));

  const instance = { dom, element, childInstances };
  
// `element` -> `Didact 元素`

// `dom` -> `html 元素`

// `childInstances`是一个包含元素-子元素实例的数组。

  return instance;
}


// update  updateDomProperties 根据新的属性更新给定的 DOM 元素，同时清理掉不再需要的旧属性

function instantiate(element) {
    const { type, props } = element;
  
    // Create DOM element
    const isTextElement = type === "TEXT ELEMENT";
    const dom = isTextElement
      ? document.createTextNode("")
      : document.createElement(type);
  
    updateDomProperties(dom, [], props); // <------
  
    // Instantiate and append children
    const childElements = props.children || [];
    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => dom.appendChild(childDom));
  
    const instance = { dom, element, childInstances };
    return instance;
  }
  
  // dom 表示要更新的 DOM 元素，prevProps 是之前的属性，nextProps 是新的属性
  function updateDomProperties(dom, prevProps, nextProps) {
    // 用于检查属性名是否以 "on" 开头，表示事件
    const isEvent = name => name.startsWith("on");
    // 用于检查属性名是否不是事件（不以 "on" 开头）且不是 "children"
    const isAttribute = name => !isEvent(name) && name != "children";
  
  // preProps Remove 遍历 prevProps 中的属性来进行旧属性的清理工作
    // Remove event listeners 移除之前绑定的事件监听器
    Object.keys(prevProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });
  
    // Remove attributes 对于其他属性，将属性值设为 null
    Object.keys(prevProps).filter(isAttribute).forEach(name => {
      dom[name] = null;
    });
  
  // nextProps Add 遍历 nextProps 中的属性来进行新属性的添加工作
    // Set attributes 普通属性，直接将属性值赋给对应的 DOM 属性
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
      dom[name] = nextProps[name];
    });
  
    // Add event listeners 事件，使用 addEventListener 方法添加新的事件监听器
    Object.keys(nextProps).filter(isEvent).forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
  }