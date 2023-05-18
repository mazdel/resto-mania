class DrawerInitiator {
  constructor({ button, drawer, content }) {
    this.button = button;
    this.drawer = drawer;
    this.content = content;
  }

  init() {
    this.button.addEventListener('click', (event) => {
      event.stopPropagation();
      if (this.drawer.classList.contains('open')) {
        return this.closeDrawer();
      }
      return this.openDrawer();
    });
  }

  openDrawer() {
    this.drawer.classList.add('open');
  }

  closeDrawer() {
    this.drawer.classList.remove('open');
  }
}

export default DrawerInitiator;
