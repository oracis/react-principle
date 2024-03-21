let nextUnitWork = null;

function performUnitWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = ReactDOM.createDom(fiber);
  }

  if (fiber.parent) {
    fiber.parent.dom.appendChild(fiber.dom);
  }

  const elements = fiber.props.children;
  let index = 0;
  let prevSibling = null;
  while (index < elements.length) {
    const element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null,
    };
    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
}

function workLoop(deadLine) {
  while (nextUnitWork) {
    nextUnitWork = performUnitWork(nextUnitWork);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

const ReactDOM = {
  createDom: function (fiber) {
    const dom =
      fiber.type === 'TEXT_NODE'
        ? document.createTextNode('')
        : document.createElement(fiber.type);
    Object.keys(fiber.props)
      .filter((key) => key !== 'children')
      .forEach((name) => (dom[name] = fiber.props[name]));
    return dom;
  },
  render: function (element, container) {
    nextUnitWork = {
      dom: container,
      props: {
        children: [element],
      },
    };
  },
};
