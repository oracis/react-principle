let nextUnitWork = {};

function performUnitWork(nextUnitWork) {
  console.log(nextUnitWork);
  return null;
}

function workLoop(deadLine) {
  while (nextUnitWork) {
    nextUnitWork = performUnitWork(nextUnitWork);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

const element = (
  <div title="Hello Welcome">
    <p>Robin</p>
    <b>Li</b>
  </div>
);
const root = document.getElementById('root');
ReactDOM.render(element, root);
