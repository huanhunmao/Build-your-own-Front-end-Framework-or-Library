// 使用 JSX 这个代码需要放在 index3 这种完整代码中才能运行 只需替换 vdom

// Array of strings we want to show in a list:
let items = ['foo', 'bar', 'baz'];

// creates one list item given some text:
function item(text) {
    return <li>{text}</li>;
}

// a "view" with "iteration" and "a partial":
let list = render(
  <ul>
    { items.map(item) }
  </ul>
);

document.body.appendChild(list);







// 完整代码 如下

// /** @jsx h */

// // ^^^^ this tells a transpiler to inject calls to an `h()` function for each node.

// let ITEMS = ['foo', 'bar', 'baz'];

// // a "partial" that does a filtered loop - no template BS, just functional programming:
// function item(text) {
//     return <li>{text}</li>;
// }

// // a simple JSX "view" with a call out ("partial") to generate a list from an Array:
// let vdom = render(
//   <ul>
//     { ITEMS.map(item) }
//   </ul>
// );

// // append the new nodes somewhere:
// document.body.appendChild(vdom);

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