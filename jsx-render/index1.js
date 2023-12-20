// 基础函数 
function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null;
    return { nodeName, attributes, children };
}

// 结果 
// {
//     nodeName: "div",
//     attributes: {
//       "id": "foo"
//     },
//     children: ["Hello!"]
//   }



// render 函数
function render(vnode) {
    // Strings just convert to #text Nodes:
    if (vnode.split) return document.createTextNode(vnode);

    // create a DOM element with the nodeName of our VDOM element:
    let n = document.createElement(vnode.nodeName);

    // copy attributes onto the new node:
    let a = vnode.attributes || {};
    Object.keys(a).forEach( k => n.setAttribute(k, a[k]) );

    // render (build) and then append child nodes:
    (vnode.children || []).forEach( c => n.appendChild(render(c)) );

    return n;
}