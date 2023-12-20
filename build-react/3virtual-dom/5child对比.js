
function reconcileChildren(instance, element) {
    // instance 旧
    // element 新
    const dom = instance.dom;
    const childInstances = instance.childInstances;
    const nextChildElements = element.props.children || [];
    const newChildInstances = []; // 新的孩子数组
  
    const count = Math.max(childInstances.length, nextChildElements.length); // 比较谁-大
  
    for (let i = 0; i < count; i++) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
  
  // 2. 递归 - 上一层函数 reconcile
      const newChildInstance = reconcile(dom, childInstance, childElement);
      newChildInstances.push(newChildInstance);
    }
    return newChildInstances;
  }