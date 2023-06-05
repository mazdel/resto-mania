import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/medium.css';
import '../styles/small.css';

import App from './views/app';
import swRegister from './utils/sw-register';

// eslint-disable-next-line no-unused-vars
const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
