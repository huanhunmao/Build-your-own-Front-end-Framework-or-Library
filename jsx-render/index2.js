// 使用 JSX  这个代码需要放在 index3 这种完整代码中才能运行 只需替换 vdom

// JSX -> VDOM:
let vdom = <div id="foo">Hello!</div>;

// VDOM -> DOM:
let dom = render(vdom);

// add the tree to <body>:
document.body.appendChild(dom);







// 完整代码如下 

// /** @jsx h */
// // a simple JSX "view" with a call out ("partial") to generate a list from an Array:
// let vdom = <div id="foo">Hello!</div>;

// let dom = render(vdom);

// // append the new nodes somewhere:
// document.body.appendChild(dom);

// // Remember that "virtual DOM"? It's just JSON - each "VNode" is an object with 3 properties.
// let json = JSON.stringify(vdom, null, '  ');

// // The whole process (JSX -> VDOM -> DOM) in one step:
// document.body.appendChild(
//   render( <pre>{ json }</pre> )
// );





// /** Render Virtual DOM to the real DOM */
// function render(vnode) {
//   if (typeof vnode==='string') return document.createTextNode(vnode);
//   let n = document.createElement(vnode.nodeName);
//   Object.keys(vnode.attributes || {}).forEach( k => n.setAttribute(k, vnode.attributes[k]) );
//   (vnode.children || []).forEach( c => n.appendChild(render(c)) );
//   return n;
// }

// /** hyperscript generator, gets called by transpiled JSX */
// function h(nodeName, attributes, ...args) {
//   let children = args.length ? [].concat(...args) : null;
//   return { nodeName, attributes, children };
// }


// /*
// // here's an alternative hyperscript-to-vdom method that creates sparse nodes:
// function h(nodeName, attributes, ...args) {
//   let vnode = { nodeName };
//   if (attributes) vnode.attributes = attributes;
//   if (args.length) vnode.children = [].concat(...args);
//   return vnode;
// }
// */