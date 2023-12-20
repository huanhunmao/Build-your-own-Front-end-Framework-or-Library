
const element = {
    type: "div",
    props: {
      id: "container",
      children: [
        { type: "input", props: { value: "foo", type: "text" } },
        {
          type: "a",
          props: {
            href: "/bar",
            children: [{ type: "TEXT ELEMENT", props: { nodeValue: "bar" } }]
          }
        },
        {
          type: "span",
          props: {
            onClick: e => alert("Hi"),
            children: [{ type: "TEXT ELEMENT", props: { nodeValue: "click me" } }]
          }
        }
      ]
    }
  };

// 如何使用JSX来简化元素的创建
const element2 = (
    <div id="container">
      <input value="foo" type="text" />
      <a href="/bar">bar</a>
      <span onClick={e => alert("Hi")}>click me</span>
    </div>
  );


