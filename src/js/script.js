const gui = new dat.GUI();

const settings = {
  '--colorLine': '#037403',
  '--colorPoint': '#fb5639',
  '--sx': 3,
  '--sy': 30,
  '--cp1x': 24,
  '--cp1y': 90,
  '--cp2x': 44,
  '--cp2y': 10,
  '--ex': 97,
  '--ey': 79,
  '--point1': 10,
  '--point2': 20,
};

const container = document.querySelector('.container');

const setValue = (container) => {
  container.style.setProperty('--colorLine', settings['--colorLine']);
  container.style.setProperty('--colorPoint', settings['--colorPoint']);
  container.style.setProperty('--sx', settings['--sx']);
  container.style.setProperty('--sy', settings['--sy']);
  container.style.setProperty('--cp1x', settings['--cp1x']);
  container.style.setProperty('--cp1y', settings['--cp1y']);
  container.style.setProperty('--cp2x', settings['--cp2x']);
  container.style.setProperty('--cp2y', settings['--cp2y']);
  container.style.setProperty('--ex', settings['--ex']);
  container.style.setProperty('--ey', settings['--ey']);
  container.style.setProperty('--point1', settings['--point1']);
  container.style.setProperty('--point2', settings['--point2']);
};

const points = gui.addFolder('Points');
const pointStart = points.addFolder('Start Point');
pointStart
  .add(settings, '--sx', 0, 100, 1)
  .onChange(setValue.bind(null, container));
pointStart
  .add(settings, '--sy', 0, 100, 1)
  .onChange(setValue.bind(null, container));

const pointEnd = points.addFolder('End Point');
pointEnd
  .add(settings, '--ex', 0, 100, 1)
  .onChange(setValue.bind(null, container));
pointEnd
  .add(settings, '--ey', 0, 100, 1)
  .onChange(setValue.bind(null, container));

const controlPoints = gui.addFolder('Control Points');
controlPoints
  .add(settings, '--cp1x', -100, 200)
  .onChange(setValue.bind(null, container));
controlPoints
  .add(settings, '--cp1y', -100, 200)
  .onChange(setValue.bind(null, container));
controlPoints
  .add(settings, '--cp2x', -100, 200)
  .onChange(setValue.bind(null, container));
controlPoints
  .add(settings, '--cp2y', -100, 200)
  .onChange(setValue.bind(null, container));
const internalPoints = gui.addFolder('Internal Points');
internalPoints
  .add(settings, '--point1', 0, 100, 2.5)
  .onChange(setValue.bind(null, container));
internalPoints
  .add(settings, '--point2', 0, 100, 2.5)
  .onChange(setValue.bind(null, container));

const colors = gui.addFolder('Colors');
colors
  .addColor(settings, '--colorLine')
  .onChange(setValue.bind(null, container));
colors
  .addColor(settings, '--colorPoint')
  .onChange(setValue.bind(null, container));

//https://gist.githubusercontent.com/viktorkelemen/1451945/raw/127e732cbab14e29c3fb2c0a623b8f1b75ced03e/Custom%2520canvas%2520google%2520maps%2520marker
//https://paul.kinlan.me/using-canvas-to-create-beautiful-custom-marke/
