
// render函数不支持的一件事是文本节点
const reactElement = {
    type: "span",
    props: {
      children: ["Foo"] // 是孩子, 但也只是一个字符串
    }
  };


  // 如何定义Didact元素 children应该是元素的数组和所有元素应该有type和props
  const textElement = {
    type: "span",
    props: {
      children: [
        {
          type: "TEXT ELEMENT", // 1
          props: { nodeValue: "Foo" } // 2
        }
      ]
    }
  };


// 创建了一个render函数，允许我们将一个元素{element}及其子元素{children}呈现给-DOM「parentDom.appendChild(dom)
function render(element, parentDom) {
    const { type, props } = element;
  
    // Create DOM element
    // 区分 生成 text 节点还是 element 节点 
    const isTextElement = type === "TEXT ELEMENT"; // 文本类型判定
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
  
    // Render children
    const childElements = props.children || [];
    childElements.forEach(childElement => render(childElement, dom));
  
    // Append to parent
    parentDom.appendChild(dom);
  }