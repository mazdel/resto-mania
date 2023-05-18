import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/medium.css';
import '../styles/small.css';

import { App } from './views/app';

const app = new App({
  button: document.querySelector('#hamburgerButton'),
  drawer: document.querySelector('#navigationDrawer'),
  content: document.querySelector('#mainContent'),
});
