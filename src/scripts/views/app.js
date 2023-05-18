import DrawerInitiator from '../utils/drawer-initiator';

class App {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;

    this.initAppShell();
  }

  initAppShell() {
    const drawer = new DrawerInitiator({
      button: this.button, drawer: this.drawer, content: this.content,
    });
    drawer.init();
  }
}

export default App;
