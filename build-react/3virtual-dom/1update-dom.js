// 更新dom的唯一方法是使用不同的元素再次调用render函数
const rootDom = document.getElementById("root");

function tick() {
  const time = new Date().toLocaleTimeString();
  const clockElement = <h1>{time}</h1>;
  render(clockElement, rootDom);
}

tick();
setInterval(tick, 1000);

// 在函数结束时，我们检查父项是否有任何子项，如果有，我们用新元素生成的dom替换它：rendertick-render
function render(element, parentDom) {  
  
    // ...
    // Create dom from element
    // ...
    
    // Append or replace dom
    if (!parentDom.lastChild) { // 有没有最后孩子阿
      parentDom.appendChild(dom);     
    } else {
      // 换了你的孩子, 就是这么～～
      parentDom.replaceChild(dom, parentDom.lastChild);    
    }
  }  