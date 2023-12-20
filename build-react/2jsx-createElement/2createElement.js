// babel 转化后 代码  重点就是这个  createElement
const element3 = createElement( 
    "div",
    { id: "container" },
    createElement("input", { value: "foo", type: "text" }),
    createElement(
      "a",
      { href: "/bar" },
      "bar"
    ),
    createElement(
      "span",
      { onClick: e => alert("Hi") },
      "click me"
    )
  );

// createElement 
function createElement(type, config, ...args) {
    const props = Object.assign({}, config);// 合并
    const hasChildren = args.length > 0; // 孩子？
    props.children = hasChildren ? [].concat(...args) : [];
    return { type, props }; // Didact元素的数据结构-类型{type}与属性{props}
  }


//   除了一件事情之外，这个函数运行良好：文本元素。
const TEXT_ELEMENT = "TEXT ELEMENT"; // 类型

function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c != null && c !== false)
    .map(c => c instanceof Object ? c : createTextElement(c));
    // 过滤-空-值, 剩下的-不属于-Object的值 -> createTextElement -> 变为 类型为TEXT_ELEMENT- Didact元素
  return { type, props };
}

function createTextElement(value) {
  // 规范数据
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}