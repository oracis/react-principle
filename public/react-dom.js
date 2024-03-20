const ReactDOM = {
  render: function (element, container) {
    const dom =
      element.type === 'TEXT_NODE'
        ? document.createTextNode('')
        : document.createElement(element.type);
    Object.keys(element.props)
      .filter((key) => key !== 'children')
      .forEach((name) => (dom[name] = element.props[name]));
    element.props.children.forEach((child) => ReactDOM.render(child, dom));

    container.append(dom);
  },
};
