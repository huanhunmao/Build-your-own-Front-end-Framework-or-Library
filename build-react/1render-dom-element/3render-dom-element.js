
// 由element定义的dom子树并将其附加到容器中
function render(element, parentDom){
    const {type, props} = element;
    const dom = element.createElement(type)
    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));

    parentDom.appendChild(dom)
}

// 缺少属性和事件监听器。让我们props用Object.keys函数迭代属性名称并相应地-设置-它们
function render(element, parentDom) {
    const { type, props } = element;
    const dom = document.createElement(type);
  
    const isListener = name => name.startsWith("on");
    // 是否开头-on
    Object.keys(props).filter(isListener).forEach(name => {
      const eventType = name.toLowerCase().substring(2); // 取两位后
      dom.addEventListener(eventType, props[name]);
    });
    // 每一个开头-on 的属性-对应-函数 props[name] - >用-dom-addEvent 接连
  
    const isAttribute = name => !isListener(name) && name != "children";
    // 不是-监听事件 和 不能是-孩子 
  
    Object.keys(props).filter(isAttribute).forEach(name => {
      dom[name] = props[name];
    });
   // 过滤出来的属性 - 赋予 - > dom
    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));
  
    parentDom.appendChild(dom);
  }