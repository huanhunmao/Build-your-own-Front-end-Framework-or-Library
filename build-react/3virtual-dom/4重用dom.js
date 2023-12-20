function reconcile(parentDom, instance, element) {
    if (instance == null) {
      // Create instance
      const newInstance = instantiate(element);
      parentDom.appendChild(newInstance.dom);
      return newInstance;
    //   检查之前渲染的元素type是否与我们当前正在渲染的元素相同。如果type相同，我们将重新使用它（更新属性以匹配新的属性
    } else if (instance.element.type === element.type) {
      // 相同类型
      // Update instance
      // 1. 加入属性
      updateDomProperties(instance.dom, instance.element.props, element.props);
      // 2. 体会-Didact元素
      instance.element = element;
      return instance;
    } else {
      // Replace instance
      const newInstance = instantiate(element);
      parentDom.replaceChild(newInstance.dom, instance.dom);
      return newInstance;
    }
  }